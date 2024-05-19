import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import WorkoutCard from "./WorkoutCard";
import LineChart from "./LineChart";

export default React.forwardRef((props, ref) => {
  //hardcoded workouts - need to be changed
  const workoutList = [
    {
      title: "Legs",
      exercises: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Integer molestie lorem at massa<",
      ],
    },
    {
      title: "Arms",
      exercises: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Integer molestie lorem at massa<",
      ],
    },
    {
      title: "Back",
      exercises: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Integer molestie lorem at massa<",
      ],
    },
  ];
  return (
    <Flex direction={"column"} w={"100%"} h={"100%"} gap={"2rem"}>
      <Text>Welcome to FitFriend!</Text>
      <Flex direction={"row"} w={"100%"} h={"150px"} flex={1} gap={"1rem"}>
        <Flex flex={2} h={"100%"}>
          <LineChart />
        </Flex>
        <Flex id="workoutCards" direction={"column"} flex={1} h={"100%"}>
          {workoutList.map((workoutInfo, index) => (
            <WorkoutCard key={index} workoutInfo={workoutInfo}></WorkoutCard>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
});
 