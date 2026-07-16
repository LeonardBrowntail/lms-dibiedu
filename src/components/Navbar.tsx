import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import dibilogo from "../assets/icons/dibilogo.svg";
import LoginCard from "./LoginCard";

export default function Navbar({
	hidden,
	links,
	navLinks,
}: {
	hidden?: boolean | undefined;
	links?: { title: string; path: string }[] | undefined;
	navLinks?: { title: string; path: string }[] | undefined;
}) {
	const navigate = useNavigate();
	const { authenticated, logout } = useAuth();
	const [showLogin, setLogin] = useState(false);

	function onLogoClick() {
		return navigate("/");
	}

	function handleAuthButton() {
		if (authenticated) return logout();
		return setLogin(true);
	}

	if (hidden) return <></>;

	return (
		<header className="sticky top-0">
			<nav className="bg-header px-10 py-3 flex justify-between items-center">
				<div className="flex gap-2">
					<div
						className="flex gap-4 hover:cursor-pointer"
						onClick={onLogoClick}
					>
						<img src={dibilogo} alt="dibiedu logo" width={16} height={16} />
						<p className="font-bold text-lg">DebiEdu</p>
					</div>
					<div>
						{links?.map((link, index) => {
							return (
								<Link key={index} to={link.path}>
									{link.title}
								</Link>
							);
						})}
					</div>
				</div>
				<div className="flex gap-8 justify-between items-center text-sm">
					<ul className="hidden md:flex md:gap-8">
						{navLinks?.map((link, index) => {
							return (
								<a key={index} href={link.path}>
									{link.title}
								</a>
							);
						})}
					</ul>
					<button
						onClick={handleAuthButton}
						className={
							"button " + (authenticated ? "bg-button-red" : "bg-button")
						}
					>
						<p>{authenticated ? "Logout" : "Login"}</p>
					</button>
				</div>
			</nav>
			{/* login card container*/}
			{!authenticated && showLogin && (
				<div className="flex justify-end">
					<LoginCard />
				</div>
			)}
		</header>
	);
}
