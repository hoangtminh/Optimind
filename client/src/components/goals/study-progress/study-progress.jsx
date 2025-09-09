import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../ui/card";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

import StudyProgressPattern from "../pattern/study-progress-pattern";
import { useStudyProgress } from "@/hooks/use-study-progress";
import { Button } from "../../ui/button";

const StudyProgress = () => {
	const { studyProgress } = useStudyProgress();

	const [studyProgressPage, setStudyProgressPage] = useState(0);
	const paginatedStudyProgress = studyProgress.slice(
		studyProgressPage * 4,
		(studyProgressPage + 1) * 4
	);

	return (
		<Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
			<CardHeader className={`flex flex-row justify-between`}>
				<div>
					<CardTitle className="flex items-center gap-2 text-purple-800">
						<TrendingUp className="h-5 w-5" />
						Tiến độ học tập ({studyProgress.length})
					</CardTitle>
					<CardDescription className="text-purple-600">
						Tiến trình đang thực hiện
					</CardDescription>
				</div>
				<div className="flex gap-2 justify-between items-center">
					<span className="pl-1 text-sm text-slate-700">
						{studyProgressPage * 4 + 1}-
						{Math.min(
							(studyProgressPage + 1) * 4,
							studyProgress.length
						)}{" "}
						của {studyProgress.length}
					</span>
					<div className="flex gap-1">
						<Button
							variant="ghost"
							size="sm"
							onClick={() =>
								setStudyProgressPage(
									Math.max(0, studyProgressPage - 1)
								)
							}
							disabled={studyProgressPage === 0}
							className={
								"hover:cursor-pointer hover:bg-purple-300"
							}
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setTaskPage(taskPage + 1)}
							disabled={
								(studyProgressPage + 1) * 5 >=
								studyProgress.length
							}
							className={
								"hover:cursor-pointer hover:bg-purple-300"
							}
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				{paginatedStudyProgress.map((studyProgress) => (
					<StudyProgressPattern
						studyProgress={studyProgress}
						color="purple"
						key={studyProgress._id}
						type={"daily"}
					/>
				))}
			</CardContent>
		</Card>
	);
};

export default StudyProgress;
