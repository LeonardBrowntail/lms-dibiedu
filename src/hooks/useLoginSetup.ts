import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import type { APILoginResponseType } from "../types/ApiResponseTypes";
import routePaths from "../routePaths";

type LoginFormType = {
	email: string;
	password: string;
};

type LoginFormErrorType = {
	email?: string;
	password?: string;
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
		const errors: LoginFormErrorType = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		// check email
		if (!form.email.trim()) {
			errors.email = "Email is required";
		} else if (!emailRegex.test(form.email)) {
			errors.email = "Email format is invalid";
		}

		// check password
		if (!form.password) {
			errors.password = "Password is required";
		}

		return errors;
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
