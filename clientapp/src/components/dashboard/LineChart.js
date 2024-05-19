import React from "react";
import { Chart } from "react-google-charts";
import { theme } from "@chakra-ui/theme";

import useLocalStorage from "../../hooks/useLocalStorage";

const colors = theme.colors;
const options = {
	title: "Number of reps (Last 7days)",
	titleTextStyle: {
		color: colors.teal[800],
		fontSize: 20, // Font size in pixels
	},
	curveType: "function",
	legend: { position: "in" },
	vAxis: {
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
	const { data } = props;
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
