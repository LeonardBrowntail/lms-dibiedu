import { useState } from "react";
import apiRequest, { isFailedResponse } from "../api/client";

export default function useApiPost<
	FormType,
	FormErrorType,
	ExpectedResponseType,
>({
	target,
	init,
	validate,
	onSuccess,
	onFail,
}: {
	target: string;
	init: FormType;
	validate: (form: FormType) => FormErrorType;
	onSuccess: (response: ExpectedResponseType) => unknown;
	onFail: () => unknown;
}) {
	const [form, setForm] = useState<FormType>(init);
	const [errors, setErrors] = useState<FormErrorType>({} as FormErrorType);
	const [serverError, setServerError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	async function submit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		setServerError("");
		const validated = validate(form);
		setErrors(validated);
		console.warn(errors);
		if (validated) return;

		setSubmitting(true);
		try {
			const response = await apiRequest<ExpectedResponseType>(
				target,
				"POST",
				form,
			);
			if (response && response.data) {
				onSuccess(response.data);
			}
		} catch (error) {
			if (isFailedResponse(error)) {
				onFail();
				setServerError(error.message);
				console.error(error);
			}
		}
		setSubmitting(false);
	}

	return { form, errors, serverError, submitting, setForm, submit };
}
