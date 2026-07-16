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
	name: string | null;
	email: string | null;
	role: string | null;
	password: string | null;
	confirmPassword: string | null;
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
		const errors: RegisterFormError = {
			name: null,
			email: null,
			role: null,
			password: null,
			confirmPassword: null,
		};
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

		// check role
		if (!form.role) {
			errors.role = "Role wajib diisi";
		} else if (!Object.values(Roles).includes(form.role)) {
			errors.role = `Role tidak termasuk dalam list role yang diperbolehkan`;
		}

		// check password confirmation
		if (form.password !== form.confirmPassword) {
			errors.confirmPassword = "Konfirmasi password tidak cocok";
		}

		return Object.values(errors).every((error) => error === null)
			? errors
			: null;
	}

	function onSuccess() {
		nav(routePaths.login);
	}

	function onFail() {
		return;
	}

	return { target, init, validate, onSuccess, onFail };
}
