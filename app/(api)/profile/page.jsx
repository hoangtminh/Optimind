// Tên file: app/profile/page.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Cần cho form
import { Label } from "@/components/ui/label"; // Cần cho form
import { Textarea } from "@/components/ui/textarea"; // Cần cho bio
import { Switch } from "@/components/ui/switch"; // Cần cho cài đặt chia sẻ
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	LayoutDashboard,
	CheckSquare,
	Users,
	Trophy,
	BarChart2,
	Settings,
	Bell,
	User, // Icon chính của trang
	Video,
	VideoOff,
	Music,
	Waves,
	Image as ImageIcon,
	X,
	Star,
	Pencil, // Icon chỉnh sửa
	Eye, // Icon chia sẻ
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

// --- Component phụ cho Cài đặt Chia sẻ ---
function SettingItem({ id, label, description }) {
	return (
		<div className="flex flex-row items-center justify-between rounded-lg p-4 bg-white/5">
			<div className="space-y-0.5">
				<Label htmlFor={id} className="text-base text-white">
					{label}
				</Label>
				<p className="text-sm text-gray-300">{description}</p>
			</div>
			<Switch id={id} defaultChecked />
		</div>
	);
}

export default function ProfilePage() {
	// === State quản lý giao diện (GIỮ NGUYÊN) ===
	const [backgroundUrl, setBackgroundUrl] = useState(
		"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop"
	);
	const [isCameraOn, setCameraOn] = useState(false);

	// === State cho Hồ sơ ===
	const [name, setName] = useState("Người dùng Optimind");
	const [bio, setBio] = useState(
		"Mình là sinh viên và đang cố gắng học tập mỗi ngày!"
	);

	// Hàm tiện ích (GIỮ NGUYÊN)
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
				{/* === 1. Sidebar bên trái (ĐÃ CẬP NHẬT ACTIVE) === */}
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
						<Star />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<Settings />
					</Button>
					{/* Nút Hồ sơ (Active) - Icon User trên Avatar góc phải */}
				</nav>

				{/* === 5. Thanh công cụ (Bên phải) (GIỮ NGUYÊN) === */}
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

				{/* === 6. Popup Camera (Góc trên phải) (GIỮ NGUYÊN) === */}
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

				{/* === 7. Avatar người dùng (Góc trên phải) (GIỮ NGUYÊN) === */}
				<div className="absolute top-6 right-6 flex items-center gap-3">
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<Bell />
					</Button>
					{/* THAY ĐỔI: Avatar này sẽ là nút active (có viền) */}
					<Avatar className="border-2 border-blue-400">
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt="@shadcn"
						/>
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
				</div>

				{/* === NỘI DUNG TRANG HỒ SƠ (THAY THẾ) === */}
				<section
					className={cn(
						"absolute w-[800px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6 flex flex-col gap-6",
						glassEffect
					)}
				>
					<h2 className="text-3xl font-bold">Hồ Sơ Của Bạn</h2>

					<Tabs defaultValue="profile" className="w-full">
						{/* Tabs List: Chọn Thông tin / Chia sẻ */}
						<TabsList className="grid w-full grid-cols-2 bg-white/10 text-white">
							<TabsTrigger value="profile">
								<User className="w-4 h-4 mr-2" />
								Thông tin cá nhân
							</TabsTrigger>
							<TabsTrigger value="sharing">
								<Eye className="w-4 h-4 mr-2" />
								Cài đặt chia sẻ
							</TabsTrigger>
						</TabsList>

						{/* Nội dung Tab 1: Chỉnh sửa Hồ sơ */}
						<TabsContent value="profile" className="mt-6">
							<div className="flex flex-col md:flex-row gap-8">
								{/* Cột trái: Avatar */}
								<div className="flex flex-col items-center gap-4">
									<div className="relative">
										<Avatar className="h-40 w-40 border-4 border-white/30">
											<AvatarImage
												src="https://github.com/shadcn.png"
												alt="@shadcn"
											/>
											<AvatarFallback className="text-5xl">
												U
											</AvatarFallback>
										</Avatar>
										<Button
											variant="outline"
											size="icon"
											className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-white/20 border-white/30 hover:bg-white/30"
										>
											<Pencil className="h-5 w-5" />
										</Button>
									</div>
									<Button
										variant="destructive"
										size="sm"
										className="bg-red-600/80 hover:bg-red-600"
									>
										Xóa Avatar
									</Button>
								</div>

								{/* Cột phải: Form thông tin */}
								<form className="flex-1 space-y-4">
									<div className="space-y-2">
										<Label
											htmlFor="name"
											className="text-gray-300"
										>
											Họ và Tên
										</Label>
										<Input
											id="name"
											value={name}
											onChange={(e) =>
												setName(e.target.value)
											}
											className="bg-white/10 border-white/20 placeholder:text-gray-400"
										/>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="email"
											className="text-gray-300"
										>
											Email
										</Label>
										<Input
											id="email"
											type="email"
											value="user@optimind.vn"
											readOnly
											className="bg-black/20 border-white/10 text-gray-400 cursor-not-allowed"
										/>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="bio"
											className="text-gray-300"
										>
											Giới thiệu
										</Label>
										<Textarea
											id="bio"
											value={bio}
											onChange={(e) =>
												setBio(e.target.value)
											}
											placeholder="Viết vài dòng về bạn..."
											className="bg-white/10 border-white/20 placeholder:text-gray-400"
											rows={4}
										/>
									</div>
									<Button className="mt-4 bg-blue-600 hover:bg-blue-700">
										Lưu thay đổi
									</Button>
								</form>
							</div>
						</TabsContent>

						{/* Nội dung Tab 2: Cài đặt Chia sẻ */}
						<TabsContent value="sharing" className="mt-6">
							<div className="flex flex-col gap-4">
								<SettingItem
									id="share-time"
									label="Hiển thị tổng thời gian học"
									description="Cho phép người khác xem tổng thời gian học của bạn trên BXH."
								/>
								<Separator className="bg-white/20" />
								<SettingItem
									id="share-focus"
									label="Hiển thị độ tập trung"
									description="Cho phép người khác xem điểm tập trung trung bình của bạn."
								/>
								<Separator className="bg-white/20" />
								<SettingItem
									id="share-pet"
									label="Chia sẻ kho thú cưng (Pet)"
									description="Bạn bè có thể vào xem và tương tác với pet của bạn."
								/>
								<Separator className="bg-white/20" />
								<SettingItem
									id="share-status"
									label="Hiển thị trạng thái online"
									description="Cho phép bạn bè thấy khi nào bạn đang online hoặc đang học."
								/>
							</div>
						</TabsContent>
					</Tabs>
				</section>
			</div>
		</main>
	);
}
