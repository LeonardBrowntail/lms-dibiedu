import { Roles } from "../enums/Roles";
import type {
	RegisterFormType,
	RegisterFormError,
} from "../types/RegisterTypes";

export default class RegisterForm {
	static create(
		name: string = "",
		email: string = "",
		role: string = "student",
		password: string = "",
		confirmPassword: string = "",
	) {
		return {
			name,
			email,
			role,
			password,
			confirmPassword,
		} as RegisterFormType;
	}

	static validate(form: RegisterFormType) {
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
			errors.name = "Nama wajib diisi";
		}

		// check email
		if (!form.email.trim()) {
			errors.email = "Email wajib diisi";
		} else if (!emailRegex.test(form.email)) {
			errors.email = "Format email tidak valid";
		}

		// check password
		if (!form.password) {
			errors.password = "Password wajib diisi";
		} else if (form.password.length < 6) {
			errors.password = "Password minimal 6 karakter";
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

	static toJson(form: RegisterFormType) {
		return {
			name: form.name,
			email: form.email,
			role: form.role,
			password: form.password,
			confirm_password: form.confirmPassword,
		};
	}
}
