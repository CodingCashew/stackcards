import { React, useState } from 'react';
import { Container, Text, Flex, Button } from '@chakra-ui/react';
import { PlusSquareIcon, DeleteIcon } from '@chakra-ui/icons';
import AddCard from './AddCard';
// import EditCard from './EditCard';
import DeleteCard from './DeleteCard';

function CardContainer({cards, setAddingDeck, setDeletingDeck, addingCard, setAddingCard, currentDeck, index, setIndex, currentCard, setDeletingCard, deletingCard, getCards, isShowingBack, setIsShowingBack }) {

  // add a new card to the current deck in the database
  const handleAddCard = () => {
    if (addingCard) setAddingCard(false)
    else {
      setAddingCard(true)
      setAddingDeck(false)
      setDeletingDeck(false)
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
  //     setAddingCard(false)
  //     // setDeleteCard(false)
  //   }
  // }
  // delete the current card in the current deck from the database
  const handleDeleteCard = () => {
    if (deletingCard) setDeletingCard(false)
    else {
      setDeletingCard(true)
      setAddingDeck(false)
      setDeletingDeck(false)
      // setEditingCard(false)
      setAddingCard(false)
    }
  }

  // const [isShowingBack, setIsShowingBack] = useState(false)

    // button functions to control where you are in the deck and show the back of the current card
    const getPrevious = () => {
      if (index > 0) {
        setIndex(index - 1)
        setIsShowingBack(false)
      }
    }
    const showBack = () => {
      if (!isShowingBack) setIsShowingBack(true)
    }
    const getNext = () => {
      if (index < cards.length - 1) {
        setIndex(index + 1)
        setIsShowingBack(false)
      }
    }

  return (

    <Flex direction="column">
      {/* Front of card */}
      <Container  mt={10} mb={7} minH='240px' borderRadius={6} boxShadow='3px 3px 5px 1px #ccc' >
        {cards.length ? <Text fontSize='3xl' color="yellow1" align="center" p={8}>{cards[index].front}</Text> : <Text fontSize='2xl' align="center" p={12}>This deck is empty. Click the plus icon below to add cards to this deck. </Text>}
      {/* Back of card */}
        {isShowingBack && <Text fontSize='3xl' color="pink2" p={8}>{cards[index].back}</Text>}
      </Container >

      {addingCard && <AddCard onClick={handleAddCard} setAddingCard={setAddingCard} addingCard={addingCard} currentDeck={currentDeck} getCards={getCards} />}
      {/* {editCard && <EditCard onClick={handleEditCard} currentDeck={currentDeck} />} */}
      {deletingCard && <DeleteCard onClick={handleDeleteCard} setDeletingCard={setDeletingCard} getCards={getCards} currentDeck={currentDeck} currentCard={currentCard} />}

      {/* Icons Container   */}
      <Flex justify="center" gridGap={4} p={4}>
        <PlusSquareIcon w={5} h={5} color="gray" onClick={handleAddCard} sx={{ cursor: "pointer" }} />
        {/* <EditIcon w={5} h={5} color="gray" onClick={handleEditCard} sx={{ cursor: "pointer" }} /> */}
        <DeleteIcon w={5} h={5} color="gray" onClick={handleDeleteCard} sx={{ cursor: "pointer" }} />
      </Flex>
     
     <Flex justify="center" gridGap={3}>
     <Button onClick={getPrevious} bgColor="pink1" color="white">Previous</Button>
     <Button onClick={showBack} bgColor="yellow1" color="white">Show Back</Button>
     <Button onClick={getNext} bgColor="pink1" color="white">Next</Button>
   </Flex>
    </Flex>
  )
}

export default CardContainer