import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
	const { user } = useAuth();
	const [course, setCourse] = useState();

	return (
		<div className="p-3 ">
			<div>
				<div className="">
					<h1>Welcome, {user?.name}</h1>
				</div>
				<div>
					<div>
						<p>Your courses</p>
						<div>{/* Show followed courses */}</div>
					</div>
				</div>
			</div>
			<div>
				<CourseContext />
			</div>
		</div>
	);
}
