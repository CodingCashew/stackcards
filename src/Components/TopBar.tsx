import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function TopBar(): JSX.Element {
  return (
    <Box w="100%" bgColor="pink1" textAlign="center">
      <Text fontSize='3xl' color='white' >MemTool</Text>
    </Box>
  )
}

export default TopBar