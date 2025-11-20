// Tên file: app/components/ControlToolbar.tsx
"use client";

import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
// MỚI: Import Dialog components
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import {
	Video,
	VideoOff,
	Music,
	Waves,
	Upload, // MỚI
	Check, // MỚI
	Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCamera } from "@/hooks/useCamera";
import BackgroundSelector from "./background-selector";

// Hàm tiện ích
const glassEffect =
	"bg-black/30 backdrop-blur-md border border-white/20 rounded-lg shadow-lg";

// Danh sách ảnh nền
const backgrounds = [
	"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
	"https://i.pinimg.com/1200x/02/12/9c/02129c9f9ee35d9ddae567afd49d27b8.jpg",
];

// Định nghĩa Props
interface ControlToolbarProps {
	onChangeBackground: (url: string) => void;
	isUiVisible: boolean; // MỚI: Thêm prop
}

// MỚI: Định nghĩa kiểu cho một Nút
type ToolbarButtonType = {
	id: string;
	label: string;
	icon: React.ReactNode;
	className: string;
	onClick: () => void;
};

// MỚI: Component con cho Nút (để tái sử dụng Tooltip)
const ToolbarButton: FC<ToolbarButtonType> = ({
	label,
	icon,
	className,
	onClick,
}) => (
	<Tooltip>
		<TooltipTrigger asChild>
			<Button
				onClick={onClick}
				variant="ghost"
				size="icon"
				className={cn(
					"h-11 w-11 rounded-full hover:bg-white/20",
					className // Áp dụng class tùy chỉnh (vd: màu chữ)
				)}
			>
				{icon}
			</Button>
		</TooltipTrigger>
		<TooltipContent side="left">
			<p>{label}</p>
		</TooltipContent>
	</Tooltip>
);

// Component Toolbar Chính
const ControlToolbar: FC<ControlToolbarProps> = ({
	onChangeBackground,
	isUiVisible,
}) => {
	const { isCamActive, toggleCamera } = useCamera();
	const changeBackground = () => {
		const newBg =
			backgrounds[Math.floor(Math.random() * backgrounds.length)];
		onChangeBackground(newBg);
	};
	// MỚI: Hàm xử lý chọn ảnh từ selector
	const handleBackgroundChange = (url: string) => {
		onChangeBackground(url);
		setIsSelectorOpen(false); // Đóng dialog sau khi chọn
	};

	// MỚI: State cho Dialog
	const [isSelectorOpen, setIsSelectorOpen] = useState(false);

	// Lấy URL nền hiện tại để hiển thị trong Selector
	// NOTE: Giả định URL này được quản lý ở Layout và ControlToolbar không cần biết
	// Nhưng vì nó là state cần thiết cho selector, ta dùng một giá trị mặc định.
	const currentBg = backgrounds[0];
	// Tạo mảng dữ liệu cho các nút
	const toolbarButtons: ToolbarButtonType[] = [
		{
			id: "camera",
			label: isCamActive ? "Tắt Camera" : "Bật Camera",
			icon: isCamActive ? (
				<VideoOff className="h-6 w-6" />
			) : (
				<Video className="h-6 w-6" />
			),
			className: isCamActive ? "text-blue-300" : "text-white",
			onClick: () => toggleCamera(!isCamActive),
		},
		{
			id: "music",
			label: "Nghe nhạc",
			icon: <Music className="h-6 w-6" />,
			className: "text-white",
			onClick: () => console.log("Music clicked"), // Placeholder
		},
		{
			id: "waves",
			label: "Âm thanh nền",
			icon: <Waves className="h-6 w-6" />,
			className: "text-white",
			onClick: () => console.log("Waves clicked"), // Placeholder
		},
		{
			id: "background",
			label: "Đổi hình nền",
			icon: <ImageIcon className="h-6 w-6" />,
			className: "text-white",
			onClick: () => setIsSelectorOpen(true), // MỚI: Mở Dialog
		},
	];

	return (
		<TooltipProvider>
			<div
				className={cn(
					"absolute right-2 top-19 flex flex-col gap-2 p-2 z-30",
					glassEffect,
					// MỚI: Thêm hiệu ứng ẩn/hiện
					"transition-all duration-300 ease-in-out",
					isUiVisible
						? "opacity-100 translate-y-0"
						: "opacity-0 translate-y-full"
				)}
			>
				{/* MỚI: Dùng .map() để render các nút */}
				{toolbarButtons.map((button) => (
					<ToolbarButton
						key={button.id}
						id={button.id}
						label={button.label}
						icon={button.icon}
						className={button.className}
						onClick={button.onClick}
					/>
				))}
				{/* MỚI: Dialog cho Background Selector */}
				<Dialog open={isSelectorOpen} onOpenChange={setIsSelectorOpen}>
					<DialogTrigger asChild>
						{/* Nút trigger bị ẩn, chỉ mở bằng onClick bên trên */}
						<Button variant="ghost" className="hidden" />
					</DialogTrigger>
					<BackgroundSelector
						currentBackground={currentBg}
						onChange={handleBackgroundChange}
						onClose={() => setIsSelectorOpen(false)}
					/>
				</Dialog>
			</div>
		</TooltipProvider>
	);
};

export default ControlToolbar;
