"use client";

const { createContext, useContext, useState } = require("react");

const subjectContext = createContext();

export function useSubject() {
	return useContext(subjectContext);
}

export function SubjectProvider({ children }) {
	const [availableSubjects, setAvailableSubjects] = useState([
		{
			id: 1,
			name: "Giải tích 1",
			color: "#228B22",
		},
		{
			id: 2,
			name: "Giải tích 2",
			color: "#228B22",
		},
		{
			id: 3,
			name: "Vật lý đại cương 1",
			color: "#FF7F50",
		},
		{
			id: 4,
			name: "Giải tích 3",
			color: "#228B22",
		},
		{
			id: 5,
			name: "Vật lý đại cương 2",
			color: "#FF7F50",
		},
		{
			id: 6,
			name: "Triết học Mác-Lênin",
			color: "#4169E1",
		},
		{
			id: 7,
			name: "Xác suất thống kê",
			color: "#228B22",
		},
	]);

	// Dialog states for Subject management
	const [isAddSubjectDialogOpen, setIsAddSubjectDialogOpen] = useState(false);
	const [isEditSubjectDialogOpen, setIsEditSubjectDialogOpen] =
		useState(false);

	const [newSubjectData, setNewSubjectData] = useState({
		name: "",
		color: "#228B22",
	});

	const addSubject = (newSubjectData) => {
		if (newSubjectData.name.trim()) {
			const newSubject = {
				id: Date.now(),
				name: newSubjectData.name,
				color: newSubjectData.color,
			};
			setAvailableSubjects([...availableSubjects, newSubject]);
		}
	};

	const updateSubject = (id, name, color) => {
		setAvailableSubjects(
			availableSubjects.map((subject) =>
				subject.id === id ? { ...subject, name, color } : subject
			)
		);
		setEditingSubject(null);
	};

	const deleteSubject = (id) => {
		setAvailableSubjects(
			availableSubjects.filter((subject) => subject.id !== id)
		);
	};

	const contextValue = {
		availableSubjects,
		setAvailableSubjects,
		isAddSubjectDialogOpen,
		setIsAddSubjectDialogOpen,
		isEditSubjectDialogOpen,
		setIsEditSubjectDialogOpen,
		addSubject,
		updateSubject,
		deleteSubject,
		newSubjectData,
		setNewSubjectData,
	};

	return (
		<subjectContext.Provider value={contextValue}>
			{children}
		</subjectContext.Provider>
	);
}
