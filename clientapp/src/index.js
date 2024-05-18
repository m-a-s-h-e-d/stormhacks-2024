import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	colors: {
		blue: {
			50: "#dbf4ff",
			100: "#addbff",
			200: "#7cc2ff",
			300: "#4aa9ff",
			400: "#1a91ff",
			500: "#006ACD",
			600: "#005db4",
			700: "#004282",
			800: "#002851",
			900: "#000e21",
		},
		paleYellow: {
			50: "#fffae5",
			100: "#fef0b9",
			200: "#fee589",
			300: "#fedb5a",
			400: "#fed133",
			500: "#e5b824",
			600: "#b28f1a",
			700: "#7f6611",
			800: "#4c3d07",
			900: "#1a1400",
		},
		primaryOrange: {
			50: "#ffeddb",
			100: "#ffceae",
			200: "#ffae7e",
			300: "#ff8f4c",
			400: "#ff6f1a",
			500: "#e65600",
			600: "#b44100",
			700: "#812e00",
			800: "#4f1a00",
			900: "#200700",
		},
	},
});

export default theme;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<AuthProvider>
				<Router>
					<App />
				</Router>
			</AuthProvider>
		</ChakraProvider>
	</React.StrictMode>
);
