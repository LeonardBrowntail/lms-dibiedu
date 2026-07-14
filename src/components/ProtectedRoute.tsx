import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PageLoading from "./PageLoading";

export default function ProtectedRoute() {
	const navigate = useNavigate();
	const { authenticated, loading } = useAuth();

	if (loading) {
		return <PageLoading />;
	}

	if (!authenticated) navigate("login", { replace: true });

	return <Outlet />;
}
