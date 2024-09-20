import { Box, Flex, Image, Text } from "@chakra-ui/react";

function TopBar() {
  return (
    <Box w="100%" bgColor="grey" align="center" data-testid="topbar">
      <Flex gap={5} align="center" justify="center">
        <Image src="/favicon.jpg" height="30px" />
        <Text fontSize="3xl" color="white">
          FrançaisFlash
        </Text>
      </Flex>
    </Box>
  );
}

export default TopBar;
