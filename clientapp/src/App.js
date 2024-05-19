import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/login/LoginPage";
import { useAuth } from "./context/AuthContext";
import WorkoutPage from "./components/workout/WorkoutPage";
<<<<<<< HEAD
<<<<<<< HEAD
import PoseDetection from "./components/pose-detection/PoseDetection";
=======
import { Button } from "@chakra-ui/react";
>>>>>>> f703ce33d4d2f5f9f3419ab6eb47182e77ce2beb
=======
import DashBoardPage from "./components/dashboard/DashBoardPage";
>>>>>>> 1f0960cf12f6323721386052a203f0d3fcffa9b3

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
