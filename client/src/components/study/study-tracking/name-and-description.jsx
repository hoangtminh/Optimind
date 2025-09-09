import { useStudy } from "@/hooks/use-study-session";
import React from "react";

const NameAndDescription = () => {
	const { sessionData } = useStudy();
	return (
		<div className="flex flex-col p-3 gap-1 mb-4 rounded-lg shadow-lg bg-white border-gray-400/70">
			<div className="text-lg text-nowrap font-medium text-gray-700">
				Tên phiên học: {sessionData.name}
			</div>
			<div className="text-nowrap font-medium text-gray-700">
				Ghi chú: {sessionData.description}
			</div>
		</div>
	);
};

export default NameAndDescription;
