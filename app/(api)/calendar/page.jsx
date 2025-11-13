// Tên file: app/plan/page.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar"; // Component Lịch của shadcn
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	LayoutDashboard,
	CheckSquare,
	Users,
	Trophy,
	BarChart2,
	Settings,
	Bell,
	Video,
	Music,
	Waves,
	Image as ImageIcon,
	Plus,
	Search,
	Clock,
	Tag as TagIcon,
	X,
	Pencil,
	Trash2,
	Check,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Cần có từ cài đặt shadcn

// --- Dữ liệu giả (Mock Data) ---
// Giả lập ngày hôm nay
const today = new Date();
const todayString = today.toISOString().split("T")[0]; // "2025-11-02"

const mockTasks = [
	{
		id: "1",
		title: "Hoàn thành UI/UX Optimind",
		date: todayString,
		time: "09:00 - 11:00",
		tag: { name: "Project", color: "bg-blue-500" },
		description: "Thiết kế trang Kế hoạch học tập và trang Phòng học nhóm.",
		completed: false,
	},
	{
		id: "2",
		title: "Ôn tập Hệ phân tán",
		date: todayString,
		time: "14:00 - 15:30",
		tag: { name: "Học tập", color: "bg-green-500" },
		description: "Đọc chương 3 và 4 về Giao tiếp và Đồng bộ hóa.",
		completed: false,
	},
	{
		id: "3",
		title: "Họp nhóm dự án",
		date: todayString,
		time: "16:00 - 16:30",
		tag: { name: "Họp", color: "bg-yellow-500" },
		description: "Thảo luận tiến độ và phân chia công việc tuần mới.",
		completed: true,
	},
	{
		id: "4",
		title: "Code chức năng Login",
		date: "2025-11-03", // Ngày mai
		time: "10:00 - 12:00",
		tag: { name: "Project", color: "bg-blue-500" },
		description: "Tích hợp Firebase Auth cho trang Đăng nhập.",
		completed: false,
	},
];
// --- Kết thúc Mock Data ---

export default function StudyPlanPage() {
	// === State quản lý giao diện ===
	const [backgroundUrl, setBackgroundUrl] = useState(
		"https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=2070&auto=format=fit=crop" // Hình nền khác
	);

	// === State cho Lịch & Task ===
	const [date, setDate] = useState(undefined || today);
	const [selectedTask, setSelectedTask] = useState(
		mockTasks.find((t) => t.date === todayString) || null
	);

	// Lọc task dựa trên ngày được chọn
	const selectedDateString = date ? date.toISOString().split("T")[0] : "";
	const tasksForSelectedDay = mockTasks.filter(
		(task) => task.date === selectedDateString
	);

	// Hàm tiện ích cho giao diện kính mờ (glassmorphism)
	const glassEffect =
		"bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

	// Hàm định dạng ngày
	const formattedDate = date
		? new Intl.DateTimeFormat("vi-VN", { dateStyle: "full" }).format(date)
		: "Vui lòng chọn một ngày";

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
						<CheckSquare /> {/* Đánh dấu trang này là active */}
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

				{/* === 2. Thanh công cụ (Bên phải) (Giữ nguyên) === */}
				<div
					className={cn(
						"absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-3",
						glassEffect
					)}
				>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
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
					>
						<ImageIcon />
					</Button>
				</div>

				{/* === 3. Avatar người dùng (Góc trên phải) (Giữ nguyên) === */}
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

				{/* === 4. Nội dung chính - Quản lý Kế hoạch (Nội dung mới) === */}
				<div
					className={cn(
						"absolute top-20 bottom-6 left-24 right-24", // Định vị giữa các sidebar
						"flex divide-x divide-white/20", // Layout 3 cột
						glassEffect
					)}
				>
					{/* --- Cột 1: Lịch & Filter --- */}
					<div className="flex-[0.25] p-4 flex flex-col gap-4 overflow-y-auto">
						<Button className="bg-white text-black hover:bg-gray-200 w-full">
							<Plus size={18} className="mr-2" /> Thêm công việc
						</Button>
						<div className="mt-2">
							<h3 className="font-semibold mb-2">Lịch</h3>
							{/* Component Lịch từ shadcn */}
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								className={cn(
									"p-0 m-0", // Ghi đè style của shadcn
									"[&_button]:bg-transparent [&_button]:text-white",
									"[&_button:hover]:bg-white/201",
									"[&_button[aria-selected]]:bg-white/30 text-white",
									"[&_div[role=gridcell]]:p-01",
									"[&_div[role=row]]:space-x-2",
									"[&_button[role=gridcell]]:h-9 w-9",
									"[&_th]:text-white/70",
									"[&_caption_button]:bg-white/10"
								)}
							/>
						</div>
						<div className="mt-4">
							<h3 className="font-semibold mb-3">Tags</h3>
							<div className="flex flex-col gap-3">
								<div className="flex items-center space-x-2">
									<Checkbox
										id="tag-all"
										defaultChecked
										className="[&_svg]:text-white"
									/>
									<Label
										htmlFor="tag-all"
										className="text-sm"
									>
										Tất cả
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="tag-project"
										className="[&_svg]:text-white"
									/>
									<Label
										htmlFor="tag-project"
										className="text-sm"
									>
										Project (2)
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="tag-learn"
										className="[&_svg]:text-white"
									/>
									<Label
										htmlFor="tag-learn"
										className="text-sm"
									>
										Học tập (1)
									</Label>
								</div>
							</div>
						</div>
					</div>

					{/* --- Cột 2: Danh sách Công việc --- */}
					<div className="flex-[0.45] p-4 flex flex-col">
						{/* Thanh tìm kiếm */}
						<div className="relative mb-4">
							<Search
								className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
								size={18}
							/>
							<Input
								placeholder="Tìm kiếm công việc..."
								className="bg-white/10 border-none pl-10 focus-visible:ring-1 focus-visible:ring-white/80"
							/>
						</div>
						{/* Tiêu đề ngày */}
						<h2 className="text-xl font-bold mb-3 truncate">
							{formattedDate}
						</h2>
						{/* Danh sách task (scrollable) */}
						<div className="flex-1 overflow-y-auto -mr-4 pr-4 space-y-3">
							{tasksForSelectedDay.length > 0 ? (
								tasksForSelectedDay.map((task) => (
									<button
										key={task.id}
										onClick={() => setSelectedTask(task)}
										className={cn(
											"w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors",
											"hover:bg-white/20",
											selectedTask?.id === task.id &&
												"bg-white/20",
											task.completed && "opacity-50"
										)}
									>
										<Checkbox
											checked={task.completed}
											className="[&_svg]:text-white"
										/>
										<div className="flex-1">
											<p
												className={cn(
													"font-semibold",
													task.completed &&
														"line-through"
												)}
											>
												{task.title}
											</p>
											<span className="text-xs text-white/70">
												{task.time}
											</span>
										</div>
										<span
											className={cn(
												"text-xs font-medium px-2 py-0.5 rounded-full",
												task.tag.color,
												"bg-opacity-70"
											)}
										>
											{task.tag.name}
										</span>
									</button>
								))
							) : (
								<div className="h-full flex items-center justify-center text-white/50">
									<p>Không có công việc nào.</p>
								</div>
							)}
						</div>
					</div>

					{/* --- Cột 3: Chi tiết Công việc --- */}
					<div className="flex-[0.30] p-4 overflow-y-auto">
						<h2 className="text-xl font-bold mb-4 flex justify-between items-center">
							Chi tiết
							<Button
								variant="ghost"
								size="icon"
								className="text-white/70 hover:text-white hover:bg-white/20 -mr-2"
								onClick={() => setSelectedTask(null)}
							>
								<X size={20} />
							</Button>
						</h2>

						{selectedTask ? (
							<div className="space-y-5">
								<h3 className="text-2xl font-semibold">
									{selectedTask.title}
								</h3>

								<div className="flex items-center gap-2 text-white/80">
									<Clock size={16} />
									<span>
										{selectedTask.time} ({selectedTask.date}
										)
									</span>
								</div>

								<div className="flex items-center gap-2">
									<TagIcon
										size={16}
										className="text-white/80"
									/>
									<span
										className={cn(
											"text-sm font-medium px-3 py-1 rounded-full",
											selectedTask.tag.color,
											"bg-opacity-70"
										)}
									>
										{selectedTask.tag.name}
									</span>
								</div>

								<div>
									<h4 className="font-semibold mb-2">
										Mô tả
									</h4>
									<p className="text-sm text-white/90 bg-white/10 p-3 rounded-md">
										{selectedTask.description}
									</p>
								</div>

								{/* Các nút hành động */}
								<div className="flex gap-3 pt-4 border-t border-white/20">
									<Button className="flex-1 bg-green-600 hover:bg-green-700">
										<Check size={18} className="mr-2" />{" "}
										Hoàn thành
									</Button>
									<Button
										variant="outline"
										className="bg-transparent hover:bg-white/20 text-white"
									>
										<Pencil size={16} />
									</Button>
									<Button
										variant="destructive"
										className="bg-red-600/80 hover:bg-red-600"
									>
										<Trash2 size={16} />
									</Button>
								</div>
							</div>
						) : (
							<div className="h-full flex items-center justify-center text-white/50">
								<p>Chọn một công việc để xem chi tiết</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
