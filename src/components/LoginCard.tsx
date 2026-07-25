import { Link } from "react-router-dom";
import useApiPost from "../hooks/useApiPost";
import useLoginSetup from "../hooks/useLoginSetup";
import FormInput from "./atoms/FormInput";
import routePaths from "../routePaths";

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
		<div className="flex flex-col gap-5">
			<h2 className="text-center text-xl">Login</h2>

			{serverError && (
				<div className="bg-red-500 px-3 py-0.5 rounded-2xl text-whitish-text">
					{serverError}
				</div>
			)}

			<form className="flex flex-col gap-5" onSubmit={submit} noValidate>
				<FormInput
					type="email"
					name="email"
					label="Email"
					handleChange={handleChange}
					value={form.email}
					disabled={submitting}
					error={errors?.email}
				/>
				<FormInput
					type="password"
					name="password"
					label="Password"
					handleChange={handleChange}
					value={form.password}
					disabled={submitting}
					error={errors?.password}
				/>

				<button
					type="submit"
					disabled={submitting}
					className={`button ${submitting ? "bg-gray-400" : "bg-button"}`}
				>
					{submitting ? "Submitting..." : "Login"}
				</button>
			</form>
			<p>
				Don't have an account?{" "}
				<Link to={routePaths.register} className="text-button">
					Sign Up
				</Link>
			</p>
		</div>
	);
}
