export default function UserCard({
	name,
	email,
	role,
}: {
	name: string;
	email: string;
	role: string;
}) {
	return (
		<div className="flex flex-col gap-2 px-3 py-2 border border-gray-300 rounded-2xl">
			<p className="font-semibold">{name}</p>
			<p>{email}</p>
			<p>Role: {role}</p>
		</div>
	);
}
