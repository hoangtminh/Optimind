import { apiCall } from "./api-call";

export const tagApi = {
	getUserTag: async () => {
		return apiCall("/api/tag", {
			method: "GET",
		});
	},
	createTag: async (tagData) => {
		return apiCall("/api/tag", {
			method: "POST",
			body: JSON.stringify(tagData),
		});
	},
	updateTag: async (updateData) => {
		return apiCall("/api/tag", {
			method: "PUT",
			body: JSON.stringify(updateData),
		});
	},
	deleteTag: async (tagId) => {
		return apiCall("/api/tag", {
			method: "DELETE",
			body: JSON.stringify(tagId),
		});
	},
};
