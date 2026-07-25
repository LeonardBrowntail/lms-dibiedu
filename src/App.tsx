import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import routePaths from "./routePaths";
import Dashboard from "./pages/Dashboard";
import PublicRoute from "./components/PublicRoute";
import RoleFilter from "./components/RoleFilter";
import Users from "./pages/Users";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
	return (
		<>
			<Routes>
				<Route index element={<Home />} />
				<Route path={routePaths.courses} element={<Courses />} />

				<Route element={<PublicRoute />}>
					<Route path={routePaths.register} element={<Register />} />
					<Route path={routePaths.login} element={<Login />} />
				</Route>

				<Route element={<ProtectedRoute />}>
					<Route path={routePaths.dashboard} element={<Dashboard />}>
						<Route index element={<DashboardPage />} />
						<Route path={routePaths.courses} element={<Courses />} />
						<Route element={<RoleFilter allowedRoles={["admin"]} />}>
							<Route path={routePaths.users} element={<Users />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</>
	);
}
