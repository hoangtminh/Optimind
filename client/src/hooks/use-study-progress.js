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

	const createStudyProgress = async (newStudyProgress) => {
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
			setStudyProgressLoading(false);
		}
	};

	const updateStudyProgress = async (newStudyProgress) => {
		if (studyProgressLoading) return;
		try {
			setStudyProgressLoading(true);
			const res = await studyProgressApi.updateStudyProgress(
				newStudyProgress
			);

			if (res.success) {
				getStudyProgress();
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setStudyProgressLoading(false);
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
		} finally {
			setStudyProgressLoading(false);
		}
	};

	const contextValue = {
		studyProgress,
		setStudyProgress,

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
