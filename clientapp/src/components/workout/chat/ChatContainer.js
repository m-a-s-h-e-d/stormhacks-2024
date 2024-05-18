import React from "react";
import { theme } from "@chakra-ui/theme";
import { Flex } from "@chakra-ui/react";
import ChatBlob from "./ChatBlob";
import chatData from "../../../chat.json";
import ChatInput from "./ChatInput";

const colors = theme.colors;

export default React.forwardRef((props, ref) => {
	const [chatHistory, setChatHistory] = React.useState(chatData?.chats ?? []);

	const handleSendChat = React.useCallback(
		(data) => {
			setChatHistory((prevChatHistory) => {
				return [
					...prevChatHistory,
					{
						message: data?.chat,
						isFromUser: true,
					},
				];
			});
            // TODO: Add send chat here
		},
		[setChatHistory]
	);

	return (
		<Flex
			direction={"column"}
			w={"40%"}
			h={"100%"}
			padding="1rem"
		>
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
						<ChatBlob
							key={index}
							message={chat?.message}
							isFromUser={chat?.isFromUser}
						/>
					))}
				</Flex>

				<ChatInput handleSendChat={handleSendChat} />
			</Flex>
		</Flex>
	);
});
