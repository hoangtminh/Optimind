"use client";

import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Book, Play } from "lucide-react";

import { Button } from "../ui/button";
import { useStudy } from "@/hooks/use-study-session";
import StudyMethod from "./prepare-session/study-methods";
import SubjectSelection from "./prepare-session/subject-selection";
import TagSelection from "./prepare-session/tag-selection";
import TaskPlanning from "./prepare-session/task-planning";
import SetNameDescription from "./prepare-session/set-name-description.jsx.jsx";
import Camera from "./camera";
import FocusChart from "./focus-chart";

const PrepareTracking = () => {
	const { startSession } = useStudy();

	const addTask = () => {
		if (newTask.trim()) {
			setSessionTasks([
				...sessionTasks,
				{ id: Date.now(), text: newTask, completed: false },
			]);
			setNewTask("");
		}
	};

	const removeTask = (id) => {
		setSessionTasks(sessionTasks.filter((task) => task.id !== id));
	};

	return (
		<Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
			<CardHeader>
				<CardTitle className="flex flex-row items-center gap-2 text-xl text-green-700">
					<Book className="w-5 h-5" />
					Chuẩn bị phiên học
				</CardTitle>
			</CardHeader>
			<CardContent className="w-full space-y-4 ">
				{/* Study Methods Tabs */}
				<div className="flex flex-col w-full items-center">
					<StudyMethod />
					{/* Name and Desciption */}
					<SetNameDescription />
				</div>

				<div className="grid grid-cols-2 gap-4">
					{/* Subject Selection */}
					<SubjectSelection />

					{/* Session Tags */}
					<TagSelection />
				</div>

				{/* Task Planning */}
				<TaskPlanning addTask={addTask} removeTask={removeTask} />

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
