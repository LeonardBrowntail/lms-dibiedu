import { Link } from "react-router-dom";
import useRegisterSetup from "../hooks/useRegisterSetup";
import useApiPost from "../hooks/useApiPost";

export default function Register() {
	const { form, errors, serverError, submitting, setForm, submit } =
		useApiPost(useRegisterSetup());

	function handleInputChange(
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>,
	) {
		setForm({
			...form,
			[event.currentTarget.name]: event.currentTarget.value,
		});
	}

	return (
		<div className="form-page">
			<div className="flex">
				<h2>Daftar Akun</h2>

				{serverError && <div className="alert-error">{serverError}</div>}

				<form onSubmit={submit} noValidate>
					<div className="field">
						<label>Nama</label>
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={handleInputChange}
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
							onChange={handleInputChange}
							className={errors?.email ? "input-error" : ""}
						/>
						{errors?.email && (
							<small className="error-text">{errors.email}</small>
						)}
					</div>

					<div className="field">
						<label>Role</label>
						<select required name="role" onChange={handleInputChange}>
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
							onChange={handleInputChange}
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
							onChange={handleInputChange}
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
