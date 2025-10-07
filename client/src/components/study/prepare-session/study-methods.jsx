"use client";

import { formatTime } from "@/lib/utils";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { useStudy } from "@/hooks/use-study-session";

const StudyMethod = () => {
	const {
		studyTime,
		setStudyTime,
		studyCycle,
		setStudyCycle,
		breakTime,
		setBreakTime,
		timeCount,
		activeTab,
		setActiveTab,
	} = useStudy();
	// Session state

	return (
		<div>
			<Label className="text-base font-medium mb-3 block">
				Phương pháp học
			</Label>
			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="w-full"
			>
				<TabsList className="grid  w-full grid-cols-3 bg-green-500">
					<TabsTrigger
						className={
							activeTab !== "countdown" && "text-white font-bold"
						}
						value="countdown"
						onClick={() => {
							setBreakTime(0);
							setStudyCycle(1);
						}}
					>
						Đếm ngược
					</TabsTrigger>
					<TabsTrigger
						className={
							activeTab !== "pomodoro" && "text-white font-bold"
						}
						value="pomodoro"
						onClick={() => {
							setBreakTime(5);
							setStudyCycle(3);
						}}
					>
						Pomodoro
					</TabsTrigger>
					<TabsTrigger
						className={
							activeTab !== "free" && "text-white font-bold"
						}
						value="free"
						onClick={() => {
							setBreakTime(0);
							setStudyCycle(1);
						}}
					>
						Free
					</TabsTrigger>
				</TabsList>
				<TabsContent value="countdown" className="mt-1">
					<div className="space-y-3 w-full">
						<div className="w-full flex flex-col justify-center items-center space-y-2">
							<Label
								htmlFor="countdown-time"
								className="text-base"
							>
								Thời gian (phút)
							</Label>
							<Input
								id="countdown-time"
								type="number"
								value={studyTime}
								onChange={(e) =>
									setStudyTime(
										Number.parseInt(e.target.value) || 1
									)
								}
								className="w-25 h-10 shadow-md border-green-300"
								min="1"
								max="180"
							/>
						</div>
						<div className="mt-4 text-center">
							<div className="text-6xl font-bold text-slate-700 mb-2">
								{formatTime(studyTime * 60)}
							</div>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="pomodoro" className="mt-1">
					<div className="space-y-3">
						<div className="grid grid-cols-3 gap-4">
							<div className="flex flex-col gap-2">
								<Label htmlFor="pomodoro-study">
									Học (phút)
								</Label>
								<Input
									id="pomodoro-study"
									type="number"
									value={studyTime}
									onChange={(e) =>
										setStudyTime(
											Number.parseInt(e.target.value) || 1
										)
									}
									className="w-full h-10 shadow-md border-green-300"
									min="1"
									max="60"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="pomodoro-break">
									Nghỉ (phút)
								</Label>
								<Input
									id="pomodoro-break"
									type="number"
									value={breakTime}
									onChange={(e) =>
										setBreakTime(
											Number.parseInt(e.target.value) || 5
										)
									}
									className="w-full h-10 shadow-md border-green-300"
									min="1"
									max="30"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="pomodoro-cycles">Chu kỳ</Label>
								<Input
									id="pomodoro-cycles"
									type="number"
									value={studyCycle}
									onChange={(e) =>
										setStudyCycle(
											Number.parseInt(e.target.value) || 4
										)
									}
									className="w-full h-10 shadow-md border-green-300"
									min="1"
									max="10"
								/>
							</div>
						</div>
						<div className="mt-4 text-center">
							<div className="text-6xl  font-bold text-slate-700 mb-2">
								{formatTime(studyTime * 60)}
							</div>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="free" className="mt-4">
					<div className="text-center mb-3">
						<div className="mt-4 text-center">
							<div className="text-6xl font-bold text-slate-700 mb-2">
								{formatTime(timeCount)}
							</div>
						</div>
						<p className="text-base text-slate-500">
							Bấm giờ tự do
						</p>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default StudyMethod;
