import { apiCall } from "./api-call";

export const subjectApi = {
	getUserSubject: async () => {
		return apiCall("/api/subject", {
			method: "GET",
		});
	},
	createSubject: async (subjectData) => {
		return apiCall("/api/subject", {
			method: "POST",
			body: JSON.stringify(subjectData),
		});
	},
	updateSubject: async (updateData) => {
		return apiCall("/api/subject", {
			method: "PUT",
			body: JSON.stringify(updateData),
		});
	},
	deleteSubject: async (subjectId) => {
		return apiCall("/api/subject", {
			method: "DELETE",
			body: JSON.stringify(subjectId),
		});
	},
};
