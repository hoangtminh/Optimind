import { useIntersectionObserver } from "@/hooks/custom-hooks";
import { Award, BookOpen, Brain, TrendingUp, Users, Zap } from "lucide-react";
import React, { useState } from "react";

const FeatureCard = React.memo(
	({ icon: Icon, title, description, color, delay = 0 }) => {
		const [cardRef, isVisible] = useIntersectionObserver({
			threshold: 0.1,
		});
		const [isHovered, setIsHovered] = useState(false);

		return (
			<div
				ref={cardRef}
				className={`p-8 rounded-2xl bg-white/60 border-4 border-white/20 backdrop-blur-sm hover:scale-105 hover:rotate-1 hover:shadow-2xl transition-all duration-500 cursor-pointer ${
					isVisible
						? "opacity-100 translate-y-0"
						: "opacity-0 translate-y-8"
				}`}
				style={{
					background: `linear-gradient(135deg, ${color}20, ${color}10)`,
					transitionDelay: `${delay}ms`,
					transform: isHovered
						? "scale(1.05) rotateX(5deg) rotateY(5deg)"
						: "none",
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div
					className={`w-16 h-16 rounded-full bg-gradient-to-r ${color} flex items-center justify-center mb-6 transform transition-all duration-300 ${
						isHovered ? "scale-110 rotate-12" : ""
					}`}
				>
					<Icon className="w-8 h-8 text-white" />
				</div>
				<h3 className="text-2xl font-bold text-blue-900 mb-4">
					{title}
				</h3>
				<p className="text-blue-700 leading-relaxed">{description}</p>
			</div>
		);
	}
);

const FeaturesSection = () => {
	const features = [
		{
			icon: Brain,
			title: "AI-Powered Personalization",
			description:
				"Our advanced AI analyzes your learning patterns and adapts content delivery to maximize retention and understanding.",
			color: "from-blue-500 to-purple-500",
		},
		{
			icon: Users,
			title: "Collaborative Learning",
			description:
				"Connect with peers worldwide in virtual study rooms and group projects that enhance your learning experience.",
			color: "from-purple-500 to-pink-500",
		},
		{
			icon: Award,
			title: "Skill Certification",
			description:
				"Earn industry-recognized certificates and badges that showcase your expertise to employers and institutions.",
			color: "from-pink-500 to-red-500",
		},
		{
			icon: TrendingUp,
			title: "Progress Analytics",
			description:
				"Track your learning journey with detailed analytics and insights that help you optimize your study strategy.",
			color: "from-red-500 to-orange-500",
		},
		{
			icon: Zap,
			title: "Instant Feedback",
			description:
				"Get immediate feedback on assignments and quizzes with explanations that help you learn from mistakes.",
			color: "from-orange-500 to-yellow-500",
		},
		{
			icon: BookOpen,
			title: "Interactive Content",
			description:
				"Engage with dynamic content including simulations, virtual labs, and immersive learning experiences.",
			color: "from-yellow-500 to-green-500",
		},
	];

	return (
		<section
			id="features"
			className="py-20 bg-gradient-to-b from-purple-50/50 to-blue-50/50"
		>
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
						Revolutionary Features
					</h2>
					<p className="text-xl text-blue-700 max-w-3xl mx-auto">
						Experience the next generation of online learning with
						features designed to accelerate your success.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
							color={feature.color}
							delay={index * 100}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;
