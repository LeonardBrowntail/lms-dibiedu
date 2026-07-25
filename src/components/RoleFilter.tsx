import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import routePaths from "../routePaths";
import NotFound from "../pages/NotFound";

export default function RoleFilter({
	allowedRoles,
}: {
	allowedRoles: string[];
}) {
	const navigate = useNavigate();
	const { user } = useAuth();
	const userRole = user?.role;

	if (userRole && allowedRoles.includes(userRole)) {
		return <Outlet />;
	} else {
		navigate(routePaths.dashboard);
	}
	return <NotFound />;
}
