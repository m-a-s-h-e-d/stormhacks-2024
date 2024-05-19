import React from "react";
import { theme } from "@chakra-ui/theme";
import { Flex, HStack, Heading, Progress, Text } from "@chakra-ui/react";

const colors = theme.colors;

export default React.forwardRef((props, ref) => {
	const { currentRep, goalRep } = props;

	const totalProgress = React.useMemo(() => {
		return (currentRep / goalRep) * 100;
	}, [currentRep, goalRep]);

	return (
		<Flex
			id="progress-container"
			direction={"column"}
			justifyContent={"center"}
			alignItems={"center"}
			w={"100%"}
			h={"150px"}
			p="2.5rem"
		>
			<Flex
				direction={"row"}
				justifyContent={"space-between"}
				w="100%"
				mb="0.5rem"
			>
				<HStack>
					<Text>Done</Text>
					<Heading>{currentRep}</Heading>
				</HStack>
				<HStack>
					<Text>Done</Text>
					<Heading>{goalRep}</Heading>
				</HStack>
			</Flex>
			<Progress colorScheme="primaryOrange" w="100%" value={totalProgress} size="lg" borderRadius={"md"} />
		</Flex>
	);
});
