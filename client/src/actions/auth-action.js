"use client";

import { apiCall } from "./api-call";

export const authApi = {
	login: async (loginData) => {
		return apiCall("/auth/login", {
			method: "POST",
			body: JSON.stringify(loginData),
		});
	},
	register: async (registerData) => {
		return apiCall("/auth/register", {
			method: "POST",
			body: JSON.stringify(registerData),
		});
	},
	logout: async () => {
		return apiCall("/auth/logout", {
			method: "POST",
		});
	},
	getSession: async () => {
		return apiCall("/auth/getSession", {
			method: "GET",
		});
	},
	refreshSession: async () => {
		await apiCall("/auth/refreshSession", { method: "POST" });
		return apiCall("/auth/getSession", {
			method: "GET",
		});
	},
};
