import { AuthProvider } from "@/hooks/use-auth";

export default function AuthLayout({ children }) {
	return <AuthProvider>{children}</AuthProvider>;
}
