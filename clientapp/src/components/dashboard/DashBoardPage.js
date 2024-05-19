import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import WorkoutCard from "./WorkoutCard";
import LineChart from "./LineChart";
import { theme } from "@chakra-ui/theme";
import useLocalStorage, { setWithExpiry } from "../../hooks/useLocalStorage";
import workoutFakeData from "../../workouts.json";
import { useNavigate } from "react-router-dom";
import fakeHistory from "../../progress.json";

export default React.forwardRef((props, ref) => {
	const colors = theme.colors;
	const navigate = useNavigate();

	const [data, setData, clearData] = useLocalStorage(
		fakeHistory,
		"progressData",
		86400000
	);
	const [workoutList, setWorkoutList] = useLocalStorage(
		workoutFakeData ?? [],
		"workoutList"
	);

	const handleOnStartClick = React.useCallback(
		(index) => {
			setWithExpiry("currentWorkout", workoutList[index]);
			navigate("/workout");
		},
		[workoutList]
	);

	return (
		<Flex direction={"column"} w={"100%"} h={"100%"} gap={"2rem"}>
			<Flex
				justify={"center"}
				fontSize={"30px"}
				mt="20px"
				fontWeight={"bold"}
				color={colors.teal[800]}
			>
				Welcome to FitFriend!
			</Flex>
			<Flex direction={"row"} w={"100%"} h={"150px"} flex={1} gap={"1rem"}>
				<Flex background={"gray"} w="100%" flex={2} h={"100%"}>
					<LineChart data={data} />
				</Flex>
				<Flex direction={"column"}>
					<Heading color="blue.700" size="lg" textAlign="center">
						Your Workouts
					</Heading>
					<Flex
						alignItems={"center"}
						overflowY={"auto"}
						id="workoutCards"
						direction={"column"}
						flex={1}
						h={"100%"}
					>
						{workoutList.map((workoutInfo, index) => (
							<WorkoutCard
								handleOnStartClick={handleOnStartClick}
								key={index}
								workoutInfo={workoutInfo}
								index={index}
							></WorkoutCard>
						))}
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
});
