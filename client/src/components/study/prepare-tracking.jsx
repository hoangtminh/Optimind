"use client";

import React, { useState } from "react";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Book, Play } from "lucide-react";

import { Button } from "../ui/button";
import { useStudy } from "@/hooks/use-study-session";
import StudyMethod from "./prepare-session/study-methods";
import SubjectSelection from "./prepare-session/subject-selection";
import TagSelection from "./prepare-session/tag-selection";
import TaskPlanning from "./prepare-session/task-planning";
import SetNameDescription from "./prepare-session/set-name-description.jsx.jsx";

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
			<CardContent className="space-y-4">
				{/* Name and Desciption */}
				<SetNameDescription />

				{/* Study Methods Tabs */}
				<StudyMethod />

				{/* Subject Selection */}
				<SubjectSelection />

				{/* Session Tags */}
				<TagSelection />

				{/* Task Planning */}
				<TaskPlanning addTask={addTask} removeTask={removeTask} />

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
