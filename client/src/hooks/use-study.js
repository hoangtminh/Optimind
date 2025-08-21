"use client";

import { incompleteGoals } from "@/data/study-data";

const { createContext, useContext, useState } = require("react");

const StudyContext = createContext();

export function useStudy() {
	return useContext(StudyContext);
}

export function StudyProvider({ children }) {
	// Session state
	const [isRunning, setIsRunning] = useState(false);

	// Goals state
	const [currentGoalPage, setCurrentGoalPage] = useState(0);
	const [goalSortBy, setGoalSortBy] = useState("progress");

	// Tag management
	const [tagPage, setTagPage] = useState(0);
	const [editingTag, setEditingTag] = useState(null);

	// Sample data
	const [availableTags, setAvailableTags] = useState([
		{ id: 1, name: "Ôn tập", color: "#228B22" },
		{ id: 2, name: "Bài tập", color: "#FF7F50" },
		{ id: 3, name: "Đọc sách", color: "#228B22" },
		{ id: 4, name: "Nghiên cứu", color: "#4169E1" },
		{ id: 5, name: "Thực hành", color: "#FF7F50" },
	]);

	const addTag = (newTagData) => {
		if (newTagData.name.trim()) {
			const newTag = {
				id: Date.now(),
				name: newTagData.name,
				color: newTagData.color,
			};
			setAvailableTags([...availableTags, newTag]);
		}
	};

	const updateTag = (id, name, color) => {
		setAvailableTags(
			availableTags.map((tag) =>
				tag.id === id ? { ...tag, name, color } : tag
			)
		);
		setEditingTag(null);
	};

	const deleteTag = (id) => {
		setAvailableTags(availableTags.filter((tag) => tag.id !== id));
	};

	const sortedGoals = [...incompleteGoals].sort((a, b) => {
		if (goalSortBy === "progress") {
			return a.progress - b.progress;
		} else {
			return new Date(a.deadline) - new Date(b.deadline);
		}
	});

	const paginatedGoals = sortedGoals.slice(
		currentGoalPage * 5,
		(currentGoalPage + 1) * 5
	);

	const contextValue = {
		isRunning,
		setIsRunning,
		availableTags,
		addTag,
		updateTag,
		deleteTag,
		tagPage,
		setTagPage,
		paginatedGoals,
		editingTag,
		setEditingTag,
	};
	return (
		<StudyContext.Provider value={contextValue}>
			{children}
		</StudyContext.Provider>
	);
}
