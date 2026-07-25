import { useNavigate } from "react-router-dom";
import { Roles } from "../enums/Roles";
import routePaths from "../routePaths";

type RegisterFormType = {
	name: string;
	email: string;
	role: string;
	password: string;
	confirmPassword: string;
};

type RegisterFormError = {
	name?: string;
	email?: string;
	role?: string;
	password?: string;
	confirmPassword?: string;
};

export default function useRegisterSetup() {
	const nav = useNavigate();

	const target = "auth/register";
	const init: RegisterFormType = {
		name: "",
		email: "",
		role: "student",
		password: "",
		confirmPassword: "",
	};

	function validate(form: RegisterFormType) {
		const errors: RegisterFormError = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		// check name
		if (!form.name.trim()) {
			errors.name = "Name is required";
		}

		// check email
		if (!form.email.trim()) {
			errors.email = "Email is required";
		} else if (!emailRegex.test(form.email)) {
			errors.email = "Email format is invalid";
		}

		// check password
		if (!form.password) {
			errors.password = "Password is required";
		} else if (form.password.length < 6) {
			errors.password = "Password length must be at least 6 characters long";
		}

		// check password confirmation
		if (!form.confirmPassword) {
			errors.confirmPassword = "Password confirmation is required";
		}
		if (form.password !== form.confirmPassword) {
			errors.confirmPassword = "Password is not the same";
		}

		// check role
		if (!form.role) {
			errors.role = "Role wajib diisi";
		} else if (!Object.values(Roles).includes(form.role)) {
			errors.role = `Role is not within allowed assignable roles`;
		}

		return errors;
	}

	function onSuccess() {
		nav(routePaths.login);
	}

	function onFail() {
		return;
	}

	return { target, init, validate, onSuccess, onFail };
}
