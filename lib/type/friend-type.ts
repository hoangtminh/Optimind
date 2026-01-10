export type FriendRequest = {
	id: string;
	user: {
		id: string;
		name: string;
		image_url: string | null;
		study_time: number;
		email: string | null;
	};
};

export type Friend = {
	id: string;
	name: string;
	image_url: string | null;
	study_time: number;
	email: string | null;
};
