export interface FocusDataPoint {
	id: string;
	timestamp: string; // Phút
	focus_point: number; // %
	created_at: string;
}

export interface StudySession {
	id: string;
	average_focus: number;
	start_time: string;
	end_time: string;
	total_time: number;
	session_type: string;
	focus_time: number;
	break_time: number;
	cycles: number;
	created_at: string;
}
