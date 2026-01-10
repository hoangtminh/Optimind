import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{ hostname: "lh3.googleusercontent.com" }, // Ảnh Google
			{ hostname: "avatars.githubusercontent.com" }, // Ảnh GitHub (nếu có dùng auth GitHub)
			{ hostname: "your-project-id.supabase.co" }, // Ảnh từ Supabase Storage của bạn
		],
	},
};

export default nextConfig;
