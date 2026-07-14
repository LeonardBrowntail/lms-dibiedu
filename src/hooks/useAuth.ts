import { createContext, useContext } from "react";
import { AuthContextObject } from "../types/AuthContextObject";
import type { User } from "./UserObject";

export const AuthContext = createContext<AuthContextObject | null>(null);

export class AuthContextObject {
	constructor(
		user: User | null = null,
		loading: boolean = false,
		login: (token: string, user: User) => void | null,
		logout: () => void | null,
		getToken: () => string | null,
	) {
		this.user = user;
		this.authenticated = user ? true : false;
		this.isInstructor = user?.role === "instructor";
		this.isAdmin = user?.role === "admin";
		this.loading = loading;
		this.login = login;
		this.logout = logout;
		this.getToken = getToken;
	}
	user;
	authenticated;
	loading;
	isInstructor;
	isAdmin;
	login;
	logout;
	getToken;
}

export default function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error(
			"useAuth must be used from within AuthProvider, make sure to have this element within AuthProvider",
		);
	}
	return context;
}
