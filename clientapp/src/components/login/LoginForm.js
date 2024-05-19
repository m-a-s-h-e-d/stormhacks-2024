import {
	Alert,
	AlertIcon,
	AlertTitle,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Link,
	Show,
	SlideFade,
	Text,
} from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const colors = theme.colors;
export default React.forwardRef((props, ref) => {
	const { onRegisterClick, onForgetClick } = props;
	const { login } = useAuth();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm();

	const handleOnLogin = (data) => {
		login({ email: data?.email})
		navigate("/workout");
	};

	const onChangeClearError = React.useCallback(() => {
		clearErrors();
	}, [clearErrors]);

	return (
		<Flex
			direction={"column"}
			w={"100%"}
			alignItems={"center"}
			justifyContent={"space-evenly"}
			h="100%"
			padding={"4rem"}
			backgroundColor=""
		>
			<Show below="md">
				<SlideFade offsetY={-200} in={true}>
					<Heading color={colors.teal[800]} size={"xl"} textAlign={"center"}>
						Rephrasify
					</Heading>
					<Heading color={colors.teal[500]} size={"sm"}>
						Elevate Your Expressions with AI
					</Heading>
				</SlideFade>
			</Show>
			<form id="login-form" onSubmit={handleSubmit(handleOnLogin)}>
				{errors.invalidLogin && (
					<Alert status="error" mb="1rem" borderRadius={"0.5rem"}>
						<AlertIcon />
						<AlertTitle>{errors.invalidLogin.message}</AlertTitle>
					</Alert>
				)}

				<FormControl isInvalid={errors.email}>
					<FormLabel>Email address</FormLabel>
					<Input
						defaultValue={""}
						type="email"
						{...register("email", {
							required: true,
							onChange: onChangeClearError,
						})}
					/>
					{errors.email ? (
						<FormErrorMessage>Email is required</FormErrorMessage>
					) : (
						<></>
					)}
				</FormControl>
				<br />
				<FormControl isInvalid={errors.password}>
					<FormLabel>Password</FormLabel>
					<Input
						type="password"
						{...register("password", {
							required: true,
							onChange: onChangeClearError,
						})}
					/>
				</FormControl>
				<br />
				<Button
					mt={4}
					colorScheme="teal"
					isLoading={isSubmitting}
					type="submit"
				>
					Login
				</Button>
			</form>

			{/* <Text justifySelf={"end"}>
				Don't have an account?{" "}
				<Link color="teal.500" onClick={onRegisterClick}>
					Register now
				</Link>
			</Text> */}
		</Flex>
	);
});
