import { Flex, ListItem, Button, UnorderedList, Text } from "@chakra-ui/react";
import React from "react";
import { theme } from "@chakra-ui/theme";
import { useNavigate } from "react-router-dom";

export default React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { workoutInfo } = props;
  const colors = theme.colors;

  return (
    <Flex
      maxW="sm"
      borderWidth="2px"
      borderRadius="lg"
      padding="10px"
      margin="10px"
      direction={"column"}
    >
      <Text
        margin="1"
        ml="7px"
        fontSize="20px"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        color={colors.teal[800]}
      >
        {workoutInfo.title}
      </Text>
      <UnorderedList color={colors.teal[800]}>
        {workoutInfo.exercises.map((exercise, index) => (
          <ListItem key={index}>{exercise}</ListItem>
        ))}
      </UnorderedList>
      <Button
        color={colors.teal[500]}
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
