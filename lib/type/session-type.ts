export type StudySession = {
	start_time: string | null;
	end_time: string | null;
	total_time: number;
	focus_time: number;
	break_time: number;
	cycles: number;
	average_focus: number;
	session_type: string;
};

export interface FocusDataPoint {
	time: string; // Giây (để thể hiện thời gian trôi qua)
	focus: number; // %
}
