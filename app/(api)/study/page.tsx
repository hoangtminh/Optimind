// Tên file: app/study/page.tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import PomodoroTimer from "@/components/study/timer";
import TaskListWidget from "@/components/study/task-list";
import FocusChartWidget from "@/components/study/focus-chart";
import { CreateStudySession, FocusDataPoint } from "@/lib/type/session-type";
import { createSession } from "@/supabase/actions/study-session";
import { toast } from "sonner";
import LeaveModal from "@/components/app/leaving-modal";

// --- Component Chính: Trang Học Tập ---
const StudyPage = () => {
	// === State Chung ===
	const [showTasks, setShowTasks] = useState<boolean>(true); // Quản lý hiển thị Task
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [secondElapsed, setSecondElapsed] = useState<number>(0);
	const [focusData, setFocusData] = useState<FocusDataPoint[]>([]);

	const [session, setSession] = useState<
		Omit<CreateStudySession, "end_time" | "total_time" | "average_focus">
	>({
		start_time: "",
		focus_time: 0,
		break_time: 0,
		cycles: 0,
		session_type: "pomodoro",
	});

	const startSession = (
		obj: Omit<
			CreateStudySession,
			"end_time" | "total_time" | "average_focus"
		>
	) => {
		setIsDirty(true);
		setSession((prev) => ({ ...prev, ...obj }));
	};

	const endSession = async () => {
		const { message, error } = await createSession(
			{
				...session,
				total_time: secondElapsed,
				end_time: new Date(Date.now()).toISOString(),
				average_focus: focusData.reduce((acc, point) => {
					acc += point.focus;
					return acc;
				}, 0),
			},
			focusData
		);
		if (error) {
			toast.error(message);
		} else {
			setFocusData([]);
			setSecondElapsed(0);
			toast.success(message);
		}
		return error;
	};

	useEffect(() => {
		return () => {
			if (secondElapsed > 0) endSession();
			setSession((prev) => ({
				...prev,
				start_time: "",
				end_time: null,
				total_time: 0,
				focus_time: 0,
				break_time: 0,
				cycles: 0,
				average_focus: 0,
			}));
		};
	}, []);

	const [isDirty, setIsDirty] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [nextPath, setNextPath] = useState(null);

	useEffect(() => {
		const handleBeforeUnload = (e: any) => {
			if (isDirty) {
				e.preventDefault();
				e.returnValue = "";
			}
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () =>
			window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [isDirty]);

	useEffect(() => {
		const handleClick = (e: any) => {
			if (!isDirty) return;

			const target = e.target.closest("a");
			if (
				target &&
				target.href &&
				!target.href.startsWith(
					window.location.origin + window.location.pathname
				)
			) {
				e.preventDefault();
				setNextPath(target.href);
				setShowModal(true);
			}
		};

		document.addEventListener("click", handleClick, true);
		return () => document.removeEventListener("click", handleClick, true);
	}, [isDirty]);

	const confirmLeave = () => {
		setIsDirty(false);
		if (nextPath) {
			window.location.href = nextPath;
		}
	};

	return (
		<main className="h-screen w-screen text-white px-6 transition-all duration-500 overflow-hidden">
			<div className="relative w-full h-full">
				{/* === Nội dung chính (Các Widget) === */}
				<div
					className={cn(
						"absolute top-1/11 left-1/2 -translate-x-1/2 w-[900px] h-140",
						"flex flex-col items-center justify-between"
					)}
				>
					{/* Widget 1: Pomodoro (Giữa) */}
					<PomodoroTimer
						showTasks={showTasks}
						onToggleTasks={() => setShowTasks(!showTasks)}
						isRunning={isRunning}
						setIsRunning={setIsRunning}
						secondElapsed={secondElapsed}
						setSecondElapsed={setSecondElapsed}
						startSession={startSession}
						endSession={endSession}
					/>

					<div className="flex gap-5 w-full h-full pt-4 justify-between">
						{/* Widget 2: Task List (Trái - Dưới) */}
						<TaskListWidget
							show={showTasks}
							onClose={() => setShowTasks(false)}
						/>

						{/* Widget 3: Biểu đồ Độ tập trung (Giữa - Dưới) */}
						<FocusChartWidget
							isRunning={isRunning}
							focusData={focusData}
							setFocusData={setFocusData}
						/>
					</div>
				</div>
			</div>
			<LeaveModal
				isOpen={showModal}
				onConfirm={confirmLeave}
				onCancel={() => setShowModal(false)}
			/>
		</main>
	);
};

export default StudyPage;
