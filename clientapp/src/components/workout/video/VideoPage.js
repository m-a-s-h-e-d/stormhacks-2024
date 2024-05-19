import React from "react";
import { theme } from "@chakra-ui/theme";
import { AspectRatio, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PoseDetection from "../../pose-detection/PoseDetection";

const colors = theme.colors;

export default React.forwardRef((props, ref) => {
	const { handleAddRep, isFinished, isSendingChat, handleFinishWorkout } = props;
	const navigate = useNavigate();

	return (
		<Flex
			id="video-container"
			direction={"column"}
			w={"60%"}
			h={"100%"}
			flex={1}
			p="1rem"
			gap="1rem"
		>
			<Flex direction={"row"} justifyContent={"space-between"}>
				<Button
					onClick={handleFinishWorkout}
					colorScheme="primaryOrange"
					size="lg"
				>
					Finish Workout
				</Button>
				<Button
					onClick={handleAddRep}
					colorScheme="primaryOrange"
					variant="outline"
					size="lg"
					isLoading={isSendingChat}
					disabled={isFinished}
				>
					Add Rep
				</Button>
			</Flex>

			<AspectRatio w="100%" h="100%" borderRadius={"lg"}>
				<PoseDetection />
			</AspectRatio>
		</Flex>
	);
});
