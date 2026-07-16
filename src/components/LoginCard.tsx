import useApiPost from "../hooks/useApiPost";
import useLoginSetup from "../hooks/useLoginSetup";

export default function LoginCard() {
	const setup = useLoginSetup();
	const { form, errors, serverError, submitting, setForm, submit } =
		useApiPost(setup);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setForm({
			...form,
			[event.currentTarget.name]: event.currentTarget.value,
		});
	}

	return (
		<div className="form-card">
			<h2>Login</h2>

			{serverError && <div className="alert-error">{serverError}</div>}

			<form onSubmit={submit} noValidate>
				<div className="field">
					<label>Email</label>
					<input
						type="email"
						name="email"
						disabled={submitting}
						value={form.email}
						onChange={handleChange}
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
						onChange={handleChange}
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
