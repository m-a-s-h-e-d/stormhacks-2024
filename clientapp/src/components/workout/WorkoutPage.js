import React from "react";
import { theme } from "@chakra-ui/theme";
import { Flex } from "@chakra-ui/react";
import ProgressContainer from "./ProgressContainer";
import ChatContainer from "./chat/ChatContainer";
import VideoPage from "./video/VideoPage";
import OpenAi from "openai";
import workoutSample from "../../workout.json";
import { getWithExpiry } from "../../hooks/useLocalStorage";
const colors = theme.colors;

export default React.forwardRef((props, ref) => {
	const [currentRep, setCurrentRep] = React.useState(0);
	const [chatHistory, setChatHistory] = React.useState([]);
	const [isSendingChat, setIsSendingChat] = React.useState(false);
	const workout = React.useMemo(() => {
		return getWithExpiry("currentWorkout") ?? workoutSample;
	}, []);

	const totalRep = React.useMemo(() => {
		return workout?.routine.reduce((acc, curr) => {
			return acc + curr.reps * curr.sets;
		}, 0);
	}, [workout]);

	const routineMap = React.useMemo(() => {
		const routineMap = [];
		workout?.routine.forEach((workout) => {
			for (let i = 0; i < workout.sets * workout.reps; i++) {
				routineMap.push(workout);
			}
		});
		return routineMap;
	}, [workout]);

	const isFinished = React.useMemo(() => {
		return currentRep >= totalRep;
	}, [currentRep, totalRep]);

	const currentWorkoutName = React.useMemo(() => {
		return routineMap[currentRep]?.name ?? "No Workout Name";
	}, [currentRep]);

	const handleSendChat = React.useCallback(
		(data, autoSent) => {
			// Immediately add the user's chat to the chat history
			const newChat = {
				role: "user",
				content: [
					{
						type: "text",
						text: data?.chat,
					},
				],
			};
			if (!autoSent) {
				setChatHistory((prevChatHistory) => {
					return [...prevChatHistory, newChat];
				});
			}

			// wait for the user's chat to be added to the chat history
			const chatData = [...chatHistory, newChat];
			setIsSendingChat(true);
			const openai = new OpenAi({
				apiKey: process.env.REACT_APP_OPENAI_KEY,
				dangerouslyAllowBrowser: true,
			});

			return new Promise((resolve, reject) => {
				openai.chat.completions
					.create({
						model: "gpt-3.5-turbo",
						messages: chatData,
						temperature: 1,
						max_tokens: 2000,
						top_p: 1,
						frequency_penalty: 0,
						presence_penalty: 0,
					})
					.then((response) => {
						const aiResponse = response.choices[0].message;
						const newChat = {
							role: "assistant",
							content: [
								{
									type: "text",
									text: aiResponse?.content ?? "",
								},
							],
						};
						setIsSendingChat(false);
						setChatHistory((prevChatHistory) => {
							return [...prevChatHistory, newChat];
						});
						resolve();
					})
					.catch((error) => {
						console.error(error);
						reject();
					});
			});
		},
		[setChatHistory, chatHistory]
	);

	const manualAddRepChat = React.useCallback(() => {
		handleSendChat({
			chat: `Assistant: I manually added a rep because you didn't detect it, any quick tips for me? I'm doing ${currentWorkoutName}`,
		});
	}, [handleSendChat, currentWorkoutName]);

	const aiAddChat = React.useCallback(() => {
		handleSendChat(
			{
				chat: `The AI noticed the last rep you did was a bit off, can you give the user some tips on how to improve their form? They're doing ${currentWorkoutName}. Some motivation would be great too if highlighted!`,
			},
			true
		);
	}, [handleSendChat, currentWorkoutName]);

	const handleAddRep = React.useCallback(() => {
		if (isFinished || isSendingChat) {
			return;
		}
		manualAddRepChat();
		setCurrentRep((prev) => prev + 1);
	}, [isFinished, manualAddRepChat, isSendingChat]);

	return (
		<Flex direction={"column"} w={"100%"} h={"100%"} gap={"2rem"}>
			<ProgressContainer
				currentRep={currentRep}
				currentWorkout={currentWorkoutName}
				goalRep={totalRep}
			/>
			<Flex
				id="content-container"
				direction={"row"}
				w={"100%"}
				h={"150px"}
				flex={1}
				gap={"1rem"}
			>
				<VideoPage
					isSendingChat={isSendingChat}
					isFinished={isFinished}
					handleAddRep={handleAddRep}
				/>
				<ChatContainer
					isSendingChat={isSendingChat}
					chatHistory={chatHistory}
					handleSendChat={handleSendChat}
				/>
			</Flex>
		</Flex>
	);
});
