// Tên file: app/history/page.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
	LayoutDashboard,
	CheckSquare,
	Users,
	Trophy,
	BarChart2,
	Settings,
	Bell,
	User,
	Video, // [CẬP NHẬT] Thêm icon
	Music,
	Waves,
	Image as ImageIcon,
	X,
	CalendarDays,
	CalendarClock,
	Clock,
	Brain,
	TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Dữ liệu giả (Mock Data) ---
const mockSessions = [
	{
		id: "1",
		title: "Ôn tập Hệ phân tán (Chương 3)",
		date: "04/11/2025 - 09:00",
		totalTime: 50,
		focusedTime: 45,
		avgFocus: 90,
		efficiency: 92,
	},
	{
		id: "2",
		title: "Làm dự án Optimind (UI/UX)",
		date: "03/11/2025 - 14:00",
		totalTime: 120,
		focusedTime: 90,
		avgFocus: 75,
		efficiency: 80,
	},
	{
		id: "3",
		title: "Thi đấu Pomodoro",
		date: "03/11/2025 - 10:00",
		totalTime: 25,
		focusedTime: 24,
		avgFocus: 96,
		efficiency: 98,
	},
];
// --- Kết thúc Mock Data ---

// --- Component con ---
const StatCard = ({ title, value, icon }) => (
	<div className="bg-black/20 p-4 rounded-lg flex items-center gap-3">
		<div className="p-2 bg-white/10 rounded-md">{icon}</div>
		<div>
			<Label className="text-xs text-white/70">{title}</Label>
			<p className="text-xl font-bold">{value}</p>
		</div>
	</div>
);

const PlaceholderChart = () => (
	<div className="w-full h-48 bg-black/20 rounded-lg flex items-center justify-center border border-white/10">
		<p className="text-white/40 text-sm">
			Biểu đồ độ tập trung (Line Chart)
		</p>
	</div>
);

// --- Component chính ---
export default function HistoryPage() {
	// === State quản lý giao diện ===
	const [backgroundUrl, setBackgroundUrl] = useState(
		"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"
	);

	// === State cho Trang ===
	const [filter, setFilter] = useState("day");
	const [selectedSession, setSelectedSession] = useState(null);

	// [CẬP NHẬT] Thêm state cho camera (từ trang study)
	const [isCameraOn, setCameraOn] = useState(false);

	// Hàm tiện ích
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
				{/* === 1. Sidebar bên trái (Giữ nguyên) === */}
				{/* [CẬP NHẬT] Thêm đầy đủ các nút */}
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
						className="text-white bg-white/20" // Active
					>
						<BarChart2 /> {/* Đánh dấu trang này là active */}
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<Settings />
					</Button>
				</nav>

				{/* === 2. Thanh công cụ (Bên phải) (Giữ nguyên) === */}
				{/* [CẬP NHẬT] Thêm đầy đủ các nút và logic */}
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
						<Video />
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

				{/* === 3. Avatar người dùng (Góc trên phải) (Giữ nguyên) === */}
				{/* [CẬP NHẬT] Thêm đầy đủ nút Bell */}
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

				{/* [CẬP NHẬT] Thêm popup camera (từ trang study) */}
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

				{/* === 4. Nội dung chính - Lịch sử học tập === */}
				{/* (Phần này giữ nguyên) */}
				<div
					className={cn(
						"absolute w-200 top-10 bottom-6 left-60 right-24", // Định vị giữa
						"flex divide-x divide-white/20", // Layout 2 cột
						glassEffect,
						"overflow-hidden"
					)}
				>
					{/* --- Cột 1: Danh sách Lịch sử --- */}
					<div className="flex-[0.5] p-4 flex flex-col gap-4">
						{/* Header */}
						<div className="flex justify-between items-center">
							<h1 className="text-2xl font-bold">
								Lịch sử học tập
							</h1>
						</div>

						{/* Bộ lọc Tabs */}
						<ToggleGroup
							type="single"
							defaultValue="day"
							value={filter}
							onValueChange={(value) => value && setFilter(value)}
							className="w-full justify-start"
						>
							<ToggleGroupItem
								value="day"
								className="data-[state=on]:bg-white/30 hover:bg-white/10 text-white"
							>
								<CalendarDays size={16} className="mr-2" /> Ngày
							</ToggleGroupItem>
							<ToggleGroupItem
								value="week"
								className="data-[state=on]:bg-white/30 hover:bg-white/10 text-white"
							>
								<CalendarClock size={16} className="mr-2" />{" "}
								Tuần
							</ToggleGroupItem>
							<ToggleGroupItem
								value="month"
								className="data-[state=on]:bg-white/30 hover:bg-white/10 text-white"
							>
								<CalendarClock size={16} className="mr-2" />{" "}
								Tháng
							</ToggleGroupItem>
						</ToggleGroup>

						{/* Danh sách (scrollable) */}
						<div className="flex-1 overflow-y-auto -mr-4 pr-3 space-y-2">
							{mockSessions.map((session) => (
								<button
									key={session.id}
									onClick={() => setSelectedSession(session)}
									className={cn(
										"w-full text-left p-3 rounded-lg flex items-center gap-4 transition-colors",
										"hover:bg-white/20",
										selectedSession?.id === session.id &&
											"bg-white/20"
									)}
								>
									<div className="p-3 bg-black/20 rounded-md">
										<Clock size={20} />
									</div>
									<div className="flex-1 overflow-hidden">
										<h4 className="font-semibold truncate">
											{session.title}
										</h4>
										<p className="text-xs text-white/70">
											{session.date}
										</p>
									</div>
									<div className="text-right">
										<p className="font-semibold text-lg">
											{session.totalTime} phút
										</p>
										<p className="text-xs text-green-400">
											{session.avgFocus}% tập trung
										</p>
									</div>
								</button>
							))}
						</div>
					</div>

					{/* --- Cột 2: Chi tiết Phiên học --- */}
					<div className="flex-[0.5] flex flex-col h-full">
						{selectedSession ? (
							<>
								{/* Header */}
								<div className="p-4 flex justify-between items-center border-b border-white/20">
									<h3 className="text-xl font-bold truncate">
										{selectedSession.title}
									</h3>
									<Button
										variant="ghost"
										size="icon"
										className="text-white/70 hover:text-white hover:bg-white/20"
										onClick={() => setSelectedSession(null)}
									>
										<X size={20} />
									</Button>
								</div>

								{/* Nội dung Info */}
								<div className="flex-1 p-4 overflow-y-auto space-y-4">
									<p className="text-sm text-white/80 border-b border-white/10 pb-4">
										Chi tiết phiên học ngày{" "}
										{selectedSession.date}
									</p>

									<div className="grid grid-cols-2 gap-3">
										<StatCard
											title="Tổng thời gian học"
											value={`${selectedSession.totalTime} phút`}
											icon={
												<Clock
													size={20}
													className="text-white/90"
												/>
											}
										/>
										<StatCard
											title="Thời gian tập trung"
											value={`${selectedSession.focusedTime} phút`}
											icon={
												<Brain
													size={20}
													className="text-green-400"
												/>
											}
										/>
										<StatCard
											title="Độ tập trung TB"
											value={`${selectedSession.avgFocus}%`}
											icon={
												<BarChart2
													size={20}
													className="text-blue-400"
												/>
											}
										/>
										<StatCard
											title="Hiệu suất"
											value={`${selectedSession.efficiency}%`}
											icon={
												<TrendingUp
													size={20}
													className="text-yellow-400"
												/>
											}
										/>
									</div>

									<div className="pt-4">
										<h4 className="font-semibold mb-2">
											Biểu đồ độ tập trung
										</h4>
										<PlaceholderChart />
									</div>
								</div>
							</>
						) : (
							<div className="h-full flex items-center justify-center text-white/50">
								<p>Chọn một phiên học để xem chi tiết</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
