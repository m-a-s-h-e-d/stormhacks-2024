import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/login/LoginPage";
import MediaPipe from "./components/media-pipe/MediaPipe";
import { useAuth } from "./context/AuthContext";

function App() {
	const { isAuthenticated, isAdmin } = useAuth();

	return (
		<div id="main-container">
			<Routes>
				<Route
					path="/login"
					element={
						!isAuthenticated ? <LoginPage /> : <Navigate to="/home" />
					}
				/>
				<Route
					path="/test"
					element={<MediaPipe />}
				/>
				<Route
					path="/"
					element={isAuthenticated ? <Navigate to='/home' /> : <Navigate to="/login" />}
				/>
			</Routes>
		</div>
	);
}

export default App;
