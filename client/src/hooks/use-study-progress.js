"use client";

import { studyProgressApi } from "@/actions/study-progress-action";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const StudyProgressContext = createContext();

export function useStudyProgress() {
	return useContext(StudyProgressContext);
}

export function StudyProgressProvider({ children }) {
	const [studyProgress, setStudyProgress] = useState([]);
	const [studyProgressLoading, setStudyProgressLoading] = useState(false);

	const [newStudyProgress, setNewStudyProgress] = useState({
		title: "",
		description: "",
		subject: "",
		frequencyType: "one-time",
		frequency: "",
		deadline: "",
		target: "",
		progress: 0,
		complete: false,
	});

	const [addStudyProgressDialogOpen, setAddStudyProgressDialogOpen] =
		useState(false);
	const [editingStudyProgress, setEditingStudyProgress] = useState(null); // Added editing StudyProgress state

	useEffect(() => {
		if (studyProgressLoading) return;
		setStudyProgressLoading(true);
		getStudyProgress();
	}, []);

	const getStudyProgress = async () => {
		try {
			const res = await studyProgressApi.getUserStudyProgress();
			if (res.success) {
				setStudyProgress(res.data);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setStudyProgressLoading(false);
		}
	};

	const createStudyProgress = async () => {
		if (studyProgressLoading) return;
		try {
			setStudyProgressLoading(true);
			const res = await studyProgressApi.createStudyProgress(
				newStudyProgress
			);
			if (res.success) {
				getStudyProgress();
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setNewStudyProgress({
				title: "",
				description: "",
				subject: "",
				frequencyType: "one-time",
				frequency: "daily",
				deadline: "",
				target: 0,
				progress: 0,
				complete: false,
			});
		}
	};

	const updateStudyProgress = async () => {
		if (studyProgressLoading) return;
		try {
			setStudyProgressLoading(true);
			const res = await studyProgressApi.updateStudyProgress(
				editingStudyProgress
			);

			if (res.success) {
				getStudyProgress();
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const deleteStudyProgress = async (StudyProgressId) => {
		if (studyProgressLoading) return;
		try {
			setStudyProgressLoading(true);
			const res = await studyProgressApi.deleteStudyProgress({
				_id: StudyProgressId,
			});
			console.log(res);
			if (res.success) {
				getStudyProgress();
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const contextValue = {
		studyProgress,
		setStudyProgress,

		newStudyProgress,
		setNewStudyProgress,

		addStudyProgressDialogOpen,
		setAddStudyProgressDialogOpen,

		editingStudyProgress,
		setEditingStudyProgress,
		createStudyProgress,
		updateStudyProgress,
		deleteStudyProgress,
	};
	return (
		<StudyProgressContext.Provider value={contextValue}>
			{children}
		</StudyProgressContext.Provider>
	);
}
