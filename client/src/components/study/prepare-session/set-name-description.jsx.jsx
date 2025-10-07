import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStudy } from "@/hooks/use-study-session";
import React from "react";

const SetNameDescription = () => {
	const { sessionData, setSessionData } = useStudy();
	return (
		<div className="">
			<div>
				<Label className="text-base font-medium mb-3 block">
					Tên phiên học (Ngày, buổi học)
				</Label>
				<Input
					placeholder="Đặt tên cho phiên học"
					className="w-full h-10 shadow-md border-green-300"
					onChange={(e) =>
						setSessionData((prev) => {
							return { ...prev, name: e.target.value };
						})
					}
					value={sessionData.name}
					required
				/>
			</div>
			<div>
				<Label className="text-base font-medium mb-3 block">
					Ghi chú:
				</Label>
				<Textarea
					placeholder="Ghi chú phiên học"
					className="w-full h-10 max-h-40 shadow-md border-green-300"
					onChange={(e) =>
						setSessionData((prev) => {
							return { ...prev, description: e.target.value };
						})
					}
					value={sessionData.description}
				/>
			</div>
		</div>
	);
};

export default SetNameDescription;
