"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Plus } from "lucide-react";
import React, { useState } from "react";
// import ShowSelectedStudyProgress from "./show-selected-StudyProgress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useStudy } from "@/hooks/use-study-session";
import { useStudyProgress } from "@/hooks/use-study-progress";
import { Badge } from "@/components/ui/badge";
import AddStudyProgress from "@/components/goals/study-progress/add-study-progress";
import { Progress } from "@/components/ui/progress";

const StudyProgressPlanning = () => {
	const { studyProgress, setAddStudyProgressDialogOpen } = useStudyProgress();
	const { sessionStudyProgress, setSessionStudyProgress } = useStudy();

	const filteredStudyProgresss = studyProgress.filter(
		(progress) => !progress.complete
	);

	const isStudyProgressSelected = (studyProgress) => {
		return sessionStudyProgress.find((t) => t._id === studyProgress._id);
	};

	const toggleStudyProgressSelection = (studyProgress) => {
		setSessionStudyProgress((prev) => {
			if (isStudyProgressSelected(studyProgress)) {
				return prev.filter((t) => t._id !== studyProgress._id);
			} else {
				return [...prev, studyProgress];
			}
		});
	};

	// StudyProgress sorting
	const [studyProgressSearch, setStudyProgressSearch] = useState("");
	const [studyProgressSort, setStudyProgressSort] = useState("name");

	const getFilteredStudyProgress = () => {
		const filtered = filteredStudyProgresss.filter((studyProgress) => {
			const matchesSearch = studyProgress.title
				.toLowerCase()
				.includes(studyProgressSearch.toLowerCase());

			return matchesSearch;
		});
		// Sort the filtered StudyProgresss
		return filtered.sort((a, b) => {
			switch (studyProgressSort) {
				case "deadline":
					if (!a.deadline && !b.deadline) return 0;
					if (!a.deadline) return 1;
					if (!b.deadline) return -1;
					return new Date(a.deadline) - new Date(b.deadline);
				case "title":
					return a.title.localeCompare(b.title);
				default:
					return 0;
			}
		});
	};

	const formatTime = (time) => {
		const hour = Math.floor(time / 60);
		const minute = time % 60;

		if (hour === 0) return `${minute}m`;

		return `${hour}h:${minute}m`;
	};

	return (
		<div>
			<Label className="text-md font-medium mb-3">
				Tiến trình trong phiên học
			</Label>
			<div className="flex flex-row gap-3 mb-3">
				<Input
					placeholder="Tìm kiếm tiến trình theo tên..."
					value={studyProgressSearch}
					onChange={(e) => setStudyProgressSearch(e.target.value)}
					className="text-sm shadow-md border-green-300"
				/>
				<Select
					value={studyProgressSort}
					onValueChange={setStudyProgressSort}
				>
					<SelectTrigger className="text-sm bg-white w-45 shadow-md border-green-300">
						<SelectValue placeholder="Sắp xếp" />
					</SelectTrigger>
					<SelectContent className="shadow-md border-green-300">
						<SelectItem value="none">Không sắp xếp</SelectItem>
						<SelectItem value="deadline">Hạn chót</SelectItem>
						<SelectItem value="title">Tên</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="space-y-4">
				<div className="flex flex-row p-2 gap-3 bg-white shadow-md rounded-lg border border-green-300">
					<ScrollArea className="flex flex-col gap-2 h-[100%] max-h-80 px-1 py-2 w-full rounded-md overflow-y-auto ">
						{getFilteredStudyProgress().map((studyProgress) => (
							<div
								key={studyProgress._id}
								className={`p-3 rounded-lg ${
									isStudyProgressSelected(studyProgress)
										? "bg-purple-200/30 border-2 border-purple-400"
										: "bg-white/60 border border-purple-200"
								}`}
								onClick={() =>
									toggleStudyProgressSelection(studyProgress)
								}
							>
								<div className="flex flex-row justify-between items-start mb-1">
									<div
										className={`font-medium text-purple-800 text-md`}
									>
										{studyProgress.title}
									</div>
									<div
										className={`flex m-0 flex-row gap-2 items-center`}
									>
										{studyProgress.complete ? (
											<Badge className="bg-green-100 text-green-800 text-xs">
												Hoàn thành
											</Badge>
										) : (
											<Badge
												className={`bg-purple-100 text-purple-800 text-xs`}
											>
												Chưa hoàn thành
											</Badge>
										)}
									</div>
								</div>
								<div className="flex items-start justify-between">
									<div className="w-full flex justify-between">
										<div>
											<div
												className={`w-fit text-right text-wrap text-sm text-purple-600 min-w-20`}
											>
												Mục tiêu:{" "}
												{formatTime(
													studyProgress.target
												)}
											</div>
										</div>
									</div>
									{studyProgress.frequencyType ===
									"repeat" ? (
										<div
											className={`flex flex-wrap items-start justify-end gap-2 text-purple-600`}
										>
											{studyProgress.frequency.map(
												(day, index) => (
													<Badge
														variant={`ghost`}
														key={index}
														className={"text-xs"}
													>
														{day}
													</Badge>
												)
											)}
										</div>
									) : (
										<div
											className={`flex text-wrap text-right text-purple-600 text-sm min-w-30`}
										>
											Hạn:{" "}
											{studyProgress.deadline.slice(
												0,
												10
											)}
										</div>
									)}
								</div>
								<div className="space-y-1">
									<div
										className={`flex gap-3 items-center justify-between text-sm text-purple-600`}
									>
										{studyProgress.description && (
											<p
												className={`text-xs text-purple-600 mt-1 italic`}
											>
												Ghi chú:{" "}
												{studyProgress.description}
											</p>
										)}
									</div>
									<div
										className={`flex gap-3 items-center justify-between text-xs text-purple-600`}
									>
										<Progress
											value={
												(studyProgress.progress /
													studyProgress.target) *
												100
											}
											className={`h-2 bg-purple-200`}
											indicatorColor={`bg-purple-600`}
										/>

										<span className="w-fit text-right text-nowrap min-w-20">
											{formatTime(studyProgress.progress)}{" "}
											/ {formatTime(studyProgress.target)}
										</span>
									</div>
								</div>
							</div>
						))}
					</ScrollArea>

					<Button
						onClick={() => {
							setAddStudyProgressDialogOpen(true);
						}}
						size="sm"
						className={"w-10 h-10 bg-blue-500 hover:bg-blue-700"}
					>
						<Plus className="h-6 w-6" />
					</Button>
					<AddStudyProgress />
				</div>
			</div>

			{/* Show selected StudyProgress
			{selectedStudyProgresss.length > 0 && (
				<ShowSelectedStudyProgress
					selectedStudyProgresss={selectedStudyProgresss}
				/>
			)} */}
		</div>
	);
};

export default StudyProgressPlanning;
