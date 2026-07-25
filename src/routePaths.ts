const routePaths = {
	index: "/",
	login: "/login",
	register: "/register",
	dashboard: "/dashboard",
	courses: "courses",
	courseDetail: "course/:id",
	users: "users",
	userDetail: "user/:id",
} as const;

export default routePaths;
