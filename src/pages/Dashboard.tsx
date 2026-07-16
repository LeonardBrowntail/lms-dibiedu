import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
	const { user } = useAuth();
	const [course, setCourse] = useState();

	return <div className="p-3 "></div>;
}
