import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export default React.forwardRef((props, ref) => {
    const {chat} = props
    const isFromUser = React.useMemo(() => {
        return chat?.role === "user";
    }, [chat]);

    const chatMessage = React.useMemo(() => {
        if (chat?.content?.length > 0) {
            return chat?.content[0]?.text ?? ""
        } else {
            return ""
        }
    }, [chat]);

	return <Flex
        borderRadius={"2xl"}
        background={isFromUser ? "blue.300" : "gray.500"}
        alignSelf={isFromUser ? "flex-end" : "flex-start"}
        p="0.75rem"
        maxWidth={"60%"}
    >
        <Text color="white">{chatMessage ?? "Lorem Ur Mom"}</Text>
    </Flex>;
});
