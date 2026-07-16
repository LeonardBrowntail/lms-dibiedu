import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

const apiClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

type SuccessResponseType<ResponseType> = {
	message: string;
	status: boolean;
	data: ResponseType | null;
	type: "success_response";
};

type ErrorResponseType = {
	message: string;
	status: boolean;
	errors: unknown;
	type: "error_response";
};

type APIMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export function isSuccessResponse<T>(
	response: unknown,
): response is SuccessResponseType<T> {
	return (response as SuccessResponseType<T>).type === "success_response";
}

export function isFailedResponse(
	response: unknown,
): response is ErrorResponseType {
	return (response as ErrorResponseType).type === "error_response";
}

/**
 * Generic api fetching hook
 * @param path api request destination
 * @param method GET | POST | PUT | PATCH | DELETE
 * @param body data to be sent
 * @returns
 */
export default async function apiRequest<T>(
	path: string,
	method: APIMethods = "GET",
	body: unknown | null = null,
) {
	try {
		const response = await apiClient.request<SuccessResponseType<T>>({
			url: path,
			method,
			data: body,
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError<ErrorResponseType>(error)) {
			if (error.response) {
				throw error.response.data;
			} else {
				throw {
					message: "Unknown problem has occured",
					status: false,
					errors: error.toJSON(),
				} as ErrorResponseType;
			}
		}
	}
}
