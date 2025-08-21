"use client";

import { StatisticCards } from "@/components/dashboard/statistic-card";
import AverageCards from "@/components/dashboard/average-card";

import DistributionChart from "@/components/dashboard/distribution-chart";
import UpcomingTasks from "@/components/dashboard/upcoming-tasks";
import UpcomingSchedules from "@/components/dashboard/upcoming-schedules";
import QuickActions from "@/components/dashboard/quick-actions";

export default function Dashboard() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Dashboard
				</h1>
				<p className="text-muted-foreground">
					Tổng quan về quá trình học tập của bạn
				</p>
			</div>

			{/* Stats Cards */}
			<StatisticCards />

			{/* Average Study Time Stats */}
			<AverageCards />

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Upcoming Goals */}
				<UpcomingTasks />

				{/* Upcoming Schedule */}
				<UpcomingSchedules />
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				{/* Subject Distribution Chart */}
				<DistributionChart />

				{/* Today's Activity */}
			</div>

			{/* Quick Actions */}
			<QuickActions />
		</div>
	);
}
