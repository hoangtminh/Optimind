"use client";

import { subjectApi } from "@/actions/subject-action";
import { toast } from "sonner";

const { createContext, useContext, useState, useEffect } = require("react");

const subjectContext = createContext();
export function useSubject() {
	return useContext(subjectContext);
}

// [
// 		{
// 			id: 1,
// 			name: "Giải tích 1",
// 			color: "#228B22",
// 		},
// 		{
// 			id: 2,
// 			name: "Giải tích 2",
// 			color: "#228B22",
// 		},
// 		{
// 			id: 3,
// 			name: "Vật lý đại cương 1",
// 			color: "#FF7F50",
// 		},
// 		{
// 			id: 4,
// 			name: "Giải tích 3",
// 			color: "#228B22",
// 		},
// 		{
// 			id: 5,
// 			name: "Vật lý đại cương 2",
// 			color: "#FF7F50",
// 		},
// 		{
// 			id: 6,
// 			name: "Triết học Mác-Lênin",
// 			color: "#4169E1",
// 		},
// 		{
// 			id: 7,
// 			name: "Xác suất thống kê",
// 			color: "#228B22",
// 		},
// 	]

export function SubjectProvider({ children }) {
	const [subjects, setSubjects] = useState([]);
	const [subjectLoading, setSubjectLoading] = useState(false);
	const [editingSubject, setEditingSubject] = useState({
		_id: "",
		name: "",
		color: "",
	});

	// Dialog states for Subject management
	const [isAddSubjectDialogOpen, setIsAddSubjectDialogOpen] = useState(false);
	const [isEditSubjectDialogOpen, setIsEditSubjectDialogOpen] =
		useState(false);

	useEffect(() => {
		if (subjectLoading) return;
		getSubject();
	}, []);

	const getSubject = async () => {
		try {
			setSubjectLoading(true);
			console.log("get subjects");
			const res = await subjectApi.getUserSubject();
			console.log(res);
			if (res.success) {
				setSubjects(res.data);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setSubjectLoading(false);
		}
	};

	const createSubject = async (newSubjectData) => {
		if (subjectLoading) return;
		try {
			setSubjectLoading(true);
			if (newSubjectData.name.trim()) {
				const res = await subjectApi.createSubject({
					name: newSubjectData.name.trim(),
					color: newSubjectData.color.toLowerCase().trim(),
				});
				if (res.success) {
					getSubject();
					toast.success("New subject created");
				}
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setSubjectLoading(false);
		}
	};

	const updateSubject = async (subjectId, updateData) => {
		if (subjectLoading) return;
		try {
			if (updateData.name.trim()) {
				const res = await subjectApi.updateSubject({
					_id: subjectId,
					name: updateData.name.trim(),
					color: updateData.color.trim(),
				});
				if (res.success) {
					getSubject();
					toast.success("Subject updated");
				}
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setSubjectLoading(false);
		}
	};

	const deleteSubject = async (subjectId) => {
		if (subjectLoading) return;
		try {
			const res = await subjectApi.deleteSubject({
				_id: subjectId,
			});
			if (res.success) {
				getSubject();
				toast.success("Delete subject successfully");
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setSubjectLoading(false);
		}
	};

	const contextValue = {
		subjects,
		editingSubject,

		isAddSubjectDialogOpen,
		setIsAddSubjectDialogOpen,
		setEditingSubject,
		isEditSubjectDialogOpen,
		setIsEditSubjectDialogOpen,

		getSubject,
		createSubject,
		updateSubject,
		deleteSubject,
	};

	return (
		<subjectContext.Provider value={contextValue}>
			{children}
		</subjectContext.Provider>
	);
}
