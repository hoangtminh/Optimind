"use client";

import AppBars from "@/components/app/app-bars";
import { CameraProvider } from "@/hooks/useCamera";
import { FocusProvider } from "@/hooks/useFocus";
import { MusicProvider } from "@/hooks/useMusic";
import React from "react";

const AppLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div>
			<MusicProvider>
				<CameraProvider>
					<FocusProvider>
						<AppBars>{children}</AppBars>
					</FocusProvider>
				</CameraProvider>
			</MusicProvider>
		</div>
	);
};

export default AppLayout;
