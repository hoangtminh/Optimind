"use server";

import StreamVideoProvider from "@/hooks/useStream";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const StudyRoomLayout = async ({ children }: { children: React.ReactNode }) => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return <StreamVideoProvider user={user}>{children}</StreamVideoProvider>;
};

export default StudyRoomLayout;
