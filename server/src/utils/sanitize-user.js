export const sanitizeUser = (user) => {
	if (!user) return null;
	const sanitize = { email: user.email, username: user.username };

	return sanitize;
};
