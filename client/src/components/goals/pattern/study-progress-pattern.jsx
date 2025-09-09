import React from "react";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import { Input } from "../../ui/input";
import { Edit, Trash2 } from "lucide-react";
import { useStudyProgress } from "@/hooks/use-study-progress";

const ProgressPattern = ({ studyProgress, color, type }) => {
	const { updateProgress, setEditingStudyProgress, deleteStudyProgress } =
		useStudyProgress();

	const formatTime = (time) => {
		const hour = Math.floor(time / 60);
		const minute = time % 60;

		if (hour === 0) return `${minute}m`;

		return `${hour}h:${minute}m`;
	};

	const editable = type !== "overdue";

	return (
		<div
			key={studyProgress._id}
			className={`p-3 bg-white/60 rounded-lg border border-${color}-200`}
		>
			<div className="flex flex-row justify-between items-start">
				<div className={`font-medium text-${color}-800 text-base mb-2`}>
					{studyProgress.title}
				</div>
				<div className="flex items-center gap-1">
					{editable && (
						<Button
							variant="ghost"
							size="sm"
							className="h-6 w-6 p-0"
							onClick={() =>
								setEditingStudyProgress(studyProgress)
							}
						>
							<Edit className="h-3 w-3" />
						</Button>
					)}
					<Button
						variant="ghost"
						size="sm"
						className="h-6 w-6 p-0"
						onClick={() => deleteStudyProgress(studyProgress._id)}
					>
						<Trash2 className="h-3 w-3" />
					</Button>
				</div>
			</div>
			<div className="flex items-start justify-between">
				<div className="w-full flex justify-between">
					<div>
						<div
							className={`flex flex-wrap items-center gap-2 text-sm text-${color}-600 mb-1`}
						>
							<span className="text-nowrap">Môn học:</span>
							{studyProgress.subject.map((subject, index) => (
								<Badge
									variant={"ghost"}
									key={index}
									className={`border border-${color}-200`}
								>
									{subject}
								</Badge>
							))}
						</div>
						<div
							className={`w-fit text-right text-wrap text-sm text-${color}-600 min-w-20`}
						>
							Mục tiêu: {formatTime(studyProgress.target)}
						</div>
					</div>
					{studyProgress.frequencyType === "repeat" ? (
						<div
							className={`flex flex-wrap items-start justify-end gap-2 text-${color}-600`}
						>
							{studyProgress.frequency.map((day, index) => (
								<Badge variant={`ghost`} key={index}>
									{day}
								</Badge>
							))}
						</div>
					) : (
						<div
							className={`flex text-wrap text-right text-${color}-600 text-sm min-w-30`}
						>
							Hạn: {studyProgress.deadline.slice(0, 10)}
						</div>
					)}
				</div>
			</div>

			<div className="space-y-2">
				<div
					className={`flex gap-3 items-center justify-between text-xs text-${color}-600`}
				>
					<Progress
						value={
							(studyProgress.progress / studyProgress.target) *
							100
						}
						className={`h-2 bg-${color}-200`}
						indicatorColor={`bg-${color}-600`}
					/>

					<span className="w-fit text-right text-wrap min-w-20">
						{formatTime(studyProgress.progress)} /{" "}
						{formatTime(studyProgress.target)}
					</span>
				</div>
			</div>
			<div className="flex justify-between items-center text-xs mb-1">
				{studyProgress.frequencyType === "deadline" && (
					<div
						className={`flex justify-between items-center text-xs text-${color}-600`}
					>
						Deadline: {studyProgress.deadline}
					</div>
				)}
			</div>
			<div className="space-y-2">
				<div
					className={`flex gap-3 items-center justify-between text-sm text-${color}-600`}
				>
					{studyProgress.description && (
						<p className={`text-xs text-${color}-600 mt-1 italic`}>
							Ghi chú: {studyProgress.description}
						</p>
					)}
					<div className={`flex m-0 flex-row gap-2 items-center`}>
						{studyProgress.complete ? (
							<Badge className="bg-green-100 text-green-800 text-xs">
								Hoàn thành
							</Badge>
						) : (
							<Badge
								className={`bg-${color}-100 text-${color}-800 text-xs`}
							>
								Chưa hoàn thành
							</Badge>
						)}
					</div>
				</div>

				<div className="flex justify-between items-center text-xs">
					{studyProgress.frequencyType === "deadline" &&
						type !== "overdue" && (
							<div
								className={`flex justify-between items-center text-xs text-${color}-600`}
							>
								Deadline: {studyProgress.deadline}
							</div>
						)}
					{type === "overdue" && (
						<div className="flex justify-between items-center text-xs">
							<Badge variant="destructive" className="text-xs">
								Deadline: {studyProgress.deadline}
							</Badge>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProgressPattern;
