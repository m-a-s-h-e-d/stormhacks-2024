import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/login/LoginPage";
import { useAuth } from "./context/AuthContext";
import WorkoutPage from "./components/workout/WorkoutPage";
import PoseDetection from "./components/pose-detection/PoseDetection";
import DashBoardPage from "./components/dashboard/DashBoardPage";

function App() {
	const { isAuthenticated, isAdmin } = useAuth();

	return (
		<div id="main-container">
			<Routes>
				<Route
					path="/login"
					element={
						!isAuthenticated ? <LoginPage /> : <Navigate to="/workout" />
					}
				/>
				<Route
					path="/test"
					element={<PoseDetection />}
				/>
				<Route
					path="/"
					element={isAuthenticated ? <Navigate to='/home' /> : <Navigate to="/login" />}
				/>
				<Route
					path="/workout"
					element={isAuthenticated ? <WorkoutPage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/home"
					element={isAuthenticated ? <DashBoardPage /> : <Navigate to="/login" />}
				/>
			</Routes>
		</div>
	);
}

export default App;
