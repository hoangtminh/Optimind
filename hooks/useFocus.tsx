import {
	FOCUS_CONFIG,
	FocusStateData,
	getEAR,
	getOrientationVector,
	initialFocusState,
} from "@/lib/analyzer";
import { OneEuroFilter } from "@/lib/filter-class";
import { FocusEstimator } from "@/lib/focus-estimator";
import { ModelLoadResult, NO_MODE } from "@/mediapipe/definitions";
import FaceLandmarkDetection from "@/mediapipe/face-landmark";
import initMediaPipVision from "@/mediapipe/mediapipe-vision";
import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import {
	createContext,
	useCallback,
	useContext,
	useRef,
	useState,
} from "react";

const FocusContext = createContext<FocusContextType | null>(null);

interface FocusContextType {
	initModels: () => void;
	focusState: FocusStateData;
	calibrate: (p: number, y: number) => void;
	processLandmarks: (
		landmarks: NormalizedLandmark[],
		currTime: number
	) => FocusStateData;
	resetSystem: () => void;
	isCalibrated: boolean;
	basePitch: number;
	baseYaw: number;
	handleCalibrate: (landmarks: NormalizedLandmark[]) => void;
	focusEstimator: {
		focusScore: number;
		score: number;
		status: string;
	};
}

export const useFocus = () => {
	const context = useContext(FocusContext);
	if (!context) {
		throw new Error("Focus Context must be used in Focus Provider");
	}
	return context;
};

export const FocusProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, setState] = useState<FocusStateData>(initialFocusState);
	const [modelLoadResult, setModelLoadResult] = useState<ModelLoadResult[]>();
	const [currentMode, setCurrentMode] = useState<number>(NO_MODE);

	const filterPitchRef = useRef(
		new OneEuroFilter(
			FOCUS_CONFIG.MIN_CUTOFF,
			FOCUS_CONFIG.BETA,
			FOCUS_CONFIG.DL_CUTOFF
		)
	);
	const filterYawRef = useRef(
		new OneEuroFilter(
			FOCUS_CONFIG.MIN_CUTOFF,
			FOCUS_CONFIG.BETA,
			FOCUS_CONFIG.DL_CUTOFF
		)
	);
	const filterEarRef = useRef(
		new OneEuroFilter(
			FOCUS_CONFIG.MIN_CUTOFF,
			FOCUS_CONFIG.BETA,
			FOCUS_CONFIG.DL_CUTOFF
		)
	);
	const eyeClosedStartRef = useRef<number | null>(
		initialFocusState.eyeClosedStart
	);

	// Dùng useRef để giữ giá trị basePitch/baseYaw sau calibrate
	const basePitchRef = useRef(initialFocusState.basePitch);
	const baseYawRef = useRef(initialFocusState.baseYaw);

	const focusEstimatorRef = useRef<FocusEstimator>(new FocusEstimator());

	// Rule: Nếu mắt nhìn vào camera và không chớp mắt quá nhiều => Engaged
	function evaluateEngagement(score: number): boolean {
		return score >= 65; // Giảm từ 70 -> 65 (phù hợp với penalty mới nghiêm ngặt hơn)
	}

	const initModels = async () => {
		const vision = await initMediaPipVision();

		if (vision) {
			const models = [FaceLandmarkDetection.initModel(vision)];

			const results = await Promise.all(models);
			const enabledModels = results.filter((result) => result.loadResult);
			FaceLandmarkDetection.setDrawingMode(
				FaceLandmarkDetection.CONNECTION_FACE_LANDMARKS_POINTS
			);
			if (enabledModels.length > 0) {
				setCurrentMode(enabledModels[0].mode);
			}
			setModelLoadResult(enabledModels);
		}
	};

	// --- 4.1. HÀM LỌC DỮ LIỆU THÔ (PROCESS RAW DATA) ---
	const processRawData = useCallback(
		(
			rawPitch: number,
			rawYaw: number,
			rawEar: number,
			currTime: number
		): { relPitch: number; relYaw: number; earFiltered: number } => {
			// Filtering
			const earFiltered = filterEarRef.current.filter(currTime, rawEar);
			const pitchFiltered = filterPitchRef.current.filter(
				currTime,
				rawPitch
			);
			const yawFiltered = filterYawRef.current.filter(currTime, rawYaw);

			const relPitch = pitchFiltered - basePitchRef.current;
			const relYaw = yawFiltered - baseYawRef.current;

			return { relPitch, relYaw, earFiltered };
		},
		[]
	);

	// --- 4.2. HÀM ĐÁNH GIÁ TRẠNG THÁI (EVALUATE STATE) ---
	const evaluateState = useCallback(
		(
			p: number,
			y: number,
			ear: number,
			currTime: number,
			currentState: FocusStateData // Nhận trạng thái hiện tại
		): FocusStateData => {
			let newState = { ...currentState };
			let isSleeping = false;

			// Cập nhật eyeClosedStart từ useRef
			newState.eyeClosedStart = eyeClosedStartRef.current;

			// 1. Mắt (Ngủ gật)
			if (ear < FOCUS_CONFIG.EAR_THRESH) {
				if (newState.eyeClosedStart === null) {
					// Bắt đầu nhắm mắt
					eyeClosedStartRef.current = currTime;
					newState.eyeClosedStart = currTime;
				} else if (
					currTime - newState.eyeClosedStart! >
					FOCUS_CONFIG.FOCUS_TIME
				) {
					newState.status = "NGU GAT !!!";
					newState.color = "#FF0000"; // Red
					isSleeping = true;
					newState.score = Math.max(0, newState.score - 5);
				}
			} else {
				// Reset nếu mắt mở
				eyeClosedStartRef.current = null;
				newState.eyeClosedStart = null;
			}

			if (!isSleeping) {
				// 2. Tư thế (Cúi/Ngửa/Mất tập trung)
				if (p > FOCUS_CONFIG.PITCH_LIMIT.MAX) {
					newState.status = "CUI DAU (Hai co)";
					newState.color = "#FFA500"; // Orange
					newState.score = Math.max(0, newState.score - 2);
				} else if (p < FOCUS_CONFIG.PITCH_LIMIT.MIN) {
					newState.status = "NGUA DAU (Lo denh)";
					newState.color = "#FFFF00"; // Yellow
				} else if (Math.abs(y) > FOCUS_CONFIG.YAW_LIMIT) {
					newState.status = "MAT TAP TRUNG";
					newState.color = "#800080"; // Purple
					newState.score = Math.max(0, newState.score - 3);
				} else {
					newState.status = "DANG TAP TRUNG";
					newState.color = "#00FF00"; // Green
					newState.score = Math.min(100, newState.score + 1);
				}
			}

			// Đảm bảo score nằm trong [0, 100]
			newState.score = Math.max(0, Math.min(100, newState.score));

			return newState;
		},
		[]
	);

	// --- 4.3. HÀM ĐIỀU KHIỂN (CALIBRATE) ---
	const calibrate = useCallback((p: number, y: number): void => {
		basePitchRef.current = p;
		baseYawRef.current = y;

		// Cập nhật state hiển thị
		setState((prev) => ({
			...prev,
			basePitch: p,
			baseYaw: y,
			isCalibrated: true,
			status: "DANG TAP TRUNG",
			color: "#00FF00",
			focusScore: 100,
		}));
		console.log(
			`[CALIB] Zero Point Set: Pitch=${p.toFixed(1)}, Yaw=${y.toFixed(1)}`
		);
	}, []);

	const handleCalibrate = useCallback((landmarks: NormalizedLandmark[]) => {
		focusEstimatorRef.current?.calibrate(landmarks);
	}, []);

	// --- 4.4. HÀM XỬ LÝ CHÍNH (PROCESS LANDMARKS) ---
	const processLandmarks = useCallback(
		(landmarks: NormalizedLandmark[], currTime: number): FocusStateData => {
			let finalState: FocusStateData;
			// 1. Tính toán Dữ liệu Thô
			if (landmarks) {
				const rawEar = getEAR(landmarks);
				const { pitch: rawPitch, yaw: rawYaw } =
					getOrientationVector(landmarks);

				// 2. Lọc Dữ liệu
				const { relPitch, relYaw, earFiltered } = processRawData(
					rawPitch,
					rawYaw,
					rawEar,
					currTime
				);

				// 3. Đánh giá Trạng thái
				const newState = evaluateState(
					relPitch,
					relYaw,
					earFiltered,
					currTime,
					state // Truyền state hiện tại vào hàm đánh giá
				);

				// 4. Cập nhật state React (kích hoạt re-render) và bổ sung data thô/lọc
				finalState = {
					...newState,
					relPitch,
					relYaw,
					ear: earFiltered,
					rawEar,
					rawPitch,
					rawYaw,
				};

				focusEstimatorRef.current?.estimate(landmarks);

				setState(finalState);
				return finalState;
			} else {
				return state;
			}
		},
		[state, processRawData, evaluateState]
	);

	// --- 5. CLEANUP/RESET (Tuỳ chọn) ---
	const resetSystem = useCallback(() => {
		// Reset state hiển thị
		setState(initialFocusState);

		// Reset các giá trị useRef (trạng thái nội bộ)
		basePitchRef.current = initialFocusState.basePitch;
		baseYawRef.current = initialFocusState.baseYaw;
		eyeClosedStartRef.current = initialFocusState.eyeClosedStart;
	}, []);

	const contextValue = {
		initModels,
		focusState: state,
		calibrate,
		processLandmarks,
		resetSystem,
		isCalibrated: state.isCalibrated,
		basePitch: state.basePitch,
		baseYaw: state.baseYaw,
		handleCalibrate,
		focusEstimator: focusEstimatorRef.current.focusState,
	};

	return (
		<FocusContext.Provider value={contextValue}>
			{children}
		</FocusContext.Provider>
	);
};
