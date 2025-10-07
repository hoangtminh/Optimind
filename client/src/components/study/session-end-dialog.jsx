"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	CheckCircle2,
	Circle,
	Clock,
	Target,
	Tag,
	BookOpen,
	TrendingUp,
} from "lucide-react";
import { useStudy } from "@/hooks/use-study-session";

const SessionEndDialog = ({ open, onOpenChange, focusAverage }) => {
	const { timeRemaining, maxTime, sessionTasks, sessionTags, sessionData } =
		useStudy();
	// open={isSessionEndDialogOpen}
	// 				onOpenChange={setIsSessionEndDialogOpen}
	// 				timeStudied={sessionEndData.timeStudied}
	// 				focusAverage={sessionEndData.focusAverage}

	const handleSaveSession = () => {
		// Here you would typically save the session to a database or state management
		// console.log("[v0] Saving session:", sessionEndData);

		// Close dialog and reset session
		setIsSessionEndDialogOpen(false);
		setIsSessionActive(false);
		setTimeRemaining(0);
		setFocusData([]);
		setSessionEndData(null);

		// Stop camera and recording if active
		stopCamera();
		if (mediaRecorder && isRecording) {
			mediaRecorder.stop();
		}
	};

	const handleDiscardSession = () => {
		console.log("[v0] Discarding session");

		// Close dialog and reset session without saving
		setIsSessionEndDialogOpen(false);
		setIsSessionActive(false);
		setTimeRemaining(0);
		setFocusData([]);
		setSessionEndData(null);

		// Stop camera and recording if active
		stopCamera();
		if (mediaRecorder && isRecording) {
			mediaRecorder.stop();
		}
	};

	const formatTime = (seconds) => {
		const hours = Math.floor(seconds / 3600);
		const mins = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;

		if (hours > 0) {
			return `${hours}h ${mins}m ${secs}s`;
		}
		return `${mins}m ${secs}s`;
	};

	const completedTasks =
		sessionTasks?.filter((task) => task.completed).length || 0;
	const totalTasks = sessionTasks.length || 0;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle className="text-xl">
						Kết thúc phiên học
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4 py-4">
					{/* Session Summary */}
					<div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 space-y-3">
						<div className="flex items-center gap-2">
							<Clock className="h-5 w-5 text-indigo-600" />
							<div>
								<p className="text-sm text-gray-600">
									Thời gian học
								</p>
								<p className="text-2xl font-bold text-indigo-600">
									{formatTime(maxTime - timeRemaining)}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<TrendingUp className="h-5 w-5 text-green-600" />
							<div>
								<p className="text-sm text-gray-600">
									Độ tập trung trung bình
								</p>
								<p className="text-xl font-semibold text-green-600">
									{focusAverage}%
								</p>
							</div>
						</div>
					</div>

					{/* Tags */}
					{sessionTags && sessionTags.length > 0 && (
						<div className="flex items-start gap-2">
							<Tag className="h-5 w-5 text-gray-600 mt-0.5" />
							<div className="flex-1">
								<p className="text-sm text-gray-600 mb-2">
									Tags
								</p>
								<div className="flex flex-wrap gap-2">
									{sessionData.tags.map((tag) => (
										<Badge
											key={tag.id}
											style={{
												backgroundColor: tag.color,
												color: "white",
											}}
										>
											{tag.name}
										</Badge>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Tasks */}
					{sessionTasks && sessionTasks.length > 0 && (
						<div className="flex items-start gap-2">
							<Target className="h-5 w-5 text-gray-600 mt-0.5" />
							<div className="flex-1">
								<p className="text-sm text-gray-600 mb-2">
									Nhiệm vụ ({completedTasks}/{totalTasks} hoàn
									thành)
								</p>
								<div className="space-y-2 max-h-32 overflow-y-auto">
									{sessionTasks.map((task) => (
										<div
											key={task._id}
											className="flex items-center gap-2 text-sm"
										>
											{task.completed ? (
												<CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
											) : (
												<Circle className="h-4 w-4 text-gray-400 flex-shrink-0" />
											)}
											<span
												className={
													task.completed
														? "line-through text-gray-500"
														: "text-gray-900"
												}
											>
												{task.text}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Method Info */}
					<div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
						<span className="font-medium">Phương pháp: </span>
						{sessionData.method === "countdown" && "Đếm ngược"}
						{sessionData.method === "pomodoro" &&
							`Pomodoro (${sessionData.currentCycle}/${sessionData.cycles} chu kỳ)`}
						{sessionData.method === "freeform" && "Tự do"}
					</div>
				</div>

				<DialogFooter className="flex gap-2 sm:gap-2">
					<Button
						variant="outline"
						onClick={handleDiscardSession}
						className="flex-1 bg-transparent"
					>
						Không lưu
					</Button>
					<Button
						onClick={handleSaveSession}
						className="flex-1 bg-indigo-600 hover:bg-indigo-700"
					>
						Lưu phiên học
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SessionEndDialog;
