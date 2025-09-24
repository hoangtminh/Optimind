"use client";

import React from "react";

import GlassNavigation from "@/components/landing-page/navigation";
import PricingSection from "@/components/landing-page/pricing";
import FloatingShapes from "@/components/landing-page/floating-shapes";
import FeaturesSection from "@/components/landing-page/feature-section";
import InteractiveStats from "@/components/landing-page/interactive-stats";
import CoursesSection from "@/components/landing-page/course-section";
import HeroSection from "@/components/landing-page/hero-section";
import React from "react";

import GlassNavigation from "@/components/landing-page/navigation";
import PricingSection from "@/components/landing-page/pricing";
import FloatingShapes from "@/components/landing-page/floating-shapes";
import FeaturesSection from "@/components/landing-page/feature-section";
import InteractiveStats from "@/components/landing-page/interactive-stats";
import CoursesSection from "@/components/landing-page/course-section";
import HeroSection from "@/components/landing-page/hero-section";

// Main App Component
const App = () => {
	return (
		<div className="min-h-screen bg-blue-200 overflow-x-hidden">
			<FloatingShapes />
			<GlassNavigation />

			<main>
				<HeroSection />
				<InteractiveStats />
				<FeaturesSection />
				<CoursesSection />
				<PricingSection />
			</main>

			<footer className="py-16 px-6 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
						<div>
							<h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
								EduFocus AI
							</h3>
							<p className="text-slate-300 leading-relaxed">
								Empowering learners worldwide with intelligent
								study solutions and personalized education
								technology.
							</p>
						</div>

						<div>
							<h4 className="text-lg font-semibold mb-4 text-blue-300">
								Features
							</h4>
							<ul className="space-y-2 text-slate-300">
								<li>AI Study Buddy</li>
								<li>Smart Scheduling</li>
								<li>Progress Tracking</li>
								<li>Study Groups</li>
							</ul>
						</div>

						<div>
							<h4 className="text-lg font-semibold mb-4 text-purple-300">
								Support
							</h4>
							<ul className="space-y-2 text-slate-300">
								<li>Help Center</li>
								<li>Live Chat</li>
								<li>Tutorials</li>
								<li>Community</li>
							</ul>
						</div>

						<div>
							<h4 className="text-lg font-semibold mb-4 text-cyan-300">
								Connect
							</h4>
							<ul className="space-y-2 text-slate-300">
								<li>Twitter</li>
								<li>Discord</li>
								<li>Instagram</li>
								<li>YouTube</li>
							</ul>
						</div>
					</div>

					<div className="border-t border-slate-700 pt-8 text-center">
						<p className="text-slate-400">
							© 2025 EduFocus AI. All rights reserved. Built with
							💜 for learners everywhere.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default App;
