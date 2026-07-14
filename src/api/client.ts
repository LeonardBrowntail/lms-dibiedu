import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

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

export type APIResponse<ResponseType> = {
	message: string;
	status: boolean;
	data: ResponseType;
};

export type APIErrorType = {
	message: string;
	status: boolean;
	errors: unknown;
};

export class APIError extends Error {
	constructor(message: string, status: boolean, errors: unknown) {
		super(message);
		this.status = status;
		this.errors = errors;
	}
	status;
	errors;
}

/**
 * Generic API request function
 * @param path destination URL to send this request to
 * @param param1
 * @returns
 */
export default async function apiRequest<RequestType, ResponseType = null>(
	path: string,
	method = "GET",
	body: RequestType | null = null,
) {
	try {
		const response = await apiClient.request<APIResponse<ResponseType>>({
			url: path,
			method,
			data: body,
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError<APIErrorType>(error)) {
			const ed = error.response?.data;
			throw new APIError(
				ed?.message ?? "Something went wrong",
				ed?.status ?? false,
				ed?.errors,
			);
		}
	}
}
