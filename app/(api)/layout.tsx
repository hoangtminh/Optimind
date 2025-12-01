"use client";

import AppBars from "@/components/app/app-bars";
import { CameraProvider } from "@/hooks/useCamera";
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
					<AppBars>{children}</AppBars>
				</CameraProvider>
			</MusicProvider>
		</div>
	);
};

export default AppLayout;
