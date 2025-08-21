import React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Clock, Target, TrendingUp } from "lucide-react";

const QuickActions = () => {
	return (
		<Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
			<CardHeader>
				<CardTitle className="text-violet-800">
					Hành động nhanh
				</CardTitle>
				<CardDescription className="text-violet-600">
					Các thao tác thường dùng
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex gap-4 flex-wrap">
					<Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
						<Link
							className="flex flex-row gap-1 items-center"
							href="/study"
						>
							<Clock className="mr-2 h-4 w-4" />
							Bắt đầu học
						</Link>
					</Button>
					<Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
						<Link
							className="flex flex-row gap-1 items-center"
							href="/goals"
						>
							<Target className="mr-2 h-4 w-4" />
							Đặt mục tiêu mới
						</Link>
					</Button>
					<Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600">
						<Link
							className="flex flex-row gap-1 items-center"
							href="/progress"
						>
							<TrendingUp className="mr-2 h-4 w-4" />
							Xem tiến độ
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default QuickActions;
