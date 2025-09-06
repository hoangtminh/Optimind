import { apiCall } from "./api-call";

export const studyProgressApi = {
	getUserStudyProgress: async () => {
		return apiCall("/api/studyProgress", {
			method: "GET",
		});
	},
	createStudyProgress: async (newStudyProgressData) => {
		return apiCall("/api/studyProgress", {
			method: "POST",
			body: JSON.stringify(newStudyProgressData),
		});
	},
	updateStudyProgress: async (updateData) => {
		return apiCall("/api/studyProgress", {
			method: "PUT",
			body: JSON.stringify(updateData),
		});
	},
	deleteStudyProgress: async (studyProgressId) => {
		return apiCall("/api/studyProgress", {
			method: "DELETE",
			body: JSON.stringify(studyProgressId),
		});
	},
};
