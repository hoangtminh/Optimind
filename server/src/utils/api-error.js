export class ApiError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
	}
}

export const handleApiError = (error, res) => {
	if (error instanceof ApiError) {
		return res
			.status(error.statusCode)
			.json({ success: false, message: error.message });
	}
	console.log(error);
	return res
		.status(500)
		.json({ success: false, message: "Error in server side" });
};
