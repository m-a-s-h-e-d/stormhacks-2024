import {
    Alert,
    AlertIcon,
    AlertTitle,
    ListItem,
    Button,
    UnorderedList,
    Text,
    Box,
  } from "@chakra-ui/react";
import React from "react";
export default React.forwardRef((props, ref) => {
  
	return (
		<Box maxW="sm" borderWidth="2px" borderRadius="lg" overflow="hidden">
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              Legs
            </Box>
            <UnorderedList>
              <ListItem>Lorem ipsum dolor sit amet</ListItem>
              <ListItem>Consectetur adipiscing elit</ListItem>
              <ListItem>Integer molestie lorem at massa</ListItem>
              <ListItem>Facilisis in pretium nisl aliquet</ListItem>
            </UnorderedList>
            <Button colorScheme="teal" variant="solid">
              Button
            </Button>
          </Box>
	);
});
