// Tên file: app/components/PomodoroTimer.tsx
"use client";

import React, { useState, useEffect, FC, useRef } from "react";
import { Button } from "@/components/ui/button";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Settings,
	ListTodo,
	Play,
	Pause,
	RefreshCcw,
	Brain,
	Coffee,
} from "lucide-react";
import { cn } from "@/lib/utils";
import TimerSetting from "./timer-setting";
import { StudySession } from "@/lib/type/session-type";

// Hàm tiện ích
const glassEffect =
	"bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg";

// Hàm định dạng thời gian
const formatTime = (seconds: number): string => {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

// Định nghĩa Props
interface PomodoroTimerProps {
	showTasks: boolean;
	onToggleTasks: () => void;
	isRunning: boolean;
	setIsRunning: (bool: boolean) => void;
	secondElapsed: number;
	setSecondElapsed: (val: number | ((prev: number) => number)) => void;
	startSession: ({
		start_time,
		session_type,
		focus_time,
		break_time,
		cycles,
	}: {
		start_time: string;
		session_type: "pomodoro" | "countdown";
		focus_time: number;
		break_time: number;
		cycles: number;
	}) => void;
	endSession: () => Promise<boolean>;
}

// --- Component Chính: Pomodoro Timer ---
const PomodoroTimer: FC<PomodoroTimerProps> = ({
	showTasks,
	onToggleTasks,
	isRunning,
	setIsRunning,
	secondElapsed,
	setSecondElapsed,
	startSession,
	endSession,
}) => {
	// === State Cài đặt Pomodoro (tính bằng phút) ===
	const [configFocusTime, setConfigFocusTime] = useState<number>(25);
	const [configBreakTime, setConfigBreakTime] = useState<number>(5);
	const [configLongBreakTime, setConfigLongBreakTime] = useState<number>(15);
	const [configCycles, setConfigCycles] = useState<number>(4);
	const [configCountdownTime, setConfigCountdownTime] = useState<number>(10);

	// === State Vận hành Pomodoro ===
	const [currentMode, setCurrentMode] = useState<
		"focus" | "break" | "longBreak"
	>("longBreak");
	const [completedCycles, setCompletedCycles] = useState<number>(0);
	const [timerMode, setTimerMode] = useState<"pomodoro" | "countdown">(
		"pomodoro"
	);

	// === State cho Dialog Cài đặt ===
	const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
	const [timer, setTimer] = useState<number>(0);

	const [tempSettings, setTempSettings] = useState({
		focus: configFocusTime,
		break: configBreakTime,
		longBreak: configLongBreakTime,
		cycles: configCycles,
		countdown: configCountdownTime,
		mode: timerMode,
	});

	// Ref cho âm thanh
	const audioRef = useRef<HTMLAudioElement>(null);

	// --- Effect chính cho Timer ---
	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (isRunning && timer > 0) {
			interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
				setSecondElapsed((prev: number) => prev + 1);
			}, 1000);
		} else if (timer === 0) {
			setIsRunning(false);
			audioRef?.current?.play(); // Phát âm thanh

			if (timerMode === "pomodoro") {
				if (currentMode === "focus") {
					const newCompleted = completedCycles + 1;
					if (newCompleted >= configCycles) {
						setCurrentMode("longBreak");
						setTimer(configLongBreakTime * 60);
						setCompletedCycles(0);
					} else {
						setCurrentMode("break");
						setTimer(configBreakTime * 60);
						setCompletedCycles(newCompleted);
					}
				} else {
					setCurrentMode("focus");
					setTimer(configFocusTime * 60);
				}
			}
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [
		isRunning,
		timer,
		currentMode,
		completedCycles,
		configFocusTime,
		configBreakTime,
		configLongBreakTime,
		configCycles,
		timerMode,
	]);

	// --- Handlers ---
	const resetTimer = async () => {
		const error = await endSession();
		if (!error) {
			setIsRunning(false);
			setCurrentMode("focus");
			setCompletedCycles(0);
			setSecondElapsed(0);
			if (timerMode === "pomodoro") {
				setTimer(configFocusTime * 60);
			} else {
				setTimer(configCountdownTime * 60);
			}
		}
	};

	const toggleTimer = (): void => {
		if (timer === 0) {
			if (timerMode === "pomodoro") {
				setTimer(configFocusTime * 60);
				setCurrentMode("focus");
				setCompletedCycles(0);
			} else {
				setTimer(configCountdownTime * 60);
			}
		}
		setIsRunning(!isRunning);
		if (!isRunning && secondElapsed == 0) {
			startSession({
				start_time: new Date(Date.now()).toISOString(),
				session_type: timerMode,
				focus_time:
					timerMode == "pomodoro"
						? configFocusTime
						: configCountdownTime,
				break_time: configBreakTime,
				cycles: configCycles,
			});
		}
	};

	const openSettings = () => {
		setTempSettings({
			focus: configFocusTime,
			break: configBreakTime,
			longBreak: configLongBreakTime,
			cycles: configCycles,
			countdown: configCountdownTime,
			mode: timerMode,
		});
		setIsSettingsOpen(true);
	};

	const handleSaveSettings = () => {
		setConfigFocusTime(tempSettings.focus);
		setConfigBreakTime(tempSettings.break);
		setConfigLongBreakTime(tempSettings.longBreak);
		setConfigCycles(tempSettings.cycles);
		setConfigCountdownTime(tempSettings.countdown);
		setTimerMode(tempSettings.mode);
		setIsSettingsOpen(false);

		setIsRunning(false);
		setCurrentMode("focus");
		setCompletedCycles(0);
		if (tempSettings.mode === "pomodoro") {
			setTimer(tempSettings.focus * 60);
		} else {
			setTimer(tempSettings.countdown * 60);
		}
	};

	const handleModeChange = (mode: string) => {
		if (mode === "pomodoro" || mode === "countdown") {
			const newMode = mode as "pomodoro" | "countdown";
			setTimerMode(newMode);
			setIsRunning(false);
			setCurrentMode("focus");
			setCompletedCycles(0);
			if (newMode === "pomodoro") {
				setTimer(configFocusTime * 60);
			} else {
				setTimer(configCountdownTime * 60);
			}
		}
	};

	return (
		<>
			{/* Âm thanh thông báo (chỉ cần ở 1 nơi, đã chuyển ra parent) */}
			<audio ref={audioRef} src="/notify/sound_1.mp3" preload="auto" />

			{/* Widget 1: Pomodoro (Giữa) */}
			<div
				className={cn(
					"w-[400px] px-6 py-3 text-center flex flex-col items-center",
					glassEffect
				)}
			>
				{/* === PHẦN TRÊN (Header) === */}
				<div className="w-full flex justify-between items-center mb-4">
					{/* Trạng thái */}
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2 text-xl font-semibold">
							{(timerMode === "pomodoro" &&
								currentMode === "focus") ||
							timerMode === "countdown" ? (
								<Brain className="w-6 h-6 text-blue-300" />
							) : (
								<Coffee className="w-6 h-6 text-yellow-300" />
							)}
							<span>
								{timerMode === "pomodoro"
									? currentMode === "focus"
										? "TẬP TRUNG"
										: currentMode === "break"
										? "NGHỈ NGẮN"
										: "NGHỈ DÀI"
									: "ĐẾM NGƯỢC"}
							</span>
						</div>

						{/* Chu kỳ (Chỉ hiển thị ở mode Pomodoro) */}
						{timerMode === "pomodoro" && (
							<div className="flex gap-1.5">
								{[...Array(configCycles)].map((_, i) => (
									<div
										key={i}
										className={cn(
											"h-3 w-3 rounded-full transition-colors",
											i < completedCycles
												? "bg-green-400"
												: "bg-white/30"
										)}
									/>
								))}
							</div>
						)}
					</div>

					{/* Nhóm nút Task và Cài đặt */}
					<div className="flex gap-2">
						{/* Nút Task */}
						<Button
							variant="ghost"
							size="icon"
							className={cn(
								"h-10 w-10 rounded-full bg-white/10 border-white/30 hover:bg-white/80",
								showTasks && "bg-white/70 text-black" // Hiệu ứng active
							)}
							data-active={showTasks}
							onClick={onToggleTasks} // Gọi prop
						>
							<ListTodo className="h-5 w-5" />
						</Button>

						{/* Nút Cài đặt */}
						<Button
							onClick={openSettings}
							variant="ghost"
							size="icon"
							className={cn(
								"h-10 w-10 rounded-full bg-white/10 border-white/30 hover:bg-white/30",
								isRunning && "opacity-50 cursor-not-allowed"
							)}
							disabled={isRunning}
						>
							<Settings className="h-5 w-5" />
						</Button>
					</div>
				</div>

				{/* === PHẦN GIỮA (Timer & Nút) === */}
				<div className="w-full flex items-center justify-center gap-10 mb-4">
					{/* Đồng hồ */}
					<div className="flex-1 w-full text-center">
						<h1
							className="text-7xl font-bold"
							style={{
								textShadow: "0 4px 10px rgba(0,0,0,0.3)",
							}}
						>
							{formatTime(timer)}
						</h1>
					</div>
					{/* Nút điều khiển */}
					<div className="flex flex-col w-fit justify-center gap-4">
						<Button
							onClick={toggleTimer}
							size="lg"
							className={cn(
								"h-8 w-full rounded-md shadow-lg text-black",
								isRunning
									? "bg-yellow-400 hover:bg-yellow-500" // Pause
									: "bg-green-500 hover:bg-green-600 text-white" // Start
							)}
						>
							{isRunning ? (
								<Pause className="h-5 w-5" />
							) : (
								<Play className="h-5 w-5" />
							)}
							{isRunning ? "Pause" : "Start"}
						</Button>
						<Button
							onClick={resetTimer}
							variant="outline"
							size="lg"
							className={cn(
								"h-8 w-full rounded-md bg-white/20 border-white/30 hover:bg-white/30",
								isRunning && "opacity-50 cursor-not-allowed"
							)}
							disabled={isRunning}
						>
							<RefreshCcw className="h-5 w-5" />
							End Session
						</Button>
					</div>
				</div>

				{/* === PHẦN DƯỚI (Tabs Chế độ) === */}
				{!isRunning && (
					<div className="w-full">
						<Tabs
							value={timerMode}
							onValueChange={handleModeChange}
							className="w-full"
						>
							<TabsList
								className={cn(
									"grid w-full grid-cols-2 bg-black/30",
									isRunning &&
										"opacity-50 pointer-events-none"
								)}
							>
								<TabsTrigger
									value="pomodoro"
									disabled={isRunning}
								>
									Pomodoro
								</TabsTrigger>
								<TabsTrigger
									value="countdown"
									disabled={isRunning}
								>
									Đếm ngược
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
				)}
			</div>

			{/* === NỘI DUNG DIALOG CÀI ĐẶT === */}
			<TimerSetting
				isSettingsOpen={isSettingsOpen}
				setIsSettingsOpen={setIsSettingsOpen}
				tempSettings={tempSettings}
				setTempSettings={setTempSettings}
				handleSaveSettings={handleSaveSettings}
			/>
		</>
	);
};

export default PomodoroTimer;
