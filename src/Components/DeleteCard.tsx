// import { React } from 'react';
import { Text, Container, Button } from '@chakra-ui/react';
import './CardContainer';
import './DeckMenu'

function DeleteCard( currentCard: {}, currentDeck: string, setDeletingCard: (arg0: boolean) => void, getCards: () => void ): JSX.Element {
  const cardid = currentCard.cardid
  const handleCancel = () => {
    setDeletingCard(false);
  }

  const deleteCardFromDb = async () => {
    fetch(`/deleteCard/${currentDeck}`, {
      method: 'DELETE',
      body: JSON.stringify({ cardid }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data:', data)
        getCards();
      })
      .catch((err) => console.log(err));
    setDeletingCard(false);
  }

  return (
    <Container>

    <Text fontSize='xl'>Are you want to DELETE the current card? </Text>
    <Text fontSize='lg'>This action cannot be undone.</Text>
    <Button mt={5} onClick={handleCancel}>Cancel</Button>
    <Button color="white" bgColor='yellow2' mt={5} ml={3} onClick={deleteCardFromDb} >Yes, DELETE this card.</Button>
  </Container>
  )
}

export default DeleteCard