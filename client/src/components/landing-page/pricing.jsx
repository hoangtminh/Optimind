const PricingSection = () => {
	const plans = [
		{
			name: "Beginner",
			price: "0",
			period: "month",
			description: "Perfect for student starting their works",
			features: [
				"Free to use",
				"Limited course and tools",
				"Basic AI tutoring",
				"Limited tracking time",
			],
			color: "from-green-500 to-blue-500",
			popular: false,
		},
		{
			name: "Explorer",
			price: "29",
			period: "month",
			description:
				"Perfect for individual learners starting their journey",
			features: [
				"Access to 50+ courses",
				"Basic AI tutoring",
				"Unlimited Tracking Time",
				"Mobile app access",
			],
			color: "from-blue-500 to-purple-500",
			popular: false,
		},
		{
			name: "Scholar",
			price: "79",
			period: "month",
			description: "Ideal for serious students and professionals",
			features: [
				"Unlimited course access",
				"Advanced AI mentoring",
				"Peer collaboration",
				"Certificate programs",
				"1-on-1 sessions",
			],
			color: "from-purple-500 to-pink-500",
			popular: true,
		},
		{
			name: "Institution",
			price: "199",
			period: "month",
			description: "Comprehensive solution for educational institutions",
			features: [
				"Multi-user management",
				"Custom course creation",
				"Analytics dashboard",
				"Priority support",
				"Integration tools",
			],
			color: "from-pink-500 to-red-500",
			popular: false,
		},
	];

	return (
		<section
			id="pricing"
			className="py-10 bg-gradient-to-b from-blue-50/50 to-white"
		>
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
						Choose Your Path
					</h2>
					<p className="text-xl text-blue-700 max-w-3xl mx-auto">
						Select the perfect plan to accelerate your learning
						journey with cutting-edge AI technology.
					</p>
				</div>

				<div className="grid md:grid-cols-4 gap-6">
					{plans.map((plan, index) => (
						<div
							key={index}
							className={`relative p-8 rounded-3xl border-2 hover:scale-105 transition-all duration-500 ${
								plan.popular
									? "border-purple-400 bg-gradient-to-b from-purple-50/50 to-white shadow-2xl scale-105"
									: "border-blue-200 bg-white/60 backdrop-blur-sm hover:shadow-xl"
							}`}
						>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold text-sm">
									Most Popular
								</div>
							)}

							<div className="text-center mb-4">
								<h3 className="text-2xl font-bold text-blue-900 mb-2">
									{plan.name}
								</h3>
								<div
									className={`text-6xl font-black bg-gradient-to-r ${plan.color} bg-clip-text text-transparent mb-2`}
								>
									${plan.price}
								</div>
								<div className="text-blue-600">
									per {plan.period}
								</div>
								<p className="text-blue-700 mt-4">
									{plan.description}
								</p>
							</div>

							<ul className="space-y-4 mb-4">
								{plan.features.map((feature, featureIndex) => (
									<li
										key={featureIndex}
										className="flex items-center space-x-3"
									>
										<div
											className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}
										>
											<svg
												className="w-3 h-3 text-white"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<span className="text-blue-700">
											{feature}
										</span>
									</li>
								))}
							</ul>

							<button
								className={`w-full py-4 font-bold rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 ${
									plan.popular
										? `bg-gradient-to-r ${plan.color} text-white`
										: `border-2 border-blue-400 text-blue-600 hover:bg-blue-50`
								}`}
							>
								Get Started
							</button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default PricingSection;
