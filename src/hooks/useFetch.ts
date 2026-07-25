import { useEffect, useState } from "react";
import apiRequest from "../api/client";

export default function useFetch<ExpectedResponseType = unknown>(path: string) {
	const [data, setData] = useState<ExpectedResponseType>(
		{} as ExpectedResponseType,
	);
	const [isLoading, setLoading] = useState(false);

	function getData() {
		setLoading(true);
		apiRequest<ExpectedResponseType>(path, "GET")
			.then((response) => {
				if (response && response.data) {
					setData(response.data);
				} else {
					console.warn(`api path ${path} responded with no data attached`);
				}
			})
			.catch(console.error)
			.finally(() => {
				setLoading(false);
			});
	}

	useEffect(getData, []);

	return { data, isLoading };
}
