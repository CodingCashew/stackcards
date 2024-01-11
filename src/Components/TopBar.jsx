import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function TopBar() {
  return (
    <Box w="100%" bgColor="pink1" align="center" data-testid="topbar">
      <Text fontSize='3xl' color='white' >MemTool</Text>
    </Box>
  )
}

export default TopBar