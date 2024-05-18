import React from "react";
import {
  Alert,
  Flex,
  AlertIcon,
  AlertTitle,
  ListItem,
  Button,
  UnorderedList,
  Text,
  Box,
} from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import WorkoutCard from "./WorkoutCard";

const colors = theme.colors;

export default React.forwardRef((props, ref) => {
  return (
    <Flex direction={"column"} w={"100%"} h={"100%"} gap={"2rem"}>
      <Text>Welcome to FitFriend!</Text>
      <Flex
        id="content-container"
        direction={"row"}
        w={"100%"}
        h={"150px"}
        flex={1}
        gap={"1rem"}
      >
        <Text w={"60%"} h={"100%"}>
          Graph area
        </Text>
        <Flex
          id="video-container"
          direction={"column"}
          w={"60%"}
          h={"100%"}
          flex={1}
        >
          <WorkoutCard></WorkoutCard>
		  <WorkoutCard></WorkoutCard>
		  <WorkoutCard></WorkoutCard>
        </Flex>
      </Flex>
    </Flex>
  );
});
