import { Flex, Text } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import React from "react";
import ReactMarkdown from "react-markdown";
import './Chat.css'

const newTheme = {
	p: (props) => {
		const { children } = props;
		return (
			<Text color="white">
				{children}
			</Text>
		);
	},
};

export default React.forwardRef((props, ref) => {
	const { chat } = props;
	const isFromUser = React.useMemo(() => {
		return chat?.role === "user";
	}, [chat]);

	const chatMessage = React.useMemo(() => {
		if (chat?.content?.length > 0) {
			return chat?.content[0]?.text ?? "";
		} else {
			return "";
		}
	}, [chat]);

	return (
		<Flex
			direction={"column"}
			borderRadius={"2xl"}
			background={isFromUser ? "blue.700" : "gray.500"}
			alignSelf={isFromUser ? "flex-end" : "flex-start"}
			p="0.75rem"
			maxWidth={"60%"}
            id="markdown-container"
		>
			{isFromUser ? (
				<Text color="white">{chatMessage}</Text>
			) : (
				<ReactMarkdown
					components={ChakraUIRenderer(newTheme)}
					children={chatMessage}
					skipHtml
				/>
			)}
		</Flex>
	);
});
