import { useLocation, useNavigate } from "react-router-dom";
import routePaths from "../../routePaths";
import useAuth from "../../hooks/useAuth";

export default function AuthCard() {
	const navigate = useNavigate();
	const loc = useLocation();
	const { logout } = useAuth();

	function handleDashboardButton() {
		navigate(routePaths.dashboard);
	}

	return (
		<>
			<p>{loc.pathname}</p>
			<button className="button bg-button" onClick={handleDashboardButton}>
				Dashboard
			</button>
			<button className="button bg-button-red" onClick={logout}>
				Logout
			</button>
		</>
	);
}
