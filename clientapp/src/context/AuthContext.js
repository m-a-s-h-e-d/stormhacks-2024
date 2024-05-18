import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useToast } from "@chakra-ui/react";

const AuthContext = React.createContext();

const initialState = {
	id: null,
	username: "Jeff",
	email: "",
};

const AuthProvider = ({ children }) => {
	const toast = useToast();
	const [userInfo, setUserInfo, clearUserInfo] = useLocalStorage(
		initialState,
		"userInfo"
	);

	const handleLogin = React.useCallback(
		(data) => {
			setUserInfo((prev) => {
				return {
					...prev,
					...data,
					id: 1,
				};
			});
		},
		[setUserInfo]
	);

	const handleLogout = React.useCallback(() => {
		setUserInfo(initialState);
		clearUserInfo();
	}, [setUserInfo, clearUserInfo]);

	const authManager = React.useMemo(() => {
		return {
			isAuthenticated: userInfo?.id !== null,
			login: handleLogin,
			logout: handleLogout,
		};
	}, [userInfo, handleLogin, handleLogout]);

	return (
		<AuthContext.Provider value={authManager}>{children}</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export { AuthProvider, useAuth };
