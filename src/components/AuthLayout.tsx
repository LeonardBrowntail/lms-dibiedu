import background from "../assets/img/seamless.jpg";
export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const style = {
		"--seamless-bg": `url(${background})`,
	} as React.CSSProperties;
	return (
		<div
			style={style}
			className={`fixed bg-(image:--seamless-bg) bg-cover w-full h-full`}
		>
			<div className="bg-white fixed -translate-1/2 top-1/2 left-1/2 px-10 py-5 rounded-2xl shadow-2xl">
				{children}
			</div>
		</div>
	);
}
