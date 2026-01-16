import { CalendarClock, CalendarDays, Clock } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { StudySession } from "@/lib/type/session-type";
import { Dispatch, SetStateAction } from "react";
import { Separator } from "../ui/separator";

interface HistoryListProps {
	sessions: StudySession[];
	selectedSession: StudySession | null;
	setSelectedSession: (session: StudySession) => void;
	filter: "day" | "week" | "month";
	setFilter: Dispatch<SetStateAction<"day" | "week" | "month">>;
}

const HistoryList = ({
	sessions,
	selectedSession,
	setSelectedSession,
	filter,
	setFilter,
}: HistoryListProps) => {
	const glassEffect =
		"bg-black/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

	return (
		<div
			className={cn(
				"h-full pt-4 pb-2 px-6 flex flex-col gap-4",
				glassEffect
			)}
		>
			{/* Header */}
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Lịch sử học tập</h1>
			</div>

			{/* Bộ lọc Tabs */}
			{/* <ToggleGroup
				type="single"
				defaultValue="day"
				value={filter}
				onValueChange={(value: "day" | "week" | "month") =>
					value && setFilter(value)
				}
				spacing={3}
				className="w-full justify-start"
			>
				<ToggleGroupItem
					value="day"
					className="ring-1 ring-white/60 rounded-md data-[state=on]:bg-white/30 hover:bg-white/10 text-white"
				>
					<CalendarDays size={16} className="mr-2" /> Ngày
				</ToggleGroupItem>
				<ToggleGroupItem
					value="week"
					className="ring-1 ring-white/60 data-[state=on]:bg-white/30 hover:bg-white/10 text-white"
				>
					<CalendarClock size={16} className="mr-2" /> Tuần
				</ToggleGroupItem>
				<ToggleGroupItem
					value="month"
					className="ring-1 ring-white/60 data-[state=on]:bg-white/30 hover:bg-white/10 text-white"
				>
					<CalendarClock size={16} className="mr-2" /> Tháng
				</ToggleGroupItem>
			</ToggleGroup>
			<Separator /> */}

			{/* Danh sách (scrollable) */}
			<ScrollArea className="flex-1 rounded-lg -mx-1 p-2 bg-black/30">
				<div className="space-y-2 p-1">
					{sessions &&
						sessions.map((session) => (
							<div
								key={session.id}
								onClick={() => setSelectedSession(session)}
								className={cn(
									"w-full text-left p-3 rounded-lg flex items-center gap-4 ring-1 ring-white/70 transition-colors",
									"hover:bg-white/20",
									selectedSession?.id === session.id &&
										"bg-white/20"
								)}
							>
								<div className="p-3 bg-black/20 rounded-md">
									<Clock size={20} />
								</div>
								<div className="flex-1 overflow-hidden min-w-0">
									<h3 className="text-lg font-bold truncate">
										{new Date(
											session.start_time
										).toLocaleDateString()}
									</h3>
									<p className="text-sm">
										{new Date(
											session.start_time
										).toLocaleTimeString()}
									</p>
								</div>
								<div className="text-right">
									<p className="font-semibold text-lg">
										{session.total_time} phút
									</p>
									<p className="text-xs text-green-400">
										{session.average_focus}% tập trung
									</p>
								</div>
							</div>
						))}
				</div>
			</ScrollArea>
		</div>
	);
};

export default HistoryList;
