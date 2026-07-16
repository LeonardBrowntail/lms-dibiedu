import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error(
			"useAuth must be used from within AuthProvider, make sure to have this element within AuthProvider",
		);
	}
	return context;
}
