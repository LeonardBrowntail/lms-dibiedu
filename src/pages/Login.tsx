import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {
	// early redirect to dashboard if user is already logged in
	const navigate = useNavigate();
	const { authenticated: isLoggedIn } = useAuth();
	if (isLoggedIn) navigate("dashboard", { replace: true });

	return <div className="form-page"></div>;
}
