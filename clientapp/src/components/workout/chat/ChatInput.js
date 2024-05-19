import { Button, Input, IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

export default React.forwardRef((props, ref) => {
    const { handleSendChat } = props;

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
        reset,
		formState: { errors, isSubmitting },
	} = useForm();

    const handleOnSubmit = React.useCallback((data) => {
        reset();
        handleSendChat(data);
    }, [handleSendChat]);

	return (
		<form id="chat-form" onSubmit={handleSubmit(handleOnSubmit)}>
			<InputGroup >
				<Input type="text" {...register("chat")} />
                <InputRightElement>
                    <Button size="sm" type="submit">Send</Button>
                </InputRightElement>
			</InputGroup>
		</form>
	);
});
