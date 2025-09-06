"use client";

import { todaySessions } from "@/data/study-data";
import { useCamera } from "./use-camera";

const { createContext, useContext, useState } = require("react");

const StudyContext = createContext();

export function useStudy() {
	return useContext(StudyContext);
}

export function StudyProvider({ children }) {
	const [allSessions, setAllSessions] = useState(todaySessions);

	// Session state
	const [isPaused, setIsPaused] = useState(false);
	const [currentCycle, setCurrentCycle] = useState(1);
	const [isBreakTime, setIsBreakTime] = useState(false);
	const [maxTime, setMaxTime] = useState(0);

	const [isSessionActive, setIsSessionActive] = useState(false);
	const [timeRemaining, setTimeRemaining] = useState(0);

	const [focusData, setFocusData] = useState([]);

	// Session configuration
	const [activeTab, setActiveTab] = useState("countdown");
	const [studyTime, setStudyTime] = useState(25);
	const [breakTime, setBreakTime] = useState(5);
	const [studyCycle, setStudyCycle] = useState(1);
	const [timeCount, setTimeCount] = useState(0);

	const [selectedSubjects, setSelectedSubjects] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [selectedTasks, setSelectedTasks] = useState([]);
	const [selectedProgress, setSelectedProgress] = useState([]);
	const { startCamera, startRecording, stopRecording, cameraStream } =
		useCamera();

	const [sessionData, setSessionData] = useState({
		name: "",
		description: "",
		method: "countdown",
		studyTime: 25,
		breakTime: 0,
		cycles: 1,
		subjects: [],
		tags: [],
		tasks: [],
		progress: [],
		currentCycle: 1,
		totalTime: 0,
		finished: false,
		concentrateScore: [],
	});

	const startSession = () => {
		let duration = 0;
		let method = activeTab;
		setSelectedTasks((prev) =>
			prev.map((task) => {
				return { ...task, completed: false };
			})
		);

		if (activeTab === "free") {
			duration = 0; // Freeform has no set duration
		} else {
			duration = studyTime * 60;
		}

		setSessionData((prev) => {
			return {
				...prev,
				method,
				studyTime: studyTime,
				breakTime: breakTime,
				cycles: studyCycle,
				subjects: selectedSubjects,
				tags: selectedTags,
				tasks: selectedTasks,
				progress: selectedProgress,
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

	const endSession = () => {
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

		setAllSessions((prev) => [...prev, sessionData]);
		setIsSessionActive(false);
		setSessionData({
			name: "",
			description: "",
			method: "countdown",
			studyTime: 25,
			breakTime: 0,
			cycles: 1,
			subjects: [],
			tags: [],
			tasks: [],
			currentCycle: 1,
			totalTime: 0,
			finished: false,
			concentrateScore: [],
		});
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

		// Tags & Subject
		selectedTags,
		setSelectedTags,
		selectedSubjects,
		setSelectedSubjects,

		// Tasks
		selectedTasks,
		setSelectedTasks,
		selectedProgress,
		setSelectedProgress,
	};
	return (
		<StudyContext.Provider value={contextValue}>
			{children}
		</StudyContext.Provider>
	);
}
