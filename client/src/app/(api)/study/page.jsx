"use client";

import ProgressCard from "@/components/study/progress-card";
import StudyTracking from "@/components/study/study-tracking";
import PrepareTracking from "@/components/study/prepare-tracking";
import TodaySession from "@/components/study/today-session";
import DailyTasks from "@/components/goals/daily-tasks";
import TagManagement from "@/components/study/tag-subject-manage";
import { useStudy } from "@/hooks/use-study-session";
import LongtermTask from "@/components/goals/deadline-task";

export default function TrackingPage() {
	const { isSessionActive } = useStudy();

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
			<div>
				{/* Progress Section */}
				<ProgressCard />
			</div>
			{/* Session Setup Card */}
			{isSessionActive ? <StudyTracking /> : <PrepareTracking />}

			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
				{/* Left Column - Session Setup */}
				<div className="lg:col-span-3 space-y-6">
					<TodaySession />
					<LongtermTask />
				</div>

				{/* Right Column - Goals and Tag Management */}
				<div className="space-y-6 col-span-2">
					<DailyTasks />
					<TagManagement />
				</div>
			</div>
		</div>
	);
}
