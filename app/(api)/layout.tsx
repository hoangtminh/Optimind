"use client";

import AppBars from "@/components/app/app-bars";
import { CameraProvider } from "@/hooks/useCamera";
import { FocusProvider } from "@/hooks/useFocus";
import { MusicProvider } from "@/hooks/useMusic";
import { ProjectProvider } from "@/hooks/useProject";
import { TaskProvider } from "@/hooks/useTask";
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
						<ProjectProvider>
							<TaskProvider>
								<AppBars>{children}</AppBars>
							</TaskProvider>
						</ProjectProvider>
					</FocusProvider>
				</CameraProvider>
			</MusicProvider>
		</div>
	);
};

export default AppLayout;
