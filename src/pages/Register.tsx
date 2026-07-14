import { useState } from "react";
import apiRequest, { APIError } from "../api/client";
import type { RegisterFormError } from "../types/RegisterTypes";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import RegisterForm from "../utils/RegisterUtil";

export default function Register() {
	// early redirect to dashboard if user is already logged in
	const navigate = useNavigate();
	const { authenticated: isLoggedIn } = useAuth();
	if (isLoggedIn) navigate("dashboard", { replace: true });

	// register states
	const [form, setForm] = useState(RegisterForm.create());
	const [errors, setErrors] = useState<RegisterFormError | null>(null);
	const [serverError, setServerError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	function onInputChange(
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	): void {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	}

	async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		// registration error handling
		setServerError("");
		setErrors(RegisterForm.validate(form));
		if (errors) return;

		// fetch backend response
		setSubmitting(true);
		try {
			const response = await apiRequest(
				"register",
				"POST",
				RegisterForm.toJson(form),
			);
			if (response?.status) navigate("login");
		} catch (error) {
			if (error instanceof APIError) {
				setServerError(error.message);
				console.error(error.errors);
			}
		}
		setSubmitting(false);
	}

	return (
		<div className="form-page">
			<div className="flex">
				<h2>Daftar Akun</h2>

				{serverError && <div className="alert-error">{serverError}</div>}

				<form onSubmit={onSubmit} noValidate>
					<div className="field">
						<label>Nama</label>
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={onInputChange}
							className={errors?.name ? "input-error" : ""}
						/>
						{errors?.name && (
							<small className="error-text">{errors.name}</small>
						)}
					</div>

					<div className="field">
						<label>Email</label>
						<input
							type="email"
							name="email"
							value={form.email}
							onChange={onInputChange}
							className={errors?.email ? "input-error" : ""}
						/>
						{errors?.email && (
							<small className="error-text">{errors.email}</small>
						)}
					</div>

					<div className="field">
						<label>Role</label>
						<select required name="role" onChange={onInputChange}>
							<option value="student">Student</option>
							<option value="instructor">Instructor</option>
						</select>

						{errors?.email && (
							<small className="error-text">{errors.email}</small>
						)}
					</div>

					<div className="field">
						<label>Password</label>
						<input
							type="password"
							name="password"
							value={form.password}
							onChange={onInputChange}
							className={errors?.password ? "input-error" : ""}
						/>
						{errors?.password && (
							<small className="error-text">{errors.password}</small>
						)}
					</div>

					<div className="field">
						<label>Konfirmasi Password</label>
						<input
							type="password"
							name="confirmPassword"
							value={form.confirmPassword}
							onChange={onInputChange}
							className={errors?.confirmPassword ? "input-error" : ""}
						/>
						{errors?.confirmPassword && (
							<small className="error-text">{errors.confirmPassword}</small>
						)}
					</div>

					<button type="submit" disabled={submitting} className="btn-primary">
						{submitting ? "Memproses..." : "Daftar"}
					</button>
				</form>

				<p className="form-footer">
					Sudah punya akun? <Link to="/login">Login di sini</Link>
				</p>
			</div>
		</div>
	);
}
