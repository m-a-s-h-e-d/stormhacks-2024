import { Flex, ListItem, Button, UnorderedList, Text } from "@chakra-ui/react";
import React from "react";
import { theme } from "@chakra-ui/theme";
import { useNavigate } from "react-router-dom";

export default React.forwardRef((props, ref) => {
	const navigate = useNavigate();
	const { workoutInfo, handleOnStartClick, index } = props;
	const colors = theme.colors;

  const onStartClick = React.useCallback(() => {
    handleOnStartClick(index);
  }, [handleOnStartClick, index]);

	return (
		<Flex
			minW="md"
      w="md"
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
				{workoutInfo.workoutName}
			</Text>
			<UnorderedList ml="3rem" color={colors.teal[800]}>
				{workoutInfo.routine.map((exercise, index) => (
					<ListItem key={index}>{`${exercise?.name} - ${exercise?.sets} Sets of ${exercise?.reps} Reps`}</ListItem>
				))}
			</UnorderedList>
			<Button
				colorScheme="primaryOrange"
				variant="solid"
				justifyContent={"center"}
				margin="10px"
				onClick={onStartClick}
			>
				Start
			</Button>
		</Flex>
	);
});
