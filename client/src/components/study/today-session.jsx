import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChevronLeft, ChevronRight, Clock, History } from "lucide-react";
import { Badge } from "../ui/badge";
import { useStudy } from "@/hooks/use-study-session";
import { Button } from "../ui/button";

const TodaySession = () => {
	const { allSessions } = useStudy();

	const [sessionPage, setSessionPage] = useState(1);

	const paginatedSession = allSessions.slice(
		(sessionPage - 1) * 5,
		sessionPage * 5
	);

	return (
		<Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-200">
			<CardHeader>
				<CardTitle className="flex flex-row gap-2 items-center text-lg text-purple-600">
					<History className="w-5 h-5" />
					Phiên học hôm nay
				</CardTitle>
				<div className="flex justify-between items-center">
					<span className="pl-1 text-sm text-slate-700">
						{(sessionPage - 1) * 5 + 1}-
						{Math.min(sessionPage * 5, allSessions.length)} của{" "}
						{allSessions.length}
					</span>
					<div className="flex gap-1">
						<Button
							variant="ghost"
							size="sm"
							onClick={() =>
								setSessionPage(Math.max(0, sessionPage - 1))
							}
							disabled={sessionPage === 1}
							className={
								"hover:cursor-pointer hover:bg-orange-300"
							}
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setSessionPage(sessionPage + 1)}
							disabled={sessionPage * 5 >= allSessions.length}
							className={
								"hover:cursor-pointer hover:bg-orange-300"
							}
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				{allSessions.length !== 0 ? (
					<div className="space-y-3">
						{paginatedSession.map((session) => (
							<div
								key={session.id}
								className="flex items-center justify-between px-3 py-2 bg-white rounded-lg"
							>
								<div className="flex items-center gap-3">
									<Clock className="h-4 w-4 text-slate-400" />
									<div>
										<div className="flex flex-row gap-2 font-medium text-slate-700 capitalize">
											{session.method} -{" "}
											<div className="flex flex-row gap-2">
												{session.subjects.length > 0
													? session.subjects.map(
															(
																subject,
																index
															) => {
																return (
																	<Badge
																		key={
																			index
																		}
																		variant="default"
																		className="text-xs"
																		style={{
																			backgroundColor:
																				subject.color,
																		}}
																	>
																		{
																			subject.name
																		}
																	</Badge>
																);
															}
													  )
													: "Study free"}
											</div>
										</div>
										<div className="text-sm text-slate-500">
											Duration: {session.studyTime} minute
											• {session.cycles} cycles{" "}
										</div>
										<div className="text-sm text-slate-500">
											Started At: {session.startedAt}
										</div>
									</div>
								</div>
								<div className="flex gap-1">
									{session.tags.length > 0 ? (
										session.tags
											.slice(0, 3)
											.map((tag, index) => (
												<Badge
													key={index}
													variant="default"
													className="text-xs"
													style={{
														backgroundColor:
															tag.color,
													}}
												>
													{tag.name}
												</Badge>
											))
									) : (
										<Badge variant={"outline"}>
											No tags
										</Badge>
									)}
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-slate-500 text-center py-4">
						Chưa có phiên học nào hôm nay
					</p>
				)}
			</CardContent>
		</Card>
	);
};

export default TodaySession;
