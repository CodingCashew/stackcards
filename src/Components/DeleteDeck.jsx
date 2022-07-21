import { React } from 'react';
import { Container, Text, Button } from '@chakra-ui/react';
import './DeckMenu';


function DeleteDeck({ currentDeck, setCurrentDeck, setDeletingDeck, getDecks, decks }) {
  // closes the popover when the user clicks "cancel"
  const handleCancel = () => {
    setDeletingDeck(false);
  }
  const deleteDeck = async () => {
    console.log('deleting...')
    fetch(`/deleteDeck/${currentDeck}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => {
        console.log('data:', data)
        getDecks();
      })
      .catch((err) => console.log(err));
    setDeletingDeck(false);
  }

  return (
    <Container>
      <Text  fontSize='xl'>Are you absolutely sure you want to delete your <strong>{currentDeck}</strong> deck and ALL the cards in it? </Text>
      <Text fontSize='lg'>This action cannot be undone.</Text>
      <Button mt={5} onClick={handleCancel}>Cancel</Button>
      <Button color="white" bgColor='yellow2' mt={5} ml={3} onClick={deleteDeck} >Yes, DELETE this ENTIRE deck.</Button>
    </Container>
  )
}

export default DeleteDeck