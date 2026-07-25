import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dibilogo from "../assets/icons/dibilogo.svg";
import NavbarButton from "./atoms/NavbarButton";
import NavbarModal from "./molecules/NavbarModal";
import useClickOutside from "../hooks/useClickOutside";

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
	const [showModal, setModal] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	useClickOutside(modalRef, onClickOutsideModal);

	function onClickOutsideModal() {
		if (showModal) setModal(false);
	}

	function onLogoClick() {
		return navigate("/");
	}

	function handleNavbarButton() {
		if (!showModal) return setModal(true);
	}

	if (hidden) return <></>;

	return (
		<header className="fixed top-0 w-full">
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
					<NavbarButton onClick={handleNavbarButton} />
				</div>
			</nav>
			{/* modal */}
			{showModal && (
				<div className="flex justify-end">
					<div
						ref={modalRef}
						className="flex flex-col gap-5 px-10 py-5 bg-header rounded-bl-2xl"
					>
						<NavbarModal />
					</div>
				</div>
			)}
		</header>
	);
}
