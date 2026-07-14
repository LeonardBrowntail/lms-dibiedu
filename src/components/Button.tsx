import type React from "react";

export default function Button({
	label: label = "",
	onClick,
}: {
	label: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		onclick(event);
	}

	return <button onClick={handleClick}>{label}</button>;
}
