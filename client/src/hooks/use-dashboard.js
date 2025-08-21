"use client";

import { monthData, weekData } from "@/data/dashboard-data";

const { createContext, useState } = require("react");

const DashboardContext = createContext();

export function useDashboard() {
	return useContext(DashboardContext);
}

export function DashboardProvider({ children }) {
	const [timePeriod, setTimePeriod] = useState("week"); // 'week' or 'month'
	const [selectedWeek, setSelectedWeek] = useState(0); // 0 = current week, -1 = last week, etc.
	const [selectedMonth, setSelectedMonth] = useState(0); // 0 = current month, -1 = last month, etc.
	const todayStats = {
		studyTime: 4.5,
		goal: 6,
		sessions: 3,
		subjects: ["Toán", "Lý", "Hóa"],
	};

	const getAverageStats = () => {
		if (timePeriod === "week") {
			return weekData[Math.abs(selectedWeek)] || weekData[0];
		} else {
			return monthData[Math.abs(selectedMonth)] || monthData[0];
		}
	};

	const averageStats = getAverageStats();

	const contextValue = {
		averageStats,
		timePeriod,
		setTimePeriod,
		selectedWeek,
		setSelectedWeek,
		selectedMonth,
		setSelectedMonth,
		todayStats,
	};
	return (
		<DashboardContext.Provider value={contextValue}>
			{children}
		</DashboardContext.Provider>
	);
}
