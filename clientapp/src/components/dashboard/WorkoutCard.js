import { Flex, ListItem, Button, UnorderedList, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { workoutInfo } = props;

  return (
    <Flex
      maxW="sm"
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      padding="10px"
      margin="10px"
      direction={"column"}
    >
      <Text
        margin="1"
        ml="5px"
        fontSize="20px"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        justifyContent={"center"}
      >
        {workoutInfo.title}
      </Text>
      <UnorderedList>
        {workoutInfo.exercises.map((exercise, index) => (
          <ListItem key={index}>{exercise}</ListItem>
        ))}
      </UnorderedList>
      <Button
        colorScheme="teal"
        variant="solid"
        justifyContent={"center"}
        margin="10px"
        onClick={() => {
          navigate("/workout");
        }}
      >
        Start
      </Button>
    </Flex>
  );
});
