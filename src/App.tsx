import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import routePaths from "./routePaths";
import Dashboard from "./pages/Dashboard";

export default function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route index element={<Home />} />
				<Route path={routePaths.register} element={<Register />} />
				<Route path={routePaths.login} element={<Login />} />
				<Route path={routePaths.courses} element={<Courses />} />

				<Route element={<ProtectedRoute />}>
					<Route path={routePaths.dashboard} element={<Dashboard />} />
				</Route>
			</Routes>
		</>
	);
}
