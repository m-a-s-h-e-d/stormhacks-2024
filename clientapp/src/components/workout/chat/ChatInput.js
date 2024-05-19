import {
	Button,
	Input,
	IconButton,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

export default React.forwardRef((props, ref) => {
	const { handleSendChat, isSendingChat } = props;

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm();

	const handleOnSubmit = React.useCallback(
		(data) => {
			return new Promise((resolve, reject) => {
				handleSendChat(data)
					.then(resolve)
					.catch(reject)
					.finally(reset);
			});
		},
		[handleSendChat]
	);

	return (
		<form
			id="chat-form"
			autocomplete="off"
			onSubmit={handleSubmit(handleOnSubmit)}
		>
			<InputGroup>
				<Input disabled={isSendingChat} type="text" {...register("chat")} />
				<InputRightElement>
					<Button
						p={"1rem"}
						isLoading={isSendingChat}
						me={"1rem"}
						size="sm"
						type="submit"
					>
						Send
					</Button>
				</InputRightElement>
			</InputGroup>
		</form>
	);
});
