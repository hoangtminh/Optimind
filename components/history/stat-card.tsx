import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { Label } from "recharts";

const StatCard: FC<{ title: string; value: string; icon: React.ReactNode }> = ({
	title,
	value,
	icon,
}) => {
	const glassEffect =
		"bg-black/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";
	return (
		<div
			className={cn(
				"bg-black/20 p-4 rounded-lg flex items-center gap-3",
				glassEffect
			)}
		>
			<div className="p-2 bg-white/10 rounded-md">{icon}</div>
			<div>
				<Label className="text-xs text-white/70">{title}</Label>
				<p className="text-xl font-bold">{value}</p>
			</div>
		</div>
	);
};
export default StatCard;
