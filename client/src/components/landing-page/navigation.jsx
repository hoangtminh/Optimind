"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const GlassNavigation = () => {
	const [activeSection, setActiveSection] = useState("home");
	const router = useRouter();

	const navItems = [
		{ id: "home", label: "Home" },
		{ id: "features", label: "Features" },
		{ id: "courses", label: "Courses" },
		{ id: "pricing", label: "Pricing" },
	];

	return (
		<nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
			<div className="bg-white/40 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3">
				<ul className="flex space-x-6">
					{navItems.map((item) => (
						<li key={item.id}>
							<button
								onClick={() => {
									router.push(`/#${item.id}`);
									setActiveSection(item.id);
								}}
								className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
									activeSection === item.id
										? "bg-white/60 text-blue-900 font-semibold"
										: "text-blue-800 hover:text-blue-900 hover:bg-white/70"
								}`}
							>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default GlassNavigation;
