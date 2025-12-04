import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const supabase = createClient();
		supabase.auth
			.getUser()
			.then(({ data }) => {
				setUser(data.user);
			})
			.finally(() => {
				setIsLoading(false);
			});

		const { data } = supabase.auth.onAuthStateChange((_, session) => {
			setUser(session?.user ?? null);
			if (isLoading) setIsLoading(false);
		});

		return () => {
			data.subscription.unsubscribe();
		};
	}, []);

	return { user, isLoading };
};
