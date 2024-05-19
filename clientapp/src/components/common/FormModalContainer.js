import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from "@chakra-ui/react";

export default React.forwardRef((props, ref) => {
	const { isOpen, onClose } = props;
	return (
		<Modal
			closeOnOverlayClick={false}
			isOpen={isOpen}
			onClose={onClose}
			size={props?.size ?? "4xl"}
		>
			<ModalOverlay />
			<ModalContent top={"10rem"}>
				<ModalHeader>{props?.title}</ModalHeader>
				{props?.hideCloseButton ? <></> : <ModalCloseButton />}
				<ModalBody>{props.children}</ModalBody>
			</ModalContent>
		</Modal>
	);
});
