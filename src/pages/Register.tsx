import { Link } from "react-router-dom";
import useRegisterSetup from "../hooks/useRegisterSetup";
import useApiPost from "../hooks/useApiPost";
import AuthLayout from "../components/AuthLayout";
import FormInput from "../components/atoms/FormInput";
import routePaths from "../routePaths";
import FormSelection from "../components/atoms/FormSelections";

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
		<AuthLayout>
			<div className="flex flex-col gap-5">
				<h2 className="text-center text-xl">Registration</h2>

				{serverError && <div className="alert-error">{serverError}</div>}

				<form className="flex flex-col gap-5" onSubmit={submit} noValidate>
					<FormInput
						type="text"
						label="Name"
						name="name"
						value={form.name}
						handleChange={handleInputChange}
						disabled={submitting}
						error={errors?.name}
					/>

					<FormInput
						type="email"
						label="Email"
						name="email"
						value={form.email}
						handleChange={handleInputChange}
						disabled={submitting}
						error={errors?.email}
					/>

					<FormInput
						type="password"
						label="Password"
						name="password"
						handleChange={handleInputChange}
						value={form.password}
						disabled={submitting}
						error={errors?.password}
					/>

					<FormInput
						type="password"
						name="confirmPassword"
						label="Confirm Password"
						handleChange={handleInputChange}
						value={form.confirmPassword}
						disabled={submitting}
						error={errors?.confirmPassword}
					/>

					<FormSelection error={errors?.role} onChange={handleInputChange} />

					<button
						type="submit"
						disabled={submitting}
						className={`button ${submitting ? "bg-gray-500" : "bg-button"}`}
					>
						{submitting ? "Submitting..." : "Register"}
					</button>
				</form>

				<p>
					Already have an account?{" "}
					<Link to={routePaths.login} className="text-button">
						Login
					</Link>
				</p>
			</div>
		</AuthLayout>
	);
}
