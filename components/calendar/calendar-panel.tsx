"use client";

import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Plus } from "lucide-react";
import AddTaskModal from "../tasks/add-tasks-modal";
import { useTask } from "@/hooks/useTask";

interface Props {
	date: Date | undefined;
	setDate: (d: Date | undefined) => void;
	tasksDays: Date[];
	onAddTask?: (columnId?: string) => void; // keep for compatibility with page
}

const CalendarPanel: FC<Props> = ({ date, setDate, tasksDays }) => {
	const { setIsModalOpen } = useTask();
	return (
		<div className="flex-[0.25] min-w-fit p-4 flex flex-col gap-4 overflow-y-auto scrollbar:bg-transparent">
			<Button
				className="bg-white text-black hover:bg-gray-200 w-full"
				onClick={() => setIsModalOpen(true)}
			>
				<Plus size={18} className="mr-2" /> Thêm công việc
			</Button>

			<div className="">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					modifiers={{ tasks: tasksDays }}
					modifiersClassNames={{
						tasks: "relative text-lg font-bold text-green-400 after:content-[''] after:absolute after:w-1.5 after:h-1.5 after:bg-green-400 after:rounded-full after:bottom-1 after:left-1/2 after:-translate-x-1/2",
						root: "bg-transparent",
						caption_label: "text-white font-semibold",
						nav_button_previous: "text-white/70 hover:bg-white/10",
						nav_button_next: "text-white/70 hover:bg-white/10",
						day: "text-white hover:bg-white/10 rounded-lg",
						day_selected:
							"bg-white/30 text-white hover:bg-white/40",
						day_today: "text-blue-400 border border-blue-400",
						head_cell: "text-white/70",
					}}
					className="bg-transparent"
				/>
			</div>

			<div className="mt-4">
				<h3 className="font-semibold mb-3">Tags</h3>
				<div className="flex flex-col gap-3">
					{/* placeholder tags - you can wire filters to state later */}
					<div className="flex items-center space-x-2">
						<input
							id="tag-all"
							type="checkbox"
							defaultChecked
							className="accent-white"
						/>
						<label htmlFor="tag-all" className="text-sm">
							Tất cả
						</label>
					</div>
					<div className="flex items-center space-x-2">
						<input
							id="tag-study"
							type="checkbox"
							className="accent-white"
						/>
						<label htmlFor="tag-study" className="text-sm">
							Học tập
						</label>
					</div>
				</div>
			</div>
			<AddTaskModal />
		</div>
	);
};
export default React.memo(CalendarPanel);
