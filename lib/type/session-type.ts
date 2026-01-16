export interface FocusDataPoint {
	timestamp: string; // Phút
	focus: number; // %
}

export interface CreateStudySession {
	average_focus: number;
	start_time: string;
	end_time: string;
	total_time: number;
	session_type: string;
	focus_time: number;
	break_time: number;
	cycles: number;
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
