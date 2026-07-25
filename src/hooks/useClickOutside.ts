import { useEffect } from "react";

export default function useClickOutside<T extends HTMLElement | null>(
	ref: React.RefObject<T>,
	onClickOutside: () => void,
) {
	useEffect(() => {
		function handleOutsideClick(event: MouseEvent) {
			const target = event.target as T;
			if (ref.current && !ref.current.contains(target)) {
				onClickOutside();
			}
		}
		document.addEventListener("mouseup", handleOutsideClick);
		return () => {
			document.removeEventListener("mouseup", handleOutsideClick);
		};
	});
}
