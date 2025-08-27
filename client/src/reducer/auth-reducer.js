export const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN_START":
		case "REGISTER_START":
			return { ...state, loading: true };

		case "LOGOUT":
			return {
				user: null,
				isAuthenticated: false,
				loading: true,
			};
		case "SET_USER":
			return {
				user: action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case "CLEAR_ERROR":
			return { ...state, loading: false };
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

export const AUTH_PATHNAME = [
	"/auth/login",
	"/auth/register",
	"/auth/forgot-password",
	"/auth/verify-email",
	"/",
];
