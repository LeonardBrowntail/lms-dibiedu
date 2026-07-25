import useAuth from "../../hooks/useAuth";
import LoginCard from "../LoginCard";
import AuthCard from "./AuthCard";

export default function NavbarModal() {
	const { authenticated } = useAuth();

	if (!authenticated) {
		return (
			<>
				<LoginCard />
			</>
		);
	} else {
		return (
			<>
				<AuthCard />
			</>
		);
	}
}
