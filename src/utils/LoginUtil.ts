import type { LoginFormErrorType, LoginFormType } from "../types/LoginTypes";

export default class LoginForm {
	static create(email: string = "", password: string = "") {
		return {
			email,
			password,
		} as LoginFormType;
	}

	static validate(form: LoginFormType) {
		const errors: LoginFormErrorType = {
			email: null,
			password: null,
		};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		// check email
		if (!form.email.trim()) {
			errors.email = "Email wajib diisi";
		} else if (!emailRegex.test(form.email)) {
			errors.email = "Format email tidak valid";
		}

		// check password
		if (!form.password) {
			errors.password = "Password wajib diisi";
		}

		return Object.values(errors).every((error) => error === null)
			? errors
			: null;
	}

	static toJson(form: LoginFormType) {
		return {
			email: form.email,
			password: form.password,
		};
	}
}
