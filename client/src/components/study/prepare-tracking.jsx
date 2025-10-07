"use client";

import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Book, Play } from "lucide-react";

import { Button } from "../ui/button";
import { useStudy } from "@/hooks/use-study-session";
import StudyMethod from "./prepare-session/study-methods";
import TagSelection from "./prepare-session/tag-selection";
import TaskPlanning from "./prepare-session/task-planning";
import SetNameDescription from "./prepare-session/set-name-description.jsx.jsx";
import Camera from "./camera";
import FocusChart from "./focus-chart";
import StudyProgressPlanning from "./prepare-session/study-progress-planning.jsx";

const PrepareTracking = () => {
	const { startSession } = useStudy();

	return (
		<Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
			<CardHeader>
				<CardTitle className="flex flex-row items-center gap-2 text-xl text-green-700">
					<Book className="w-5 h-5" />
					Chuẩn bị phiên học
				</CardTitle>
			</CardHeader>
			<CardContent className="w-full space-y-4 ">
				<div className="flex flex-row gap-4 w-full items-start">
					<div className="flex flex-col gap-4 p-4 w-[60%] bg-white border border-green-400 rounded-lg shadow-md">
						<SetNameDescription />
						<TagSelection />
					</div>
					<div className="w-[70%] p-4">
						<StudyMethod />
					</div>
				</div>

				{/* Task Planning */}
				<div className="grid grid-cols-2 gap-3	">
					<TaskPlanning />
					<StudyProgressPlanning />
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					{/* Camera Section */}
					<Camera />
					<FocusChart />
				</div>

				{/* Control Buttons */}
				<Button
					onClick={startSession}
					className="w-full bg-green-600 hover:bg-green-700 hover:cursor-pointer"
					size="lg"
				>
					<Play className="h-5 w-5 mr-2" />
					Bắt đầu phiên học
				</Button>
			</CardContent>
		</Card>
	);
};

export default PrepareTracking;
