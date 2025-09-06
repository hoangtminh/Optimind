import { apiCall } from "./api-call";

export const taskApi = {
	getUserTask: async () => {
		return apiCall("/api/task", {
			method: "GET",
		});
	},
	createTask: async (newTaskData) => {
		return apiCall("/api/task", {
			method: "POST",
			body: JSON.stringify(newTaskData),
		});
	},
	updateTask: async (updateData) => {
		return apiCall("/api/task", {
			method: "PUT",
			body: JSON.stringify(updateData),
		});
	},
	deleteTask: async (taskId) => {
		return apiCall("/api/task", {
			method: "DELETE",
			body: JSON.stringify(taskId),
		});
	},
};
