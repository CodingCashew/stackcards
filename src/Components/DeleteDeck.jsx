import { React } from 'react';
import { Container, Text, Button } from '@chakra-ui/react';
import './DeckMenu';

function DeleteDeck(props) {
  // const currentDeck = props.currentDeck
  const deleteDeck = async () => {
    console.log('deleting...')
    // fetch(`/deleteDeck/${currentDeck}`, { method: 'DELETE' })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data)
    //     // setMyDecks([...myDecks, deckName])
    //   })
    //   .catch((err) => console.log(err));
  }



  
  return (
    <Container>
      <Text>Current Deck: {props.currentDeck} </Text>
      {/* <Text  fontSize='xl'>Are you absolutely sure you want to delete {currentDeck} and all the cards in it? This action cannot be undone.</Text> */}
      {/* <Button onClick={setDeleteDeck(false)}>Cancel</Button> */}
      <Button color="white" bgColor='yellow2' onClick={deleteDeck} >Yes, DELETE this ENTIRE deck.</Button>
    </Container>
  )
}

export default DeleteDeck