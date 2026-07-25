type FeatureCardAttributes = {
	img: string;
	alt?: string;
	title: string;
	desc: string;
};

export default function FeatureCard({
	img,
	alt,
	title,
	desc,
}: FeatureCardAttributes) {
	return (
		<figure className="min-w-75 pb-3 flex flex-col gap-3 md:min-w-0 hover:scale-105">
			<img src={img} alt={alt} className="h-42 object-cover rounded-lg" />
			<figcaption>
				<p className="font-bold">{title}</p>
				<p className="text-sm">{desc}</p>
			</figcaption>
		</figure>
	);
}
