"use client";

import { authApi } from "@/actions/auth-action";
import { authReducer } from "@/reducer/auth-reducer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

const initialState = {
	user: null,
	loading: false,
	isAuthenticated: false,
	error: null,
	status: "free",
};

export function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const router = useRouter();

	useEffect(() => {
		if (state.loading) return;
		getSession();
	}, []);

	useEffect(() => {
		if (!state.isAuthenticated) {
			return;
		}
		getSession();
		const interval = setInterval(async () => {
			try {
				await authApi.refreshSession();
			} catch (error) {
				toast.warning("Login to continue");
				router.push("/login");
			}
		}, 15 * 60 * 1000); // Check every 5 minutes

		return () => clearInterval(interval);
	}, [state.isAuthenticated]);

	const login = async (loginData, remember) => {
		dispatch({ type: "LOGIN_START" });
		try {
			const res = await authApi.login({
				...loginData,
				remember,
			});
			const session = getSession();
			if (session) {
				router.push("/dashboard");
				toast.success("Login successful");
			}
			return res;
		} catch (error) {
			dispatch({
				type: "LOGIN_ERROR",
				payload: error.message,
			});
			toast.error(error.message);
		}
	};

	const register = async (registerData) => {
		dispatch({ type: "REGISTER_START" });
		try {
			if (registerData.password != registerData.confirmPassword) {
				return toast.error("Confirm password incorrect");
			}

			const res = await authApi.register({
				email: registerData.email,
				password: registerData.password,
				username: registerData.username,
			});
			if (res.success) {
				toast.success("Register successful");
				router.push("/auth.login");
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			dispatch({ type: "SET_LOADING", payload: false });
		}
	};

	const logout = async () => {
		if (state.loading) return;
		try {
			const res = await authApi.logout();
			dispatch({ type: "LOGOUT" });
			getSession();
			router.push("/auth/login");
			toast.success("Logout successful");
		} catch (error) {
			toast.error(error.message);
		}
	};

	const getSession = async () => {
		try {
			dispatch({ type: "SET_LOADING", payload: true });
			const res = await authApi.getSession();
			if (res.success) {
				dispatch({ type: "SET_USER", payload: res.data });
				return res.data;
			}
		} catch (error) {
			try {
				const refresh = await authApi.refreshSession();
				if (refresh.success) {
					dispatch({ type: "SET_USER", payload: refresh.data });
					return refresh.data;
				}
			} catch (error) {
				toast.warning(error.message);
				return null;
			} finally {
				dispatch({ type: "SET_LOADING", payload: false });
			}
		}
	};

	const contextValue = {
		...state,
		state,
		login,
		logout,
		register,
	};
	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
}
