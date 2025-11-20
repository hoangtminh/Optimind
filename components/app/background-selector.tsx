// Tên file: app/components/BackgroundSelector.tsx
"use client";

import React, { FC, useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Save } from "lucide-react";
import { cn } from "@/lib/utils";

// Danh sách ảnh nền có sẵn
const backgrounds = [
	"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop", // Núi và Hồ
	"https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=2070&auto=format&fit=crop", // Cafe và Sách
	"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop", // Bãi biển
	"https://i.pinimg.com/1200x/02/12/9c/02129c9f9ee35d9ddae567afd49d27b8.jpg", // Tàu hỏa
];

interface BackgroundSelectorProps {
	currentBackground: string;
	onChange: (url: string) => void;
	onClose: () => void;
}

const BackgroundSelector: FC<BackgroundSelectorProps> = ({
	currentBackground,
	onChange,
	onClose,
}) => {
	// State cục bộ lưu trữ ảnh người dùng đang chọn/thử
	const [selectedUrl, setSelectedUrl] = useState<string>(currentBackground);
	const [isFileLoading, setIsFileLoading] = useState<boolean>(false);

	const handleSelectImage = (url: string) => {
		setSelectedUrl(url);
	};

	// MÔ PHỎNG: Xử lý tải file lên
	const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setIsFileLoading(true);
			const tempUrl = URL.createObjectURL(file);

			setTimeout(() => {
				alert("Mô phỏng: Đã tải file, sử dụng URL tạm thời.");
				setSelectedUrl(tempUrl);
				setIsFileLoading(false);
			}, 1000);
		}
	};

	// MỚI: Xử lý Lưu cuối cùng
	const handleFinalSave = () => {
		onChange(selectedUrl); // Truyền URL đã chọn về parent
		onClose();
	};

	return (
		<DialogContent className="bg-black/70 backdrop-blur-md border-white/20 text-white sm:max-w-[700px]">
			<DialogHeader>
				<DialogTitle className="text-white text-2xl">
					Chọn Hình Nền
				</DialogTitle>
			</DialogHeader>
			<ScrollArea className="h-96 py-4">
				<div className="flex flex-col gap-6 pr-4">
					{/* Phần 1: Tải lên */}
					<h3 className="text-lg font-semibold border-b border-white/20 pb-2">
						Tải ảnh lên từ máy tính
					</h3>
					<div className="space-y-2">
						<Label htmlFor="file-upload">
							Chọn file ảnh (Mô phỏng)
						</Label>
						<Input
							id="file-upload"
							type="file"
							accept="image/*"
							onChange={handleFileUpload}
							className="bg-white/10 border-white/30 cursor-pointer"
							disabled={isFileLoading}
						/>
						{isFileLoading && (
							<p className="text-sm text-blue-300">Đang tải...</p>
						)}
					</div>

					<Separator className="bg-white/20" />

					{/* Phần 2: Hình nền có sẵn */}
					<h3 className="text-lg font-semibold border-b border-white/20 pb-2">
						Hình nền có sẵn
					</h3>
					<div className="grid grid-cols-3 gap-3">
						{backgrounds.map((url, index) => (
							<button
								key={index}
								onClick={() => handleSelectImage(url)}
								className={cn(
									"aspect-video overflow-hidden rounded-lg border-2 border-transparent hover:border-blue-400 transition-all",
									selectedUrl === url &&
										"border-blue-400 ring-2 ring-blue-400"
								)}
							>
								<img
									src={url}
									alt={`Background ${index + 1}`}
									className="w-full h-full object-cover"
								/>
							</button>
						))}
					</div>
				</div>
			</ScrollArea>
			<DialogFooter>
				{/* MỚI: Nút Lưu */}
				<Button
					onClick={handleFinalSave}
					className="bg-blue-600 hover:bg-blue-700"
				>
					<Save className="w-4 h-4 mr-2" /> Lưu
				</Button>
				<DialogClose asChild>
					<Button variant="ghost">Hủy</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	);
};

export default BackgroundSelector;
