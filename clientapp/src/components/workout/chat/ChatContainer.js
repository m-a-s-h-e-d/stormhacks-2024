import React from "react";
import { theme } from "@chakra-ui/theme";
import { Flex } from "@chakra-ui/react";
import ChatBlob from "./ChatBlob";
import ChatInput from "./ChatInput";


export default React.forwardRef((props, ref) => {
	const { chatHistory, handleSendChat, isSendingChat } = props;

	return (
		<Flex direction={"column"} w={"40%"} h={"100%"} padding="1rem">
			<Flex
				direction={"column"}
				w={"100%"}
				h={"100%"}
				padding="1rem"
				backgroundColor={"gray.50"}
				borderRadius={"lg"}
				gap={"0.5rem"}
			>
				<Flex
					id="chat-container"
					direction={"column"}
					w={"100%"}
					h={"100%"}
					overflowY={"auto"}
					padding="1rem"
					backgroundColor={"gray.50"}
					borderRadius={"lg"}
					gap={"1rem"}
				>
					{chatHistory.map((chat, index) => (
						<ChatBlob key={index} chat={chat} />
					))}
				</Flex>

				<ChatInput isSendingChat={isSendingChat} handleSendChat={handleSendChat} />
			</Flex>
		</Flex>
	);
});
