// Tên file: app/settings/page.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Cần cho nút gạt
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Cần cho đổi mật khẩu
import {
	LayoutDashboard,
	CheckSquare,
	Users,
	Trophy,
	BarChart2,
	Settings, // Icon chính
	Bell,
	User,
	Video,
	VideoOff, // Icon tắt camera
	Music,
	Waves,
	Image as ImageIcon,
	X,
	Shield, // Icon cho bảo mật
	KeyRound, // Icon cho mật khẩu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Cần cho nội dung
import { Separator } from "@/components/ui/separator";

// Component Setting Item (để cho gọn)
function SettingItem({ id, label, description }) {
	return (
		<div className="flex flex-row items-center justify-between rounded-lg p-4">
			<div className="space-y-0.5">
				<Label htmlFor={id} className="text-base text-white">
					{label}
				</Label>
				<p className="text-sm text-gray-300">{description}</p>
			</div>
			<Switch id={id} />
		</div>
	);
}

export default function SettingsPage() {
	// === State quản lý giao diện (GIỮ NGUYÊN) ===
	const [backgroundUrl, setBackgroundUrl] = useState(
		"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop"
	);
	const [isCameraOn, setCameraOn] = useState(false);

	// === State cho Cài Đặt ===
	// (Không cần state phức tạp, chỉ cần state của form nếu cần)

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
				{/* === 1. Sidebar bên trái (GIỮ NGUYÊN) === */}
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
					{/* THAY ĐỔI: Đánh dấu active cho nút Settings */}
					<Button
						variant="secondary" // Đổi thành active
						size="icon"
						className="text-white bg-white/20 hover:bg-white/30" // Style active
					>
						<Settings />
					</Button>
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
					<Avatar>
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt="@shadcn"
						/>
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
				</div>

				{/* === NỘI DUNG TRANG CÀI ĐẶT (THAY THẾ) === */}
				<section
					className={cn(
						"absolute w-[700px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6 flex flex-col gap-4",
						glassEffect
					)}
				>
					<h2 className="text-3xl font-bold">Cài Đặt</h2>

					<Tabs defaultValue="notifications" className="w-full">
						{/* Tabs List: Chọn Thông báo / Bảo mật */}
						<TabsList className="grid w-full grid-cols-2 bg-white/10 text-white">
							<TabsTrigger value="notifications">
								<Bell className="w-4 h-4 mr-2" />
								Thông báo
							</TabsTrigger>
							<TabsTrigger value="security">
								<Shield className="w-4 h-4 mr-2" />
								Bảo mật
							</TabsTrigger>
						</TabsList>

						{/* Nội dung Tab 1: Thông báo */}
						<TabsContent value="notifications" className="mt-6">
							<div className="flex flex-col gap-4">
								<SettingItem
									id="noti-session"
									label="Thông báo phiên học"
									description="Nhắc nhở khi đến giờ học hoặc giờ nghỉ."
								/>
								<Separator className="bg-white/20" />
								<SettingItem
									id="noti-focus"
									label="Thông báo độ tập trung"
									description="Cảnh báo khi phát hiện độ tập trung thấp."
								/>
								<Separator className="bg-white/20" />
								<SettingItem
									id="noti-friend"
									label="Thông báo từ bạn bè"
									description="Nhận thông báo tin nhắn, lời mời kết bạn."
								/>
							</div>
						</TabsContent>

						{/* Nội dung Tab 2: Bảo mật (Đổi mật khẩu) */}
						<TabsContent value="security" className="mt-6">
							<div className="flex flex-col gap-6">
								<h3 className="text-xl font-semibold">
									Đổi mật khẩu
								</h3>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label
											htmlFor="old-pass"
											className="text-gray-300"
										>
											Mật khẩu cũ
										</Label>
										<Input
											id="old-pass"
											type="password"
											className="bg-white/10 border-white/20 placeholder:text-gray-400"
											placeholder="Nhập mật khẩu cũ của bạn"
										/>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="new-pass"
											className="text-gray-300"
										>
											Mật khẩu mới
										</Label>
										<Input
											id="new-pass"
											type="password"
											className="bg-white/10 border-white/20 placeholder:text-gray-400"
											placeholder="Nhập mật khẩu mới"
										/>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="confirm-pass"
											className="text-gray-300"
										>
											Xác nhận mật khẩu mới
										</Label>
										<Input
											id="confirm-pass"
											type="password"
											className="bg-white/10 border-white/20 placeholder:text-gray-400"
											placeholder="Nhập lại mật khẩu mới"
										/>
									</div>
								</div>
								<Button className="self-start bg-blue-600 hover:bg-blue-700">
									<KeyRound className="w-4 h-4 mr-2" />
									Lưu thay đổi
								</Button>
							</div>
						</TabsContent>
					</Tabs>
				</section>
			</div>
		</main>
	);
}
