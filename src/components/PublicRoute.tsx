import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute() {
	const navigate = useNavigate();
	const { authenticated } = useAuth();

	if (authenticated) navigate("/dashboard", { replace: true });

	return <Outlet />;
}
