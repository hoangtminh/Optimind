const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

export const apiCall = async (endpoint, options = {}) => {
	const url = `${API_BASE_URL}${endpoint}`;
	console.log(url);
	const headers = {
		...options,
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
		credentials: "include",
	};

	try {
		const res = await fetch(url, headers);
		const data = await res.json();

		if (!res.ok) {
			throw new ApiError(
				data.message || "Something went wrong",
				res.status
			);
		}
		return data;
	} catch (err) {
		if (err instanceof ApiError) {
			throw err;
		}
		throw new ApiError("Network error occurred", 500);
	}
};
