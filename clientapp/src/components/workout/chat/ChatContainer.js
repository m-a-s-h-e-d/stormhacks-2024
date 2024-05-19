import React from "react";
import { theme } from "@chakra-ui/theme";
import { Flex } from "@chakra-ui/react";
import ChatBlob from "./ChatBlob";
import chatData from "../../../chat.json";
import ChatInput from "./ChatInput";
import OpenAi from "openai";

const colors = theme.colors;

export default React.forwardRef((props, ref) => {
	const [chatHistory, setChatHistory] = React.useState(chatData ?? []);

	const getOpenAiApiResult = async (chatData) => {
		const openai = new OpenAi({
			apiKey: process.env.REACT_APP_OPENAI_KEY,
			dangerouslyAllowBrowser: true
		})

		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: chatData,
			temperature: 1,
			max_tokens: 2000,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		  });

		console.log(response.choices[0].message);
		const aiResponse = response.choices[0].message
		const newChat = {
			"role": "assistant",
			"content": [
				{
					"type": "text",
					"text": aiResponse?.content ?? ""
				}
			]
		}
		setChatHistory((prevChatHistory) => {
			return [
				...prevChatHistory,
				newChat
			];
		});
	}

	// Message example:
	// [
	// 	{
	// 	  "role": "user",
	// 	  "content": [
	// 		{
	// 		  "type": "text",
	// 		  "text": "How to squat"
	// 		}
	// 	  ]
	// 	},
	// 	{
	// 	  "role": "assistant",
	// 	  "content": [
	// 		{
	// 		  "type": "text",
	// 		  "text": "Squatting is a fundamental exercise that targets multiple muscle groups, including the quadriceps, hamstrings, glutes, and core. Proper form is crucial to avoid injury and maximize effectiveness. Here's a step-by-step guide on how to perform a basic bodyweight sng a fitness professional to ensure proper technique and personalized guidance."
	// 		}
	// 	  ]
	// 	}
	//   ],

	const handleSendChat = React.useCallback(
		(data) => {
			const newChat = {
				"role": "user",
				"content": [
					{
						"type": "text",
						"text": data?.chat
					}
				]
			}
			setChatHistory((prevChatHistory) => {
				return [
					...prevChatHistory,
					newChat
				];
			});

			getOpenAiApiResult([...chatHistory, newChat]);
		},
		[setChatHistory, chatHistory]
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
							chat={chat}
						/>
					))}
				</Flex>

				<ChatInput handleSendChat={handleSendChat} />
			</Flex>
		</Flex>
	);
});
