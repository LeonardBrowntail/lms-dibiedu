import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import type { APILoginResponseType } from "../types/ApiResponseTypes";
import routePaths from "../routePaths";

type LoginFormType = {
	email: string;
	password: string;
};

type LoginFormErrorType = {
	email: string | null;
	password: string | null;
};

export default function useLoginSetup() {
	const { login } = useAuth();
	const nav = useNavigate();

	const target = "auth/login";

	const init: LoginFormType = {
		email: "",
		password: "",
	};

	function validate(form: LoginFormType) {
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

	function onSuccess(response: APILoginResponseType) {
		login(response.token, response.user);
		nav(routePaths.dashboard);
	}

	function onFail() {
		return;
	}

	return { target, init, validate, onSuccess, onFail };
}
