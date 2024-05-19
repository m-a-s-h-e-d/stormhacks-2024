import React from "react";
import { Chart } from "react-google-charts";
import { theme } from "@chakra-ui/theme";

const colors = theme.colors;
const data = [
	["# of squat", "Goal", "Properly Done"],
	["May 12", 30, 30],
	["May 13", 35, 33],
	["May 14", 35, 38],
	["May 15", 40, 40],
	["May 16", 40, 45],
	["May 17", 50, 48],
	["May 18", 60, 50],
];

const options = {
	title: "Number of reps (Last 7days)",
	titleTextStyle: {
		color: colors.teal[800],
		fontSize: 20, // Font size in pixels
	},
	curveType: "function",
	legend: { position: "in" },
	vAxis: {
		viewWindow: {
			min: 20, // minimum value for the y-axis
			max: 70, // maximum value for the y-axis
		},
		gridlines: {
			// color: 'none', // Removes the gridlines on the y-axis
			count: 5,
		},
	},
	chartArea: {
		top: 50,
		width: "80%",
		height: "75%",
	},
	series: {
		0: { pointSize: 7 }, // Increase point size for the first series (Goal)
		1: { pointSize: 7 }, // Increase point size for the second series (Properly Done)
	},
	colors: ["#002379", "#FF9F66"],
};

export default React.forwardRef((props, ref) => {
	return (
		<Chart
			chartType="LineChart"
			width="100%"
			height="100%"
			data={data}
			options={options}
		/>
	);
});
