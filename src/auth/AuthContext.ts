import { createContext } from "react";
import type { User } from "../types/UserType";

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
