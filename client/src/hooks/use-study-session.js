"use client";

import { todaySessions } from "@/data/study-data";
import { useCamera } from "./use-camera";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import studySessionApi from "@/actions/study-session-action";

const { createContext, useContext, useState } = require("react");

const StudyContext = createContext();

export function useStudy() {
	return useContext(StudyContext);
}

export function StudyProvider({ children }) {
	const router = useRouter();
	const [allSessions, setAllSessions] = useState([]);

	// Session state
	const [isPaused, setIsPaused] = useState(false);
	const [currentCycle, setCurrentCycle] = useState(1);
	const [isBreakTime, setIsBreakTime] = useState(false);
	const [maxTime, setMaxTime] = useState(0);

	const [isSessionActive, setIsSessionActive] = useState(false);
	const [timeRemaining, setTimeRemaining] = useState(0);

	const [focusData, setFocusData] = useState([]);

	// Session configuration
	const [sessionName, setSessionName] = useState("");
	const [sessionDescription, setSessionDescription] = useState("");
	const [activeTab, setActiveTab] = useState("countdown");
	const [studyTime, setStudyTime] = useState(25);
	const [breakTime, setBreakTime] = useState(5);
	const [studyCycle, setStudyCycle] = useState(1);
	const [timeCount, setTimeCount] = useState(0);

	const [sessionTags, setSessionTags] = useState([]);
	const [sessionTasks, setSessionTasks] = useState([]);
	const [sessionStudyProgress, setSessionStudyProgress] = useState([]);
	const { startCamera, startRecording, stopRecording, cameraStream } =
		useCamera();

	const [sessionData, setSessionData] = useState({
		name: "",
		description: "",
		method: "countdown",
		studyTime: 25,
		breakTime: 0,
		cycles: 1,
		tags: [],
		tasks: [],
		studyProgress: [],
		currentCycle: 1,
		totalTime: 0,
		finished: false,
		concentrateScore: [],
	});

	const startSession = () => {
		if (
			!sessionData.name.trim() ||
			(sessionTasks.length === 0 && sessionStudyProgress.length === 0)
		) {
			toast.error("Please fill session name, select task/study progress");
			// return;
		}

		let duration = 0;
		let method = activeTab;
		setSessionTasks((prev) =>
			prev.map((task) => {
				return { ...task, completed: false };
			})
		);

		setSessionStudyProgress((prev) =>
			prev.map((studyProgress) => ({ ...studyProgress, activeTime: 0 }))
		);

		if (activeTab === "free") {
			duration = 60000; // Freeform has no set duration
		} else {
			duration = studyTime * 60;
		}

		setSessionData((prev) => {
			return {
				...prev,
				name: sessionName,
				description: sessionDescription,
				method,
				studyTime: studyTime,
				breakTime: breakTime,
				cycles: studyCycle,
				tags: sessionTags,
				tasks: sessionTasks,
				studyProgress: sessionStudyProgress,
				currentCycle: 1,
				totalTime: 0,
				concentrateScore: [],
			};
		});

		setMaxTime(duration);
		setTimeRemaining(duration);
		setIsSessionActive(true);
		setIsPaused(false);
		setFocusData([]);
		if (cameraStream) {
			startCamera();
			startRecording();
		}
	};

	const endSession = async () => {
		setIsPaused(false);
		setIsBreakTime(false);
		if (cameraStream) {
			stopRecording();
			startCamera();
		}
		const isFinish =
			currentCycle == sessionData.cycles && timeRemaining == 0;

		const totalTime =
			(currentCycle - 1) * (studyTime + breakTime) +
			(studyTime - timeRemaining);

		setSessionData((prev) => {
			return {
				...prev,
				totalTime: totalTime,
				isFinish: isFinish,
			};
		});

		const response = await studySessionApi.createStudySession({
			...sessionData,
			tags: sessionTags.map((tag) => tag.name),
			tasks: sessionTasks,
			studyProgress: sessionStudyProgress,
		});
		console.log(response);

		setAllSessions((prev) => [...prev, sessionData]);
		setIsSessionActive(false);
		setSessionData({
			name: "",
			description: "",
			method: "countdown",
			studyTime: 25,
			breakTime: 0,
			cycles: 1,
			tags: [],
			tasks: [],
			studyProgress: [],
			currentCycle: 1,
			totalTime: 0,
			finished: false,
			concentrateScore: [],
		});

		setSessionTags([]);
		setSessionTasks([]);
		setSessionStudyProgress([]);
	};

	const contextValue = {
		allSessions,

		// State
		timeRemaining,
		setTimeRemaining,
		startSession,
		endSession,
		isPaused,
		setIsPaused,
		isSessionActive,
		setIsSessionActive,

		// Session Data
		sessionName,
		setSessionName,
		sessionDescription,
		setSessionDescription,
		sessionData,
		setSessionData,
		focusData,
		setFocusData,
		maxTime,
		setMaxTime,

		// Method
		activeTab,
		setActiveTab,

		// Time Prepare
		studyTime,
		setStudyTime,
		studyCycle,
		setStudyCycle,
		breakTime,
		setBreakTime,
		timeCount,
		setTimeCount,

		// Tags
		sessionTags,
		setSessionTags,

		// Tasks
		sessionTasks,
		setSessionTasks,
		sessionStudyProgress,
		setSessionStudyProgress,
	};
	return (
		<StudyContext.Provider value={contextValue}>
			{children}
		</StudyContext.Provider>
	);
}
