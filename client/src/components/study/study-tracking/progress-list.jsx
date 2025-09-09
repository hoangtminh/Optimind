import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useStudy } from "@/hooks/use-study-session";
import React from "react";

const StudyProgressList = ({ activeProgress, changeActiveProgress }) => {
	const { sessionStudyProgress, setSessionStudyProgress } = useStudy();

	const toggleStudyProgress = (studyProgressId) => {
		setSessionStudyProgress((prev) =>
			prev.map((studyProgress) =>
				studyProgress._id === studyProgressId
					? { ...studyProgress, active: !studyProgress.completed }
					: studyProgress
			)
		);
	};

	const formatTime = (time) => {
		const hour = Math.floor(time / 60);
		const minute = time % 60;

		if (hour === 0) return `${minute}m`;

		return `${hour}h:${minute}m`;
	};

	return (
		<div>
			<div className="space-y-4">
				<div className="font-medium text-gray-700 capitalize mb-2">
					Chọn tiến trình thực hiện
				</div>
				{sessionStudyProgress.map((studyProgress) => {
					const isActive = studyProgress._id === activeProgress._id;

					return (
						<div
							key={studyProgress._id}
							className={`p-4 border rounded-lg shadow-lg transition-all ${
								studyProgress.completed
									? "bg-green-200/30 border-2 border-green-400"
									: isActive
									? "bg-background border-2 border-blue-400"
									: "bg-background border-purple-400/70"
							}`}
							onClick={() => changeActiveProgress(studyProgress)}
						>
							<div className="flex items-start gap-3">
								<div className="flex-1 space-y-2">
									<div className="flex items-center gap-2">
										<h4
											className={`font-medium text-purple-700 mr-4 ${
												studyProgress.completed
													? "line-through text-green-700"
													: ""
											}`}
										>
											{studyProgress.title}
										</h4>
										<div className="flex flex-wrap">
											{studyProgress.subject.map(
												(subject) => (
													<Badge
														variant="ghost"
														className={`text-xs  ${
															studyProgress.completed
																? "line-through text-green-700 border-green-500"
																: "text-purple-700/70 border-purple-500"
														}`}
													>
														{subject}
													</Badge>
												)
											)}
										</div>
									</div>
									<p
										className={`text-sm  ${
											studyProgress.complete
												? "line-through text-green-700"
												: "text-purple-700/70"
										}`}
									>
										{studyProgress.description}
									</p>
									<div
										className={`flex gap-3 items-center justify-between text-xs text-purple-600`}
									>
										<p className="text-xs text-nowrap w-fit font-medium text-purple-600">
											Mục tiêu:{" "}
											{formatTime(studyProgress.progress)}
											/{formatTime(studyProgress.target)}
										</p>
										<Progress
											value={
												(studyProgress.progress /
													studyProgress.target) *
												100
											}
											className={`h-2 bg-purple-200`}
											indicatorColor={` bg-purple-600 `}
										/>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default StudyProgressList;
