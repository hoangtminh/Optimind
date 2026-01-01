import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { Vector3 } from "three";

export const FOCUS_CONFIG = {
	EAR_THRESH: 0.22,
	FOCUS_TIME: 2.0,
	PITCH_LIMIT: { MIN: -10, MAX: 15 },
	YAW_LIMIT: 20,
	MIN_CUTOFF: 0.05,
	BETA: 0.8,
	DL_CUTOFF: 1.0,
};

const LEFT_EYE = [362, 385, 387, 266, 373, 380];
const RIGHT_EYE = [33, 160, 158, 133, 153, 144];
const NOSE_IDX = 1;
const LEFT_EYE_INNER_IDX = 33;
const RIGHT_EYE_INNER_IDX = 266;

export interface FocusStateData {
	status: string;
	color: string;
	score: number;
	basePitch: number;
	baseYaw: number;
	isCalibrated: boolean;
	relPitch: number;
	relYaw: number;
	ear: number; // EAR đã lọc
	rawEar: number; // EAR thô
	rawPitch: number; // Pitch thô
	rawYaw: number; // Yaw thô
	eyeClosedStart: number | null; // Timestamp (giây)
	nose?: Vector3; // Có thể bỏ qua nếu không dùng để vẽ trong hook
	focusScore: number;
}

export const initialFocusState: FocusStateData = {
	status: "CHO CALIB...",
	color: "#808080",
	score: 100.0,
	basePitch: 0,
	baseYaw: 0,
	isCalibrated: false,
	relPitch: 0,
	relYaw: 0,
	ear: 0,
	rawEar: 0,
	rawPitch: 0,
	rawYaw: 0,
	eyeClosedStart: null,
	focusScore: 100,
};

export const euclideanDistance = (
	p1: NormalizedLandmark,
	p2: NormalizedLandmark
): number => {
	const dx = p1.x - p2.x;
	const dy = p1.y - p2.y;
	return Math.sqrt(dx * dx + dy * dy);
};

export const getEAR = (landmarks: NormalizedLandmark[]): number => {
	const _ear = (idxs: number[]): number => {
		const p = idxs.map((i) => landmarks[i]);
		if (p.length !== 6) return 0;
		const v1 = euclideanDistance(p[1], p[5]);
		const v2 = euclideanDistance(p[2], p[4]);
		const hor = euclideanDistance(p[0], p[3]);
		return hor > 0 ? (v1 + v2) / (2.0 * hor) : 0;
	};
	const leftEar = _ear(LEFT_EYE);
	const rightEar = _ear(RIGHT_EYE);
	return (leftEar + rightEar) / 2.0;
};

export const getOrientationVector = (
	landmarks: NormalizedLandmark[]
): { pitch: number; yaw: number; nose: Vector3 } => {
	if (
		!landmarks[NOSE_IDX] ||
		!landmarks[LEFT_EYE_INNER_IDX] ||
		!landmarks[RIGHT_EYE_INNER_IDX]
	) {
		return { pitch: 0, yaw: 0, nose: new Vector3(0, 0, 0) };
	}
	const nose = new Vector3(
		landmarks[NOSE_IDX].x,
		landmarks[NOSE_IDX].y,
		landmarks[NOSE_IDX].z
	);
	const lEye = new Vector3(
		landmarks[LEFT_EYE_INNER_IDX].x,
		landmarks[LEFT_EYE_INNER_IDX].y,
		landmarks[LEFT_EYE_INNER_IDX].z
	);
	const rEye = new Vector3(
		landmarks[RIGHT_EYE_INNER_IDX].x,
		landmarks[RIGHT_EYE_INNER_IDX].y,
		landmarks[RIGHT_EYE_INNER_IDX].z
	);
	const eyeCenter = lEye.clone().add(rEye).divideScalar(2);
	const vecNose = nose.clone().sub(eyeCenter);
	const vecEye = rEye.clone().sub(lEye);
	const faceNormal = vecEye.clone().cross(vecNose).normalize();
	let pitch = Math.asin(faceNormal.y) * (180.0 / Math.PI);
	let yaw = Math.atan2(faceNormal.x, faceNormal.z) * (180.0 / Math.PI);
	pitch = -pitch;
	yaw = -yaw;
	return { pitch, yaw, nose };
};
