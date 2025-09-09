import { apiCall } from "./api-call.js";

const studySessionApi = {
	getUsersSessions: async () => {
		return apiCall("/api/study-session", {
			method: "GET",
		});
	},
	createStudySession: (studySessionData) => {
		return apiCall("/api/study-session", {
			method: "POST",
			body: JSON.stringify(studySessionData),
		});
	},
};

export default studySessionApi;
