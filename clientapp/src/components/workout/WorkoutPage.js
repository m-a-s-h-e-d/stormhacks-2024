import React from "react";
import { theme } from "@chakra-ui/theme";
import { Flex } from "@chakra-ui/react";
import ProgressContainer from "./ProgressContainer";
import ChatContainer from "./chat/ChatContainer";

const colors = theme.colors;

export default React.forwardRef((props, ref) => {
	return (
		<Flex
			direction={"column"}
			w={"100%"}
			h={"100%"}
			gap={"2rem"}
		>
			<ProgressContainer
                currentRep={10}
                goalRep={100}
            />
			<Flex
				id="content-container"
				direction={"row"}
				w={"100%"}
				h={"150px"}
				backgroundColor={"primaryOrange.100"}
				flex={1}
                gap={"1rem"}
			>
				<Flex
					id="video-container"
					direction={"column"}
					w={"60%"}
					h={"100%"}
					backgroundColor={"blue.100"}
					flex={1}
				></Flex>
				<ChatContainer />
			</Flex>
		</Flex>
	);
});
