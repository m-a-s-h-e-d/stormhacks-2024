import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export default React.forwardRef((props, ref) => {
    const isFromUser = React.useMemo(() => {
        return props?.isFromUser ?? false;
    }, [props]);

	return <Flex
        borderRadius={"2xl"}
        background={isFromUser ? "blue.300" : "gray.500"}
        alignSelf={isFromUser ? "flex-end" : "flex-start"}
        p="0.75rem"
        maxWidth={"60%"}
    >
        <Text color="white">{props?.message ?? "Lorem Ur Mom"}</Text>
    </Flex>;
});
