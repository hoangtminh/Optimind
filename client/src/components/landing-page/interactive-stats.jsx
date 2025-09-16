import { useIntersectionObserver } from "@/hooks/custom-hooks";
import { useEffect, useState } from "react";

const InteractiveStats = () => {
	const [statsRef, isVisible] = useIntersectionObserver({ threshold: 0.5 });
	const [counters, setCounters] = useState({
		students: 0,
		courses: 0,
		satisfaction: 0,
		improvement: 0,
	});

	const targetValues = {
		students: 50000,
		courses: 1200,
		satisfaction: 98,
		improvement: 340,
	};

	useEffect(() => {
		if (isVisible) {
			setCounters({
				students: 0,
				courses: 0,
				satisfaction: 0,
				improvement: 0,
			});

			Object.keys(targetValues).forEach((key) => {
				const target = targetValues[key];
				const duration = 2000;
				const steps = 60;
				const increment = target / steps;
				let current = 0;

				const timer = setInterval(() => {
					current += increment;
					if (current >= target) {
						current = target;
						clearInterval(timer);
					}
					setCounters((prev) => ({
						...prev,
						[key]: Math.floor(current),
					}));
				}, duration / steps);
			});
		}
	}, [isVisible]);

	const stats = [
		{
			key: "students",
			label: "Active Students",
			suffix: "+",
			color: "from-blue-500 to-purple-500",
		},
		{
			key: "courses",
			label: "Courses Available",
			suffix: "+",
			color: "from-purple-500 to-pink-500",
		},
		{
			key: "satisfaction",
			label: "Satisfaction Rate",
			suffix: "%",
			color: "from-pink-500 to-red-500",
		},
		{
			key: "improvement",
			label: "Average Improvement",
			suffix: "%",
			color: "from-cyan-500 to-blue-500",
		},
	];

	return (
		<section ref={statsRef} className="py-20 bg-white">
			<div className="max-w-6xl mx-auto px-4">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{stats.map((stat, index) => (
						<div key={stat.key} className="text-center">
							<div
								className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
							>
								{counters[stat.key].toLocaleString()}
								{stat.suffix}
							</div>
							<div className="text-blue-700 font-semibold">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default InteractiveStats;
