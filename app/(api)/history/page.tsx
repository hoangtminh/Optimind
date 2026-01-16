// Tên file: app/history/page.tsx
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getStudySessions } from "@/supabase/lib/getStudySession";
import { StudySession } from "@/lib/type/session-type";
import HistoryList from "@/components/history/history-list";
import SessionDetails from "../../../components/history/session-details";
import OverallStat from "../../../components/history/overall-stats";

// --- Component chính ---
export default function HistoryPage() {
	// === State cho Trang ===
	const [filter, setFilter] = useState<"day" | "week" | "month">("day");
	const [sessions, setSessions] = useState<StudySession[]>([]);
	const [selectedSession, setSelectedSession] = useState<StudySession | null>(
		null
	);
	// Lấy dữ liệu tổng quan
	useEffect(() => {
		const fetchSession = async () => {
			const data = await getStudySessions();
			setSessions(data ? data : []);
		};

		fetchSession();
	}, []);

	return (
		<main className="h-screen w-screen text-white p-6 transition-all duration-500">
			<div className="relative w-full h-full">
				{/* === Nội dung chính - Lịch sử học tập === */}
				{/* (Phần này giữ nguyên) */}
				<div
					className={cn(
						"absolute h-[93%] w-[85%] top-1/12 left-1/2 -translate-x-1/2", // Định vị giữa
						"flex gap-6", // Layout 2 cột
						"overflow-hidden"
					)}
				>
					{/* --- Cột 1: Danh sách Lịch sử --- */}
					<div className="flex-[0.5] h-full">
						<HistoryList
							sessions={sessions}
							selectedSession={selectedSession}
							setSelectedSession={setSelectedSession}
							filter={filter}
							setFilter={setFilter}
						/>
					</div>

					{/* --- Cột 2: Chi tiết Phiên học / Tổng quan --- */}
					<div className="flex-[0.5] flex flex-col h-full">
						{selectedSession ? (
							// === CHẾ ĐỘ XEM CHI TIẾT ===
							<>
								<SessionDetails
									selectedSession={selectedSession}
									setSelectedSession={setSelectedSession}
								/>
							</>
						) : (
							// === CHẾ ĐỘ TỔNG QUAN ===
							<>
								<OverallStat filter={filter} />
							</>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
