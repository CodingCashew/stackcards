import React from 'react';
import { Container, Text, Flex } from '@chakra-ui/react';
import { PlusSquareIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'


function CardContainer({cards, index, isShowingBack}) {
  return (

    <Flex direction="column">
      {/* Front of card */}
      <Container  mt={10} mb={7} minH='240px' borderRadius={6} boxShadow='3px 3px 5px 1px #ccc' >
        {cards.length ? <Text fontSize='3xl' color="yellow1" align="center" p={8}>{cards[index].front}</Text> : <Text fontSize='2xl' align="center" p={12}>This deck is empty. Click the plus icon below to add cards to this deck. </Text>}
      {/* Back of card */}
        {isShowingBack && <Text fontSize='3xl' color="pink2" p={8}>{cards[index].back}</Text>}
      </Container >

      {/* Icons Container   */}
      <Flex justify="center" gridGap={4} p={4}>
        <PlusSquareIcon w={5} h={5} color="gray" />
        <EditIcon w={5} h={5} color="gray" />
        <DeleteIcon w={5} h={5} color="gray" />
      </Flex>
    </Flex>
    
  )
}

export default CardContainer