import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "./Button";
import dibilogo from "../icons/dibilogo.svg";
import LoginCard from "./LoginCard";

export default function Navbar() {
	const { authenticated, logout } = useAuth();
	const [showLogin, setLogin] = useState(false);

	function handleButton() {
		if (authenticated) return logout() as void;
		return setLogin(true);
	}

	const links = [
		{ title: "Home", path: "#" },
		{ title: "Courses", path: "#" },
		{ title: "About", path: "#" },
		{ title: "Contact", path: "#" },
	];

	return (
		<header>
			{/* header */}
			<div className="bg-header sticky top-0 px-10 py-3 flex justify-between items-center">
				<div className="flex gap-4">
					<img src={dibilogo} alt="dibiedu logo" width={16} height={16} />
					<p className="font-bold text-lg">DebiEdu</p>
				</div>
				<nav className="flex gap-8 justify-between items-center text-sm">
					<ul className="hidden md:flex md:gap-8">
						{links.map((link, index) => {
							return (
								<Link key={index} to={link.path}>
									{link.title}
								</Link>
							);
						})}
					</ul>
					<Button
						label={authenticated ? "Logout" : "Login"}
						onClick={handleButton}
					/>
				</nav>
			</div>
			{/* login card container*/}
			{!authenticated && showLogin && (
				<div className="flex justify-end">
					<LoginCard />
				</div>
			)}
		</header>
	);
}
