import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/UserType";
import { AuthContext, AuthContextObject } from "./AuthContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	function getLocalData() {
		const localUser = localStorage.getItem("user");
		const localToken = localStorage.getItem("token");

		if (localToken && localUser) {
			const parsed = JSON.parse(localUser);
			setUser(parsed);
		}

		setLoading(false);
	}

	/**
	 * Store login credentials
	 * @param token authentication token
	 * @param user current user detail
	 */
	function login(token: string, user: User) {
		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(user));
		setUser(user);
	}

	function logout() {
		localStorage.clear();
		setUser(null);
	}

	function getToken() {
		return localStorage.getItem("token");
	}

	useEffect(getLocalData, []);

	const values = new AuthContextObject(user, loading, login, logout, getToken);

	return <AuthContext value={values}>{children}</AuthContext>;
}
