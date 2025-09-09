import { apiCall } from "./api-call";

export const studyProgressApi = {
	getUserStudyProgress: async () => {
		return apiCall("/api/study-progress", {
			method: "GET",
		});
	},
	createStudyProgress: async (newStudyProgressData) => {
		return apiCall("/api/study-progress", {
			method: "POST",
			body: JSON.stringify(newStudyProgressData),
		});
	},
	updateStudyProgress: async (updateData) => {
		return apiCall("/api/study-progress", {
			method: "PUT",
			body: JSON.stringify(updateData),
		});
	},
	deleteStudyProgress: async (studyProgressId) => {
		return apiCall("/api/study-progress", {
			method: "DELETE",
			body: JSON.stringify(studyProgressId),
		});
	},
};
