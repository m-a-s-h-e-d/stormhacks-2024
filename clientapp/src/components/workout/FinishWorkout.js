import React from "react";
import FormModalContainer from "../common/FormModalContainer";
import { Button, Flex, Heading } from "@chakra-ui/react";


export default React.forwardRef((props, ref) => {
    const { isOpen, onClose, handleOnReturnClick } = props;
    
    return (
        <FormModalContainer 
            isOpen={isOpen} 
            onClose={onClose}
            size="md"
            hideCloseButton={true}
        >
            <Flex direction={"column"} alignItems={"center"}>
                <Heading mb="1rem">Great work! 💪</Heading>
                <Button onClick={handleOnReturnClick} mb="1rem" colorScheme="primaryOrange" size="lg">Return</Button>
            </Flex>
        </FormModalContainer>
    )
});