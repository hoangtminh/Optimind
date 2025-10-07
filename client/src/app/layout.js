import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "EduFocus AI - Cải thiện độ tập trung và hiệu suất học tập",
	description:
		"Hệ thống thông minh giúp cải thiện độ tập trung và tối ưu hóa hiệu suất học tập cá nhân",
};

export default function RootLayout({ children }) {
	return (
		<html lang="vi">
			<body className={inter.className}>
				<main>{children}</main>
			</body>
		</html>
	);
}
