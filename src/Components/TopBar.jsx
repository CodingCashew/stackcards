import React from "react";
import { Box, Text, Flex, Image } from "@chakra-ui/react";

function TopBar() {
  return (
    <Box w="100%" bgColor="primary" align="center" data-testid="topbar">
      <Flex gap={5} align="center" justify="center">
        <Image src="/favicon.jpg" height="30px" />
      <Text fontSize="3xl" color="white">
        Swedish Flashcards
      </Text>
      </Flex>
    </Box>
  );
}

export default TopBar;
