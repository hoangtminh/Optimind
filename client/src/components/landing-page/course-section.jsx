"use client";

import { BookOpen, Brain, Star, Zap } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CoursesSection = () => {
	const courses = [
		{
			title: "AI-Powered Mathematics",
			description:
				"Master calculus, algebra, and statistics with personalized AI tutoring that adapts to your learning style.",
			icon: Brain,
			color: "from-blue-500 to-purple-500",
			students: "12.5k",
			rating: 4.9,
		},
		{
			title: "Quantum Physics Made Simple",
			description:
				"Dive into the fascinating world of quantum mechanics with interactive simulations and visual learning.",
			icon: Zap,
			color: "from-purple-500 to-pink-500",
			students: "8.2k",
			rating: 4.8,
		},
		{
			title: "Creative Writing Workshop",
			description:
				"Develop your storytelling skills with AI-assisted feedback and collaborative peer learning.",
			icon: BookOpen,
			color: "from-pink-500 to-red-500",
			students: "15.7k",
			rating: 4.9,
		},
		{
			title: "Data Science Fundamentals",
			description:
				"Learn Python, data analysis, and machine learning essentials with real-world datasets.",
			icon: Brain,
			color: "from-green-500 to-teal-500",
			students: "20.1k",
			rating: 4.7,
		},
		{
			title: "Startup & Innovation Bootcamp",
			description:
				"Turn your ideas into impactful products with guidance from experienced founders.",
			icon: Zap,
			color: "from-yellow-500 to-orange-500",
			students: "9.8k",
			rating: 4.8,
		},
	];

	return (
		<section
			id="courses"
			className="py-20 bg-gradient-to-b from-blue-50/50 to-purple-50/50"
		>
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
						Featured Courses
					</h2>
					<p className="text-xl text-blue-700 max-w-3xl mx-auto">
						Discover courses designed by experts and enhanced by AI
						to deliver the most effective learning experience.
					</p>
				</div>

				<Swiper
					modules={[Navigation, Pagination]}
					spaceBetween={30}
					slidesPerView={1}
					breakpoints={{
						640: { slidesPerView: 1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					navigation
					pagination={{ clickable: true }}
					className="py-12"
				>
					{courses.map((course, index) => (
						<SwiperSlide key={index}>
							<div className="group h-[90%]">
								<div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-500 h-full flex flex-col">
									<div
										className={`w-20 h-20 rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
									>
										<course.icon className="w-10 h-10 text-white" />
									</div>

									<h3 className="text-2xl font-bold text-blue-900 mb-4">
										{course.title}
									</h3>
									<p className="text-blue-700 mb-6 leading-relaxed flex-1">
										{course.description}
									</p>

									<div className="flex items-center justify-between mb-6">
										<div className="flex items-center space-x-1">
											<Star className="w-5 h-5 text-yellow-400 fill-current" />
											<span className="text-blue-800 font-semibold">
												{course.rating}
											</span>
										</div>
										<div className="text-blue-600 font-semibold">
											{course.students} students
										</div>
									</div>

									<button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
										Enroll Now
									</button>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default CoursesSection;
