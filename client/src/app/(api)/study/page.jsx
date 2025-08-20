"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Plus,
	X,
	Clock,
	ChevronLeft,
	ChevronRight,
	Search,
	Edit2,
	Trash2,
	Check,
	ArrowUpDown,
	Book,
	History,
	GoalIcon,
	TagIcon,
} from "lucide-react";
import ProgressCard from "@/components/study/progress-card";
import { incompleteGoals, subjects, todaySessions } from "@/lib/study-data";
import StudyTracking from "@/components/study/study-tracking";
import PrepareTracking from "@/components/study/prepare-tracking";

export default function TrackingPage() {
	// Session state
	const [isRunning, setIsRunning] = useState(false);

	// Goals state
	const [currentGoalPage, setCurrentGoalPage] = useState(0);
	const [goalSortBy, setGoalSortBy] = useState("progress");

	// Tag management
	const [tagSearchTerm, setTagSearchTerm] = useState("");
	const [tagPage, setTagPage] = useState(0);
	const [editingTag, setEditingTag] = useState(null);
	const [newTagName, setNewTagName] = useState("");
	const [newTagColor, setNewTagColor] = useState("#6b7280");

	// Sample data
	const [availableTags, setAvailableTags] = useState([
		{ id: 1, name: "Ôn tập", color: "#6b7280" },
		{ id: 2, name: "Bài tập", color: "#6b7280" },
		{ id: 3, name: "Đọc sách", color: "#6b7280" },
		{ id: 4, name: "Nghiên cứu", color: "#6b7280" },
		{ id: 5, name: "Thực hành", color: "#6b7280" },
	]);

	const addTag = () => {
		if (newTagName.trim()) {
			const newTag = {
				id: Date.now(),
				name: newTagName,
				color: newTagColor,
			};
			setAvailableTags([...availableTags, newTag]);
			setNewTagName("");
			setNewTagColor("#6b7280");
		}
	};

	const updateTag = (id, name, color) => {
		setAvailableTags(
			availableTags.map((tag) =>
				tag.id === id ? { ...tag, name, color } : tag
			)
		);
		setEditingTag(null);
	};

	const deleteTag = (id) => {
		setAvailableTags(availableTags.filter((tag) => tag.id !== id));
	};

	const filteredTags = availableTags.filter((tag) =>
		tag.name.toLowerCase().includes(tagSearchTerm.toLowerCase())
	);

	const paginatedTags = filteredTags.slice(tagPage * 10, (tagPage + 1) * 10);

	const sortedGoals = [...incompleteGoals].sort((a, b) => {
		if (goalSortBy === "progress") {
			return a.progress - b.progress;
		} else {
			return new Date(a.deadline) - new Date(b.deadline);
		}
	});

	const paginatedGoals = sortedGoals.slice(
		currentGoalPage * 5,
		(currentGoalPage + 1) * 5
	);

	return (
		<div className="space-y-6">
			<div className="flex flex-col">
				<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Học tập
				</h1>
				<p className="text-muted-foreground">
					Hãy bắt đầu phiên học của bạn
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
				{/* Left Column - Session Setup */}
				<div className="lg:col-span-3 space-y-6">
					{/* Progress Section */}
					<ProgressCard />

					{/* Session Setup Card */}
					{isRunning ? <StudyTracking /> : <PrepareTracking />}

					{/* Today's Sessions */}
					<Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-200">
						<CardHeader>
							<CardTitle className="flex flex-row gap-2 items-center text-lg text-purple-600">
								<History className="w-5 h-5" />
								Phiên học hôm nay
							</CardTitle>
						</CardHeader>
						<CardContent>
							{todaySessions.length === 0 ? (
								<p className="text-slate-500 text-center py-4">
									Chưa có phiên học nào hôm nay
								</p>
							) : (
								<div className="space-y-3">
									{todaySessions.map((session) => (
										<div
											key={session.id}
											className="flex items-center justify-between px-3 py-2 bg-white rounded-lg"
										>
											<div className="flex items-center gap-3">
												<Clock className="h-4 w-4 text-slate-400" />
												<div>
													<div className="font-medium text-slate-700">
														{session.method} -{" "}
														{session.subject}
													</div>
													<div className="text-sm text-slate-500">
														{session.duration} •{" "}
														{session.completedAt}
													</div>
												</div>
											</div>
											<div className="flex gap-1">
												{session.tags.map((tag) => (
													<Badge
														key={tag}
														variant="secondary"
														className="text-xs"
													>
														{tag}
													</Badge>
												))}
											</div>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Right Column - Goals and Tag Management */}
				<div className="space-y-6 col-span-2">
					{/* Current Goals */}
					<Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
						<CardHeader className="pb-4">
							<div className="flex items-center justify-between">
								<CardTitle className="flex flex-row gap-1 items-center text-lg text-orange-700">
									<GoalIcon className="w-5 h-5" />
									Mục tiêu hiện tại
								</CardTitle>
								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="sm"
										onClick={() =>
											setGoalSortBy(
												goalSortBy === "progress"
													? "deadline"
													: "progress"
											)
										}
										className={"hover:bg-orange-200"}
									>
										<ArrowUpDown className="h-4 w-4" />
									</Button>
									<div className="flex gap-1">
										<Button
											variant="ghost"
											size="sm"
											onClick={() =>
												setCurrentGoalPage(
													Math.max(
														0,
														currentGoalPage - 1
													)
												)
											}
											disabled={currentGoalPage === 0}
											className={"hover:bg-orange-200"}
										>
											<ChevronLeft className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() =>
												setCurrentGoalPage(
													currentGoalPage + 1
												)
											}
											disabled={
												(currentGoalPage + 1) * 5 >=
												sortedGoals.length
											}
											className={"hover:bg-orange-200"}
										>
											<ChevronRight className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							{paginatedGoals.map((goal) => (
								<div key={goal.id} className="space-y-2">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<h4 className="text-sm font-medium text-slate-700 leading-tight">
												{goal.title}
											</h4>
											<p className="text-xs text-slate-500 mt-1">
												Hạn: {goal.deadline}
											</p>
										</div>
										<Badge
											variant={
												goal.priority === "high"
													? "destructive"
													: goal.priority === "medium"
													? "default"
													: "secondary"
											}
											className="text-xs"
										>
											{goal.priority === "high"
												? "Cao"
												: goal.priority === "medium"
												? "Trung bình"
												: "Thấp"}
										</Badge>
									</div>
									<div className="space-y-1">
										<div className="flex justify-between text-xs text-slate-500">
											<span>Tiến độ</span>
											<span>{goal.progress}%</span>
										</div>
										<Progress
											value={goal.progress}
											className="h-2"
										/>
									</div>
								</div>
							))}
						</CardContent>
					</Card>

					{/* Tag Management */}
					<Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200">
						<CardHeader>
							<CardTitle className="flex flex-row gap-2 items-center text-lg text-yellow-700">
								<TagIcon className="w-5 h-5" />
								Quản lý Tags
							</CardTitle>
							<div className="flex gap-2 mt-3">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 border-yellow-200" />
									<Input
										placeholder="Tìm kiếm tags..."
										value={tagSearchTerm}
										onChange={(e) =>
											setTagSearchTerm(e.target.value)
										}
										className="pl-10 border-yellow-200 shadow-md"
									/>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{/* Add New Tag */}
								<div className="flex gap-2">
									<Input
										placeholder="Tên tag mới..."
										value={newTagName}
										onChange={(e) =>
											setNewTagName(e.target.value)
										}
										className="flex-1 border-yellow-200 shadow-md"
									/>
									<input
										type="color"
										value={newTagColor}
										onChange={(e) =>
											setNewTagColor(e.target.value)
										}
										className="h-auto px-1 border border-slate-200 cursor-pointer"
									/>
									<Button
										onClick={addTag}
										size="sm"
										className={
											"h-auto bg-orange-400 hover:bg-orange-500 hover:cursor-pointer"
										}
									>
										<Plus className="h-4 w-4" />
									</Button>
								</div>

								{/* Tags Table */}
								<div className="border rounded-t-lg bg-yellow-300 border-yellow-300">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead className="w-8"></TableHead>
												<TableHead>Tên</TableHead>
												<TableHead className="w-20">
													Thao tác
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody className={"bg-yellow-100"}>
											{paginatedTags.map((tag) => (
												<TableRow
													key={tag.id}
													className={
														"hover:bg-yellow-200"
													}
												>
													<TableCell>
														<div
															className="w-4 h-4 rounded-full border border-slate-200"
															style={{
																backgroundColor:
																	tag.color,
															}}
														/>
													</TableCell>
													<TableCell>
														{editingTag ===
														tag.id ? (
															<Input
																value={
																	newTagName
																}
																onChange={(e) =>
																	setNewTagName(
																		e.target
																			.value
																	)
																}
																className="h-8"
																onBlur={() => {
																	updateTag(
																		tag.id,
																		newTagName,
																		newTagColor
																	);
																	setNewTagName(
																		""
																	);
																}}
																onKeyPress={(
																	e
																) => {
																	if (
																		e.key ===
																		"Enter"
																	) {
																		updateTag(
																			tag.id,
																			newTagName,
																			newTagColor
																		);
																		setNewTagName(
																			""
																		);
																	}
																}}
															/>
														) : (
															<span className="text-sm">
																{tag.name}
															</span>
														)}
													</TableCell>
													<TableCell>
														<div className="flex gap-1">
															<Button
																variant="ghost"
																size="sm"
																onClick={() => {
																	setEditingTag(
																		tag.id
																	);
																	setNewTagName(
																		tag.name
																	);
																	setNewTagColor(
																		tag.color
																	);
																}}
																className="h-8 w-8 p-0 hover:bg-yellow-300"
															>
																<Edit2 className="h-3 w-3" />
															</Button>
															<Button
																variant="ghost"
																size="sm"
																onClick={() =>
																	deleteTag(
																		tag.id
																	)
																}
																className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-yellow-300"
															>
																<Trash2 className="h-3 w-3" />
															</Button>
														</div>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>

								{/* Tag Pagination */}
								<div className="flex justify-between items-center">
									<span className="pl-1 text-sm text-slate-700">
										{tagPage * 10 + 1}-
										{Math.min(
											(tagPage + 1) * 10,
											filteredTags.length
										)}{" "}
										của {filteredTags.length}
									</span>
									<div className="flex gap-1">
										<Button
											variant="ghost"
											size="sm"
											onClick={() =>
												setTagPage(
													Math.max(0, tagPage - 1)
												)
											}
											disabled={tagPage === 0}
											className={
												"hover:cursor-pointer hover:bg-yellow-300"
											}
										>
											<ChevronLeft className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() =>
												setTagPage(tagPage + 1)
											}
											disabled={
												(tagPage + 1) * 10 >=
												filteredTags.length
											}
											className={
												"hover:cursor-pointer hover:bg-yellow-300"
											}
										>
											<ChevronRight className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
