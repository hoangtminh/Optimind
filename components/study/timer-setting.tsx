import React, { Dispatch, SetStateAction } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";

type TimerSettingProps = {
	isSettingsOpen: boolean;
	setIsSettingsOpen: (bool: boolean) => void;
	tempSettings: {
		focus: number;
		break: number;
		longBreak: number;
		cycles: number;
		countdown: number;
		mode: "pomodoro" | "countdown";
	};
	setTempSettings: Dispatch<
		SetStateAction<{
			focus: number;
			break: number;
			longBreak: number;
			cycles: number;
			countdown: number;
			mode: "pomodoro" | "countdown";
		}>
	>;
	handleSaveSettings: () => void;
};

const TimerSetting = ({
	isSettingsOpen,
	setIsSettingsOpen,
	tempSettings,
	setTempSettings,
	handleSaveSettings,
}: TimerSettingProps) => {
	return (
		<Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
			<DialogContent className="bg-black/70 backdrop-blur-md border-white/20 text-white">
				<DialogHeader>
					<DialogTitle className="text-white text-2xl">
						Cài đặt
					</DialogTitle>
				</DialogHeader>
				{/* Tabs trong Dialog */}
				<Tabs
					value={tempSettings.mode}
					onValueChange={(v) =>
						setTempSettings((s) => ({
							...s,
							mode: v as "pomodoro" | "countdown",
						}))
					}
					className="w-full"
				>
					<TabsList className="grid w-full grid-cols-2 bg-white/30">
						<TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
						<TabsTrigger value="countdown">Đếm ngược</TabsTrigger>
					</TabsList>
					{/* Cài đặt Pomodoro */}
					<TabsContent value="pomodoro">
						<div className="grid grid-cols-2 gap-6 py-4">
							<div className="space-y-2">
								<Label htmlFor="focus-time">
									Tập trung (phút)
								</Label>
								<Input
									id="focus-time"
									type="number"
									min={5}
									value={tempSettings.focus}
									onChange={(e) =>
										setTempSettings((s) => ({
											...s,
											focus: Number(e.target.value),
										}))
									}
									className="bg-white/10 border-white/30"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="break-time">
									Nghỉ ngắn (phút)
								</Label>
								<Input
									id="break-time"
									type="number"
									min={1}
									value={tempSettings.break}
									onChange={(e) =>
										setTempSettings((s) => ({
											...s,
											break: Number(e.target.value),
										}))
									}
									className="bg-white/10 border-white/30"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="long-break-time">
									Nghỉ dài (phút)
								</Label>
								<Input
									id="long-break-time"
									type="number"
									min={5}
									value={tempSettings.longBreak}
									onChange={(e) =>
										setTempSettings((s) => ({
											...s,
											longBreak: Number(e.target.value),
										}))
									}
									className="bg-white/10 border-white/30"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="cycles">Số chu kỳ</Label>
								<Input
									id="cycles"
									type="number"
									min={1}
									max={8}
									value={tempSettings.cycles}
									onChange={(e) =>
										setTempSettings((s) => ({
											...s,
											cycles: Number(e.target.value),
										}))
									}
									className="bg-white/10 border-white/30"
								/>
							</div>
						</div>
					</TabsContent>
					{/* Cài đặt Countdown */}
					<TabsContent value="countdown">
						<div className="grid grid-cols-1 gap-6 py-4">
							<div className="space-y-2">
								<Label htmlFor="countdown-time">
									Thời gian (phút)
								</Label>
								<Input
									id="countdown-time"
									type="number"
									min={1}
									value={tempSettings.countdown}
									onChange={(e) =>
										setTempSettings((s) => ({
											...s,
											countdown: Number(e.target.value),
										}))
									}
									className="bg-white/10 border-white/30"
								/>
							</div>
						</div>
					</TabsContent>
				</Tabs>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="ghost">Hủy</Button>
					</DialogClose>
					<Button onClick={handleSaveSettings}>Lưu</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default TimerSetting;
