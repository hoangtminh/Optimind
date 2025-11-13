// Tên file: app/focus/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	LayoutDashboard,
	CheckSquare,
	Users,
	Trophy,
	BarChart2,
	Settings,
	Bell,
	User,
	Play,
	Pause,
	RotateCcw,
	Cog,
	ListTasks,
	Video,
	VideoOff,
	Music,
	Waves,
	Image as ImageIcon,
	Plus,
	Filter,
	X,
	ListTodo,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Cần có từ cài đặt shadcn

// Giả lập component biểu đồ
const PlaceholderChart = () => (
	<div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
		{/* Bạn có thể thay thế bằng Recharts hoặc Chart.js ở đây */}
		<BarChart2 size={48} className="opacity-30" />
	</div>
);

export default function FocusSessionPage() {
	// === State quản lý giao diện ===
	const [isTaskPanelOpen, setTaskPanelOpen] = useState(false);
	const [isCameraOn, setCameraOn] = useState(false);
	const [backgroundUrl, setBackgroundUrl] = useState(
		"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop" // Hình nền biển mặc định
	);

	// === State cho Pomodoro ===
	const [minutes, setMinutes] = useState(25);
	const [seconds, setSeconds] = useState(0);
	const [isRunning, setRunning] = useState(false);
	const [currentTask, setCurrentTask] = useState("Bài tập Lập trình Web");

	// Logic cơ bản cho Pomodoro
	useEffect(() => {
		let interval;
		if (isRunning) {
			interval = setInterval(() => {
				if (seconds > 0) {
					setSeconds(seconds - 1);
				} else if (minutes > 0) {
					setMinutes(minutes - 1);
					setSeconds(59);
				} else {
					// Hết giờ
					setRunning(false);
					// Thêm logic thông báo, chuyển phiên...
				}
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isRunning, minutes, seconds]);

	const toggleTimer = () => {
		setRunning(!isRunning);
	};

	const resetTimer = () => {
		setRunning(false);
		setMinutes(25);
		setSeconds(0);
	};

	// Hàm tiện ích cho giao diện kính mờ (glassmorphism)
	const glassEffect =
		"bg-black/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

	return (
		<main
			className="h-screen w-screen text-white p-6 transition-all duration-500"
			style={{
				backgroundImage: `url(${backgroundUrl})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="relative w-full h-full">
				{/* === 1. Sidebar bên trái === */}
				<nav
					className={cn(
						"absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-3",
						glassEffect
					)}
				>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<LayoutDashboard />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<CheckSquare />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<Users />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<Trophy />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<BarChart2 />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<Settings />
					</Button>
				</nav>

				{/* === 2. Pomodoro (Trung tâm) === */}
				<div
					className={cn(
						"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-8 flex flex-col items-center gap-4",
						glassEffect
					)}
				>
					{/* Nút cài đặt & task ở góc component */}
					<div className="absolute top-4 right-4 flex gap-2">
						<Button
							variant="ghost"
							size="icon"
							className="text-white/70 hover:text-white hover:bg-white/20"
							onClick={() => setTaskPanelOpen(!isTaskPanelOpen)}
						>
							<ListTodo size={20} />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-white/70 hover:text-white hover:bg-white/20"
						>
							<Cog size={20} />
						</Button>
					</div>

					<h1 className="text-9xl font-bold tracking-tighter">
						{String(minutes).padStart(2, "0")}:
						{String(seconds).padStart(2, "0")}
					</h1>
					<p className="text-xl opacity-80">{currentTask}</p>

					<div className="flex gap-4 mt-4">
						<Button
							size="lg"
							className="bg-white text-black hover:bg-gray-200 px-10 py-6 text-lg"
							onClick={toggleTimer}
						>
							{isRunning ? (
								<Pause className="mr-2" />
							) : (
								<Play className="mr-2" />
							)}
							{isRunning ? "Tạm dừng" : "Bắt đầu"}
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="bg-transparent hover:bg-white/20 hover:text-white border-white/50 px-8"
							onClick={resetTimer}
						>
							<RotateCcw />
						</Button>
					</div>
				</div>

				{/* === 3. Task Panel (Popup dưới trái) === */}
				<div
					className={cn(
						"absolute bottom-6 left-6 w-80 p-4",
						glassEffect,
						isTaskPanelOpen ? "block" : "hidden" // Toggle ẩn/hiện
					)}
				>
					<div className="flex justify-between items-center mb-4">
						<h3 className="font-bold text-lg">Task List</h3>
						<Button
							variant="ghost"
							size="icon"
							className="text-white/70 hover:text-white hover:bg-white/20 -mr-2"
							onClick={() => setTaskPanelOpen(false)}
						>
							<X size={20} />
						</Button>
					</div>
					<div className="flex gap-2 mb-4">
						<Button
							variant="secondary"
							className="flex-1 bg-white/30 hover:bg-white/40 text-white"
						>
							<Filter size={16} className="mr-2" /> Filter
						</Button>
						<Button
							variant="secondary"
							className="bg-white/30 hover:bg-white/40 text-white"
						>
							<Plus size={16} className="mr-2" /> Thêm Task
						</Button>
					</div>
					{/* Danh sách task (scrollable) */}
					<div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
						<div className="bg-white/10 p-3 rounded-md text-sm">
							Hoàn thành UI/UX Optimind
						</div>
						<div className="bg-white/10 p-3 rounded-md text-sm opacity-60">
							Ôn tập Hệ phân tán
						</div>
					</div>
				</div>

				{/* === 4. Biểu đồ độ tập trung (Dưới trung tâm) === */}
				<div
					className={cn(
						"absolute bottom-6 left-1/2 -translate-x-1/2 w-1/3 h-32 p-4",
						glassEffect
					)}
				>
					<h4 className="text-sm font-semibold opacity-80 mb-2">
						Biểu đồ độ tập trung
					</h4>
					<PlaceholderChart />
				</div>

				{/* === 5. Thanh công cụ (Bên phải) === */}
				<div
					className={cn(
						"absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-3",
						glassEffect
					)}
				>
					<Button
						variant="ghost"
						size="icon"
						className={cn(
							"hover:bg-white/20",
							isCameraOn ? "text-blue-300" : "text-white"
						)}
						onClick={() => setCameraOn(!isCameraOn)}
					>
						{isCameraOn ? <VideoOff /> : <Video />}
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<Music />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<Waves />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
						onClick={() => {
							// Ví dụ đổi hình nền
							const backgrounds = [
								"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop",
								"https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=2070&auto=format&fit=crop",
								"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
							];
							const newBg =
								backgrounds[
									Math.floor(
										Math.random() * backgrounds.length
									)
								];
							setBackgroundUrl(newBg);
						}}
					>
						<ImageIcon />
					</Button>
				</div>

				{/* === 6. Popup Camera (Góc trên phải) === */}
				{isCameraOn && (
					<div
						className={cn(
							"absolute top-6 right-20 w-64 h-48 rounded-lg overflow-hidden",
							glassEffect
						)}
					>
						<div className="absolute top-2 right-2 z-10">
							<Button
								variant="destructive"
								size="icon"
								className="h-7 w-7 bg-red-500/80 hover:bg-red-500"
								onClick={() => setCameraOn(false)}
							>
								<X size={16} />
							</Button>
						</div>
						{/* Giả lập Camera Feed */}
						<div className="w-full h-full bg-black/50 flex items-center justify-center">
							<User size={64} className="opacity-30" />
						</div>
					</div>
				)}

				{/* === 7. Avatar người dùng (Góc trên phải) === */}
				<div className="absolute top-6 right-6 flex items-center gap-3">
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<Bell />
					</Button>
					<Avatar>
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt="@shadcn"
						/>
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</main>
	);
}
