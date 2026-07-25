import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
	const { user } = useAuth();

	return (
		<div className="flex flex-col">
			<Navbar />
			<div className="flex">
				<aside className="flex flex-col">
					<p>Welcome, {user ? user.name : "???"}</p>
					<div className="flex"></div>
				</aside>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
