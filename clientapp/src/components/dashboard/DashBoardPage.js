import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import WorkoutCard from "./WorkoutCard";
import LineChart from "./LineChart";
import { theme } from "@chakra-ui/theme";

export default React.forwardRef((props, ref) => {
  const colors = theme.colors;

  //hardcoded workouts - need to be changed
  const workoutList = [
    {
      title: "Legs",
      exercises: [
        "Squats - 3 sets of 10 reps each",
        "Lunges - 3 sets of 10 reps per leg",
        "Deadlifts - 3 sets of 10 reps",
      ],
    },
    {
      title: "Arms",
      exercises: [
        "Bicep Curls - 3 sets of 10 reps each",
        "Tricep Dips - 3 sets of 10 reps",
        "Push-ups - 3 sets of 10 reps",
      ],
    },
    {
      title: "Back",
      exercises: [
        "Pull-ups - 3 sets of 10 reps",
        "Dumbbell Rows - 3 sets of 10 reps per arm",
        "Deadlifts - 3 sets of 10 reps",
      ],
    },
  ];

  return (
    <Flex direction={"column"} w={"100%"} h={"100%"} gap={"2rem"}>
      <Flex justify={"center"} fontSize={"30px"} mt="20px" fontWeight={"bold"} color={colors.teal[800]}>Welcome to FitFriend!</Flex>
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
 