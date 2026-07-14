import type { ReactNode } from "react";

export default function CardLayout({ children }: { children: ReactNode }) {
	return <div className="flex flex-col justify-center gap-2">{children}</div>;
}
