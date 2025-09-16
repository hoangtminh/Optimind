import { useMemo } from "react";

const { useParallax } = require("@/hooks/custom-hooks");

const FloatingShapes = () => {
	const scrollY = useParallax();

	const shapes = useMemo(
		() => [
			{
				id: 1,
				x: "5%",
				y: "15%",
				size: "w-80 h-80",
				gradient: "from-pink-400 via-red-400 to-orange-400",
				speed: 0.8,
			},
			{
				id: 2,
				x: "85%",
				y: "25%",
				size: "w-96 h-96",
				gradient: "from-purple-400 via-blue-400 to-cyan-400",
				speed: 0.6,
			},
			{
				id: 3,
				x: "15%",
				y: "70%",
				size: "w-72 h-72",
				gradient: "from-green-400 via-emerald-400 to-teal-400",
				speed: 0.9,
			},
			{
				id: 4,
				x: "75%",
				y: "80%",
				size: "w-64 h-64",
				gradient: "from-yellow-400 via-orange-400 to-red-400",
				speed: 0.7,
			},
			{
				id: 5,
				x: "45%",
				y: "10%",
				size: "w-56 h-56",
				gradient: "from-indigo-400 via-purple-400 to-pink-400",
				speed: 1.0,
			},
			{
				id: 6,
				x: "65%",
				y: "45%",
				size: "w-88 h-88",
				gradient: "from-cyan-400 via-blue-400 to-indigo-400",
				speed: 0.5,
			},
			{
				id: 7,
				x: "25%",
				y: "35%",
				size: "w-60 h-60",
				gradient: "from-emerald-400 via-green-400 to-lime-400",
				speed: 0.8,
			},
			{
				id: 8,
				x: "90%",
				y: "60%",
				size: "w-52 h-52",
				gradient: "from-rose-400 via-pink-400 to-purple-400",
				speed: 0.9,
			},
		],
		[]
	);

	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden">
			{/* Animated Grid Background */}
			<div
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
          `,
					backgroundSize: "60px 60px",
					transform: `translate(${
						Math.sin(scrollY * 0.001) * 20
					}px, ${scrollY * 0.1}px) rotate(${scrollY * 0.01}deg)`,
				}}
			/>

			{shapes.map((shape, index) => (
				<div
					key={shape.id}
					className={`absolute ${shape.size} bg-gradient-to-r ${shape.gradient} blur-3xl animate-pulse opacity-40`}
					style={{
						left: shape.x,
						top: shape.y,
						transform: `translateY(${
							scrollY * shape.speed * 0.1
						}px) rotate(${scrollY * 0.02 + index * 20}deg) scale(${
							1 + Math.sin(scrollY * 0.005 + index) * 0.1
						})`,
						animationDelay: `${index * 0.8}s`,
						animationDuration: `${4 + index * 0.5}s`,
					}}
				/>
			))}
		</div>
	);
};

export default FloatingShapes;
