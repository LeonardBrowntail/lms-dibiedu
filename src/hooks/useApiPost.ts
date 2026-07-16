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
	validate: (form: FormType) => FormErrorType | null;
	onSuccess: (response: ExpectedResponseType) => unknown;
	onFail: () => unknown;
}) {
	const [form, setForm] = useState<FormType>(init);
	const [errors, setErrors] = useState<FormErrorType | null>(null);
	const [serverError, setServerError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	async function submit() {
		setServerError("");
		setErrors(validate(form));
		if (errors) return;

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
