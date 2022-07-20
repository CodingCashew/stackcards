import { React, useState } from 'react';
import { Container, Text, Flex } from '@chakra-ui/react';
// import { PlusSquareIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { PlusSquareIcon } from '@chakra-ui/icons';
import AddCard from './AddCard';
// import EditCard from './EditCard';
// import DeleteCard from './DeleteCard';


function CardContainer({cards, currentCard, index, isShowingBack, setAddDeck, setDeleteDeck}) {
  const [addCard, setAddCard] = useState(false);
  // const [editCard, setEditCard] = useState(false);
  // const [deleteCard, setDeleteCard] = useState(false);

  // add a new card to the current deck in the database
  const handleAddCard = () => {
    if (addCard) setAddCard(false)
    else {
      setAddCard(true)
      // setAddDeck(false)
      // setDeleteDeck(false)
      // setEditCard(false)
      // setDeleteCard(false)
    }
  }
  // edit the current card in the current deck
  // const handleEditCard = () => {
  //   if (editCard) setEditCard(false)
  //   else {
  //     // setEditCard(true)
  //     setAddDeck(false)
  //     setDeleteDeck(false)
  //     setAddCard(false)
  //     // setDeleteCard(false)
  //   }
  // }
  // delete the current card in the current deck from the database
  // const handleDeleteCard = () => {
  //   if (deleteCard) setDeleteCard(false)
  //   else {
  //     // setDeleteCard(true)
  //     setAddDeck(false)
  //     setDeleteDeck(false)
  //     // setEditCard(false)
  //     setAddCard(false)
  //   }
  // }

  return (

    <Flex direction="column">
      {/* Front of card */}
      <Container  mt={10} mb={7} minH='240px' borderRadius={6} boxShadow='3px 3px 5px 1px #ccc' >
        {cards.length ? <Text fontSize='3xl' color="yellow1" align="center" p={8}>{cards[index].front}</Text> : <Text fontSize='2xl' align="center" p={12}>This deck is empty. Click the plus icon below to add cards to this deck. </Text>}
      {/* Back of card */}
        {isShowingBack && <Text fontSize='3xl' color="pink2" p={8}>{cards[index].back}</Text>}
      </Container >

      {addCard && <AddCard onClick={handleAddCard} setAddCard={setAddCard} />}
      {/* {editCard && <EditCard onClick={handleEditCard}/>}
      {deleteCard && <DeleteCard onClick={handleDeleteCard}/>} */}

      {/* Icons Container   */}
      <Flex justify="center" gridGap={4} p={4}>
        <PlusSquareIcon w={5} h={5} color="gray" onClick={handleAddCard} sx={{ cursor: "pointer" }} />
        {/* <EditIcon w={5} h={5} color="gray" onClick={handleEditCard} sx={{ cursor: "pointer" }} />
        <DeleteIcon w={5} h={5} color="gray" onClick={handleDeleteCard} sx={{ cursor: "pointer" }} /> */}
      </Flex>
    </Flex>
  )
}

export default CardContainer