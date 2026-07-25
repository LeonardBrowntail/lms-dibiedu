import UserCard from "../components/molecules/UserCard";
import PageLoading from "../components/PageLoading";
import useFetch from "../hooks/useFetch";
import type { APIUsersResponseType } from "../types/ApiResponseTypes";

export default function Users() {
	const { data, isLoading } = useFetch<APIUsersResponseType>("users");

	if (isLoading) return <PageLoading />;

	if (!data)
		return (
			<>
				<h2>No users available</h2>
			</>
		);

	return (
		<>
			<h2>Available users</h2>
			<div className="grid grid-cols-3">
				{data.map((user, index) => {
					return (
						<UserCard
							key={index}
							name={user.name}
							email={user.email}
							role={user.role}
						/>
					);
				})}
			</div>
		</>
	);
}
