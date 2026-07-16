export default function ReasonCard({
	icon,
	title,
	desc,
}: {
	icon: React.JSX.Element;
	title: string;
	desc: string;
}) {
	return (
		<>
			<div className="p-4 min-w-75 flex flex-col gap-3 rounded-lg border border-card-border hover:scale-[1.05] hover:shadow-lg">
				<div className="size-4">{icon}</div>
				<div className="flex flex-col gap-1">
					<p className="text-[16px] font-bold">{title}</p>
					<p className="text-[14px] text-secondary-text">{desc}</p>
				</div>
			</div>
		</>
	);
}
