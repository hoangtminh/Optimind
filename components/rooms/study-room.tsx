import { LayoutList } from "lucide-react";
import React, { useState } from "react";

import {
	CallControls,
	CallParticipantsList,
	PaginatedGridLayout,
	SpeakerLayout,
	useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const glassEffect =
	"bg-black/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

const MeetingRoom = () => {
	const [layout, setLayout] = useState("speaker-left");
	const [showParticipants, setShowParticipants] = useState(true);

	const { useParticipants } = useCallStateHooks();
	const participants = useParticipants();

	const CallLayout = () => {
		switch (layout) {
			case "grid":
				return (
					<PaginatedGridLayout
						// participant={participant}
						// ParticipantViewUI={ParticipantDetails}
						mirrorLocalParticipantVideo={true}
					/>
				);
			case "speaker-right":
				return (
					<SpeakerLayout
						// participant={participant}
						// ParticipantViewUI={ParticipantDetails}
						participantsBarPosition="left"
						mirrorLocalParticipantVideo={true}
					/>
				);
			default:
				return (
					<SpeakerLayout
						// participant={participant}
						// ParticipantViewUI={ParticipantDetails}
						participantsBarPosition="right"
						mirrorLocalParticipantVideo={true}
					/>
				);
		}
	};

	return (
		<div
			className={cn(
				"absolute top-20 bottom-6 left-24 right-24", // Vị trí
				glassEffect
				// "overflow-hidden"
			)}
		>
			<div className="flex flex-col justify-center items-center w-full mb-15">
				<div className="flex justify-center size-full max-w-[600px] items-center bg-white">
					<CallLayout />
				</div>
				<div
					className={cn("h-[calc(100vh-86px)] hidden ml-2", {
						"show-block": showParticipants,
					})}
				>
					<CallParticipantsList
						onClose={() => setShowParticipants(false)}
					/>
				</div>
				<div className="flex flex-row w-full items-center justify-center gap-5">
					<div className="z-50 w-50 h-50 bg-red-300">
						<CallControls />
					</div>
					<DropdownMenu>
						<div className="flex items-center">
							<DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
								<LayoutList size={20} className="text-white" />
							</DropdownMenuTrigger>
						</div>
						<DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
							{["Grid", "Speaker-Left", "Speaker-Right"].map(
								(item, index) => (
									<div key={index}>
										<DropdownMenuItem
											onClick={() =>
												setLayout(item.toLowerCase())
											}
										>
											{item}
										</DropdownMenuItem>
										<DropdownMenuSeparator className="border-dark-1" />
									</div>
								)
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
};

export default MeetingRoom;
