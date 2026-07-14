import { Navigate } from "react-router-dom";
import { useState } from "react";
import type { LoginFormErrorType } from "../types/LoginTypes";
import apiRequest, { APIError } from "../api/client";
import LoginForm from "../utils/LoginUtil";
import routePaths from "../routePaths";

export default function LoginCard() {
	const [form, setForm] = useState(LoginForm.create());
	const [errors, setErrors] = useState<LoginFormErrorType | null>(null);
	const [serverError, setServerError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	}

	async function onSubmit(event: React.SubmitEvent) {
		event.preventDefault();

		// registration error handling
		setServerError("");
		setErrors(LoginForm.validate(form));
		if (errors) return;

		// fetch backend response
		setSubmitting(true);
		try {
			const response = await apiRequest(
				"/login",
				"POST",
				LoginForm.toJson(form),
			);
			if (response?.status) return <Navigate to={routePaths.dashboard} />;
		} catch (error) {
			if (error instanceof APIError) {
				setServerError(error.message);
				console.error(error.errors);
			}
		}

		setSubmitting(false);
	}

	return (
		<div className="form-card">
			<h2>Login</h2>

			{serverError && <div className="alert-error">{serverError}</div>}

			<form onSubmit={onSubmit} noValidate>
				<div className="field">
					<label>Email</label>
					<input
						type="email"
						name="email"
						disabled={submitting}
						value={form.email}
						onChange={onChange}
						placeholder="Email"
						className={errors?.email ? "input-error" : ""}
					/>
					{errors?.email && (
						<small className="error-text">{errors.email}</small>
					)}
				</div>

				<div className="field">
					<label>Password</label>
					<input
						type="password"
						name="password"
						disabled={submitting}
						value={form.password}
						onChange={onChange}
						placeholder="Password"
						className={errors?.password ? "input-error" : ""}
					/>
					{errors?.password && (
						<small className="error-text">{errors.password}</small>
					)}
				</div>

				<button type="submit" disabled={submitting} className="btn-primary">
					{submitting ? "Memproses..." : "Login"}
				</button>
			</form>
		</div>
	);
}
