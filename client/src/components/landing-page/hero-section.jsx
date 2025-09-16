const { PlayCircle, ArrowRight } = require("lucide-react");
const { default: Link } = require("next/link");

const HeroSection = () => {
	return (
		<section className="h-screen bg-white/60 flex items-center justify-center relative overflow-hidden">
			<div className="text-center z-10 max-w-6xl mx-auto px-4">
				<h1 className="text-8xl md:text-9xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent transform perspective-1000 hover:scale-105 transition-all duration-500 cursor-pointer">
					EduFocus
				</h1>
				<p className="text-2xl md:text-3xl text-blue-800 mb-8 font-light">
					The Future of Intelligent Learning
				</p>
				<p className="text-lg md:text-xl text-blue-700 mb-12 max-w-3xl mx-auto leading-relaxed">
					Transform your study experience with AI-powered learning
					that adapts to your pace, predicts your needs, and
					accelerates your success in ways never before possible.
				</p>

				<div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
					<Link href="/auth/login">
						<button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center space-x-3">
							<span>Start Learning</span>
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</button>
					</Link>
					<Link href="/auth/register">
						<button className="group px-8 py-4 bg-blue-50/60 border-2 border-blue-400 text-blue-600 font-bold rounded-full hover:bg-blue-50 hover:scale-105 transition-all duration-300 flex items-center space-x-3">
							<span>Try out now</span>
							<PlayCircle className="w-5 h-5" />
						</button>
					</Link>
				</div>
			</div>

			<div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
				<div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
					<div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
