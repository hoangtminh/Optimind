"use client";

import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
} from "react";

// Custom hooks
const useMousePosition = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const updateMousePosition = (e) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", updateMousePosition);
		return () =>
			window.removeEventListener("mousemove", updateMousePosition);
	}, []);

	return mousePosition;
};

const useIntersectionObserver = (options = {}) => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIsIntersecting(entry.isIntersecting),
			{ threshold: 0.1, ...options }
		);

		if (ref.current) observer.observe(ref.current);

		return () => observer.disconnect();
	}, [options]);

	return [ref, isIntersecting];
};

const useScrollPosition = () => {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const updateScrollY = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", updateScrollY);
		return () => window.removeEventListener("scroll", updateScrollY);
	}, []);

	return scrollY;
};

// Floating Shapes Component
const FloatingShapes = () => {
	const scrollY = useScrollPosition();

	const shapes = useMemo(
		() => [
			{
				id: 1,
				x: "15%",
				y: "25%",
				size: "w-64 h-64",
				gradient: "from-blue-400 to-cyan-400",
			},
			{
				id: 2,
				x: "75%",
				y: "65%",
				size: "w-80 h-80",
				gradient: "from-purple-400 to-blue-400",
			},
			{
				id: 3,
				x: "65%",
				y: "15%",
				size: "w-56 h-56",
				gradient: "from-cyan-400 to-blue-500",
			},
			{
				id: 4,
				x: "25%",
				y: "75%",
				size: "w-72 h-72",
				gradient: "from-blue-500 to-purple-500",
			},
			{
				id: 5,
				x: "85%",
				y: "35%",
				size: "w-48 h-48",
				gradient: "from-indigo-400 to-cyan-400",
			},
		],
		[]
	);

	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden">
			{shapes.map((shape, index) => (
				<div
					key={shape.id}
					className={`absolute ${shape.size} bg-gradient-to-r ${shape.gradient} blur-3xl animate-pulse opacity-20`}
					style={{
						left: shape.x,
						top: shape.y,
						transform: `translateY(${
							scrollY * (0.1 + index * 0.03)
						}px) rotate(${scrollY * 0.01 + index * 10}deg)`,
						animationDelay: `${index * 0.7}s`,
						animationDuration: `${4 + index * 0.5}s`,
					}}
				/>
			))}
		</div>
	);
};

// Glass Navigation Component
const GlassNavigation = () => {
	const [activeSection, setActiveSection] = useState("home");

	const navItems = [
		{ id: "home", label: "Home" },
		{ id: "features", label: "Features" },
		{ id: "analytics", label: "Analytics" },
		{ id: "pricing", label: "Pricing" },
		{ id: "contact", label: "Contact" },
	];

	const scrollToSection = (sectionId) => {
		document
			.getElementById(sectionId)
			?.scrollIntoView({ behavior: "smooth" });
		setActiveSection(sectionId);
	};

	return (
		<nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 backdrop-blur-lg bg-white/10 border border-white/20 rounded-full px-8 py-3">
			<div className="flex space-x-6">
				{navItems.map((item) => (
					<button
						key={item.id}
						onClick={() => scrollToSection(item.id)}
						className={`px-4 py-2 rounded-full transition-all duration-300 ${
							activeSection === item.id
								? "bg-blue-500 text-white shadow-lg"
								: "text-slate-700 hover:bg-white/20 hover:text-blue-600"
						}`}
					>
						{item.label}
					</button>
				))}
			</div>
		</nav>
	);
};

// Hero Section Component
const HeroSection = () => {
	const [ref, isIntersecting] = useIntersectionObserver();
	const [glitchText, setGlitchText] = useState("NEURAL LEARNING");
	const mousePosition = useMousePosition();

	useEffect(() => {
		if (!isIntersecting) return;

		const glitchInterval = setInterval(() => {
			const glitchChars = "!<>-_\\/[]{}—=+*^?#01010101";
			const originalText = "NEURAL LEARNING";
			let glitched = "";

			for (let i = 0; i < originalText.length; i++) {
				if (Math.random() < 0.1) {
					glitched +=
						glitchChars[
							Math.floor(Math.random() * glitchChars.length)
						];
				} else {
					glitched += originalText[i];
				}
			}

			setGlitchText(glitched);

			setTimeout(() => setGlitchText(originalText), 100);
		}, 3500);

		return () => clearInterval(glitchInterval);
	}, [isIntersecting]);

	const tiltX = (mousePosition.y - window.innerHeight / 2) / 50;
	const tiltY = -(mousePosition.x - window.innerWidth / 2) / 50;

	return (
		<section
			id="home"
			ref={ref}
			className="h-screen flex items-center justify-center relative overflow-hidden"
		>
			<div className="text-center z-10 max-w-6xl mx-auto px-6">
				<div
					className="transform transition-transform duration-300 ease-out perspective-1000"
					style={{
						transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
					}}
				>
					<h1
						className={`text-7xl lg:text-9xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent leading-tight transition-all duration-300 ${
							isIntersecting
								? "translate-y-0 opacity-100"
								: "translate-y-20 opacity-0"
						}`}
					>
						{glitchText}
					</h1>
					<h2
						className={`text-3xl lg:text-5xl text-slate-700 mb-8 font-light transition-all duration-500 delay-300 ${
							isIntersecting
								? "translate-y-0 opacity-100"
								: "translate-y-20 opacity-0"
						}`}
					>
						REVOLUTION
					</h2>
				</div>

				<p
					className={`text-xl lg:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto transition-all duration-700 delay-500 ${
						isIntersecting
							? "translate-y-0 opacity-100"
							: "translate-y-20 opacity-0"
					}`}
				>
					Harness quantum-powered AI to track, analyze, and optimize
					your learning journey with unprecedented precision and
					personalized insights.
				</p>

				<div
					className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-900 delay-700 ${
						isIntersecting
							? "translate-y-0 opacity-100"
							: "translate-y-20 opacity-0"
					}`}
				>
					<button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full text-lg shadow-2xl hover:scale-105 hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden">
						<span className="relative z-10">
							Unlock Your Potential
						</span>
						<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
					</button>

					<button className="px-8 py-4 backdrop-blur-lg bg-white/10 border border-white/30 text-slate-700 font-semibold rounded-full text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300">
						See Analytics Demo
					</button>
				</div>
			</div>

			{/* 3D Study Interface */}
			<div className="absolute right-20 top-1/2 transform -translate-y-1/2 hidden lg:block">
				<div
					className="w-80 h-96 backdrop-blur-lg bg-white/5 border border-white/20 rounded-3xl p-6 transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700"
					style={{
						transform: `perspective(1000px) rotateY(12deg) rotateX(${
							tiltX * 0.5
						}deg)`,
					}}
				>
					<div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
								<span className="text-sm text-slate-600 font-medium">
									98% Focus
								</span>
							</div>
							<div className="h-2 bg-slate-200 rounded-full overflow-hidden">
								<div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<div className="bg-white/50 rounded-lg p-3 text-center">
									<div className="text-lg font-bold text-blue-600">
										4.2h
									</div>
									<div className="text-xs text-slate-500">
										Today
									</div>
								</div>
								<div className="bg-white/50 rounded-lg p-3 text-center">
									<div className="text-lg font-bold text-purple-600">
										92%
									</div>
									<div className="text-xs text-slate-500">
										Retention
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

// Feature Card Component
const FeatureCard = ({
	icon,
	title,
	description,
	delay = 0,
	cardColor = "from-blue-500 to-cyan-500",
}) => {
	const [ref, isIntersecting] = useIntersectionObserver();
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			ref={ref}
			className={`backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer group relative overflow-hidden ${
				isIntersecting
					? "translate-y-0 opacity-100"
					: "translate-y-20 opacity-0"
			}`}
			style={{ transitionDelay: `${delay}ms` }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div
				className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${cardColor} transform origin-left transition-transform duration-300 ${
					isHovered ? "scale-x-100" : "scale-x-0"
				}`}
			></div>

			<div
				className={`text-4xl mb-6 transition-transform duration-300 ${
					isHovered ? "scale-110 rotate-12" : ""
				}`}
			>
				{icon}
			</div>
			<h3
				className={`text-2xl font-bold text-slate-800 mb-4 group-hover:bg-gradient-to-r group-hover:${cardColor} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}
			>
				{title}
			</h3>
			<p className="text-slate-600 leading-relaxed">{description}</p>
		</div>
	);
};

// Interactive Stats Component
const InteractiveStats = () => {
	const [ref, isIntersecting] = useIntersectionObserver();
	const [stats, setStats] = useState([
		{ label: "Students Empowered", value: 0, target: 1200000, suffix: "" },
		{
			label: "Study Sessions Analyzed",
			value: 0,
			target: 45000000,
			suffix: "",
		},
		{
			label: "Learning Efficiency Boost",
			value: 0,
			target: 87,
			suffix: "%",
		},
		{
			label: "Knowledge Retention Rate",
			value: 0,
			target: 94,
			suffix: "%",
		},
	]);

	useEffect(() => {
		if (!isIntersecting) return;

		stats.forEach((stat, index) => {
			const increment = stat.target / 120;
			const timer = setInterval(() => {
				setStats((prev) =>
					prev.map((s, i) =>
						i === index && s.value < s.target
							? {
									...s,
									value: Math.min(
										s.value + increment,
										s.target
									),
							  }
							: s
					)
				);
			}, 25);

			setTimeout(() => clearInterval(timer), 2500);
		});
	}, [isIntersecting]);

	return (
		<section id="analytics" className="py-32 px-6">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-20">
					<h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
						Quantum Analytics
					</h2>
					<p className="text-xl text-slate-600 max-w-3xl mx-auto">
						Real-time insights that transform how you learn and grow
					</p>
				</div>

				<div
					ref={ref}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
				>
					{stats.map((stat, index) => (
						<div
							key={index}
							className="text-center backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 transition-all duration-300"
						>
							<div className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">
								{stat.target > 1000000
									? `${(
											Math.floor(stat.value) / 1000000
									  ).toFixed(1)}M`
									: Math.floor(stat.value).toLocaleString()}
								{stat.suffix}
							</div>
							<div className="text-slate-600 font-medium text-lg">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

// Main App Component
const App = () => {
	const features = [
		{
			icon: "🧠",
			title: "Neural Learning Analytics",
			description:
				"Advanced AI algorithms analyze your learning patterns, identifying optimal study times, knowledge gaps, and personalized improvement strategies.",
			cardColor: "from-blue-500 to-cyan-500",
		},
		{
			icon: "⚡",
			title: "Quantum Memory Boost",
			description:
				"Revolutionary spaced repetition algorithms powered by quantum computing optimize your memory retention with 94% efficiency.",
			cardColor: "from-purple-500 to-blue-500",
		},
		{
			icon: "🎯",
			title: "Focus Flow Engine",
			description:
				"Intelligent focus tracking with biometric integration detects your peak concentration periods and adapts study sessions accordingly.",
			cardColor: "from-cyan-500 to-blue-500",
		},
		{
			icon: "📊",
			title: "Predictive Performance AI",
			description:
				"Machine learning models predict your exam performance and suggest targeted interventions weeks before test dates.",
			cardColor: "from-indigo-500 to-purple-500",
		},
		{
			icon: "🌟",
			title: "Adaptive Learning Paths",
			description:
				"Dynamic curriculum adjustment based on your progress, learning style, and career goals using advanced recommendation engines.",
			cardColor: "from-pink-500 to-cyan-500",
		},
		{
			icon: "🚀",
			title: "Real-time Optimization",
			description:
				"Instant feedback and micro-adjustments to your study approach using live performance data and environmental factors.",
			cardColor: "from-green-500 to-blue-500",
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-x-hidden">
			<FloatingShapes />
			<GlassNavigation />

			<HeroSection />

			{/* Features Section */}
			<section id="features" className="py-32 px-6 max-w-7xl mx-auto">
				<div className="text-center mb-20">
					<h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
						Unlock Your Mind
					</h2>
					<p className="text-xl text-slate-600 max-w-3xl mx-auto">
						Revolutionary features powered by cutting-edge learning
						science and AI technology
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
							cardColor={feature.cardColor}
							delay={index * 100}
						/>
					))}
				</div>
			</section>

			<InteractiveStats />

			{/* Pricing Section */}
			<section id="pricing" className="py-32 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
							Choose Your Path
						</h2>
						<p className="text-xl text-slate-600 max-w-2xl mx-auto">
							Select the perfect plan to accelerate your learning
							journey
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Student Plan */}
						<div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
							<div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6"></div>
							<h3 className="text-3xl font-bold text-slate-800 mb-4">
								Student
							</h3>
							<div className="text-5xl font-black text-blue-600 mb-6">
								$19
								<span className="text-xl text-slate-600">
									/mo
								</span>
							</div>
							<ul className="text-slate-700 space-y-3 mb-8">
								<li className="flex items-center">
									<span className="text-green-500 mr-2">
										✓
									</span>
									Basic learning analytics
								</li>
								<li className="flex items-center">
									<span className="text-green-500 mr-2">
										✓
									</span>
									Study session tracking
								</li>
								<li className="flex items-center">
									<span className="text-green-500 mr-2">
										✓
									</span>
									Progress reports
								</li>
								<li className="flex items-center">
									<span className="text-green-500 mr-2">
										✓
									</span>
									Mobile app access
								</li>
							</ul>
							<button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all duration-300">
								Start Learning
							</button>
						</div>

						{/* Scholar Plan */}
						<div className="backdrop-blur-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-300/30 rounded-3xl p-8 hover:scale-105 transition-all duration-300 relative">
							<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold">
								MOST POPULAR
							</div>
							<div className="w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6"></div>
							<h3 className="text-3xl font-bold text-slate-800 mb-4">
								Scholar
							</h3>
							<div className="text-5xl font-black text-purple-600 mb-6">
								$49
								<span className="text-xl text-slate-600">
									/mo
								</span>
							</div>
							<ul className="text-slate-700 space-y-3 mb-8">
								<li className="flex items-center">
									<span className="text-green-500 mr-2">
										✓
									</span>
									Advanced neural analytics
								</li>
								<li className="flex items-center">
									<span className="text-green-500 mr-2">
										✓
									</span>
									Predictive performance AI
								</li>
								<li className="flex items-center">
									<span className="text-green-500 mr-2">
										✓
									</span>
									Adaptive learning paths
								</li>
								<li className="flex items-center">
									<span className="text-green-500 mr-2">
										✓
									</span>
									Focus flow optimization
								</li>
								<li className="flex items-center">
									<span className="text-green-500 mr-2">
										✓
									</span>
									Priority support
								</li>
							</ul>
							<button className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300">
								Unlock Potential
							</button>
						</div>

						{/* Genius Plan */}
						<div className="backdrop-blur-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-300/30 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
							<div className="w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-6"></div>
							<h3 className="text-3xl font-bold text-slate-800 mb-4">
								Genius
							</h3>
							<div className="text-5xl font-black text-cyan-600 mb-6">
								$99
								<span className="text-xl text-slate-600">
									/mo
								</span>
							</div>
							<ul className="text-slate-700 space-y-3 mb-8">
								<li className="flex items-center">
									<span className="text-green-500 mr-2">
										✓
									</span>
									Quantum memory boost
								</li>
								<li className="flex items-center">
									<span className="text-green-500 mr-2">
										✓
									</span>
									Real-time optimization
								</li>
								<li className="flex items-center">
									<span className="text-green-500 mr-2">
										✓
									</span>
									Biometric integration
								</li>
								<li className="flex items-center">
									<span className="text-green-500 mr-2">
										✓
									</span>
									Personal AI tutor
								</li>
								<li className="flex items-center">
									<span className="text-green-500 mr-2">
										✓
									</span>
									API access
								</li>
							</ul>
							<button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300">
								Become Genius
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section id="contact" className="py-32 px-6 text-center">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-slate-800 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8">
						Ready to Evolve?
					</h2>
					<p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
						Join millions of learners who are already using the
						future of education technology
					</p>
					<button className="group relative px-12 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white font-bold rounded-full text-xl shadow-2xl hover:scale-110 transition-all duration-300 overflow-hidden">
						<span className="relative z-10">
							Begin Your Journey
						</span>
						<div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
					</button>
				</div>
			</section>
		</div>
	);
};

export default App;
