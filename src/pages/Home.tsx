import Navbar from "../components/Navbar";
import ReasonCard from "../components/ReasonCard";
import { FiBookOpen, FiFileText } from "react-icons/fi";
import { PiCertificate } from "react-icons/pi";
import img1 from "../assets/img/featured1.png";
import img2 from "../assets/img/featured2.png";
import img3 from "../assets/img/featured3.png";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
	const navbar = [
		{ title: "Home", path: "#" },
		{ title: "Why Us", path: "#why-us" },
		{ title: "Featured Courses", path: "#featured" },
	];

	const reasons = [
		{
			icon: <FiBookOpen height={24} width={24} />,
			title: "Online Material",
			desc: "Access a vast library of high-quality learning materials, including videos, articles, and interactive content.",
		},
		{
			icon: <FiFileText height={"24px"} width={"24px"} />,
			title: "Quizzes & Assignments",
			desc: "Test your knowledge and reinforce your learning with engaging quizzes and practical assignments.",
		},
		{
			icon: <PiCertificate />,
			title: "Certificates",
			desc: "Earn certificates upon completion of courses, showcasing your achievements and enhancing your credentials.",
		},
	];

	const featured = [
		{
			img: img1,
			title: "Web Development Fundamentals",
			desc: "Learn the basics of HTML, CSS, and JavaScript to build your first website.",
		},
		{
			img: img2,
			title: "Advanced JavaScript Techniques",
			desc: "Dive deep into JavaScript concepts like asynchronous programming, closures, and ES6 features.",
		},
		{
			img: img3,
			title: "Responsive Design Mastery",
			desc: "Master the art of creating websites that adapt to different screen sizes and devices.",
		},
	];

	return (
		<>
			<Navbar navLinks={navbar} />
			<div className="pt-16">
				<main className="p-4 text-whitish-text">
					<figure
						className={
							"bg-[linear-gradient(to_right,rgba(0,0,0,0.1),rgba(0,0,0,0.4)),var(--hero-img)] bg-no-repeat bg-cover bg-center rounded-lg px-5 py-27 flex flex-col items-center justify-center gap-5"
						}
					>
						<div className="flex flex-col text-center text-white gap-2">
							<h1 className="text-5xl/snug font-black tracking-tighter">
								Unlock Your Potential with EduLearn
							</h1>
							<p className="text-base">
								Embark on a journey of knowledge and skill development with our
								comprehensive online courses. Learn at your own pace, anytime,
								anywhere.
							</p>
						</div>
						<button className="bg-button button">Start Learning</button>
					</figure>
				</main>
				<section className="px-4 py-10 flex flex-col gap-10">
					<div>
						<h2
							id="why-us"
							className="font-black text-4xl/normal tracking-tight"
						>
							Why Choose EduLearn?
						</h2>
						<p>
							Our platform is designed to provide a seamless and effective
							learning experience, ensuring you gain the skills you need to
							succeed.
						</p>
					</div>
					<div className="flex gap-3 overflow-x-scroll md:grid md:grid-cols-3 md:overflow-visible">
						{reasons.map((reason, index) => {
							return (
								<ReasonCard
									key={index}
									icon={reason.icon}
									title={reason.title}
									desc={reason.desc}
								/>
							);
						})}
					</div>
				</section>
				<section className="p-4 w-full">
					<h2 id="featured" className="pt-5 pb-3 font-bold text-[22px]">
						Featured Courses
					</h2>
					<div className="flex gap-3 overflow-x-scroll md:grid md:grid-cols-3 md:overflow-visible">
						{featured.map((feature, index) => {
							return (
								<FeatureCard
									key={index}
									img={feature.img}
									title={feature.title}
									desc={feature.desc}
									alt=""
								/>
							);
						})}
					</div>
				</section>
				<div className="px-4 py-3 flex justify-center items-center">
					<button className="button bg-button">View All Courses</button>
				</div>
			</div>
			<footer className=""></footer>
		</>
	);
}
