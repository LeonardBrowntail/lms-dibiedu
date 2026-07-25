import useAuth from "../../hooks/useAuth";
import { RxHamburgerMenu } from "react-icons/rx";

export default function NavbarButton({ onClick }: { onClick: () => void }) {
	const { authenticated } = useAuth();
	return (
		<button
			className={`button ${authenticated ? "bg-button-red" : "bg-button"}`}
			onClick={onClick}
		>
			{authenticated ? <RxHamburgerMenu /> : "Login"}
		</button>
	);
}
