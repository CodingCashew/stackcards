import { React, useState } from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import './CardContainer';
import './DeckMenu'

function AddCard({deckName, decks, index, setAddCard, handleAddCard, currentCard, currentDeck}) {
  // const currentDeck = decks[index];
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');

  const handleSetCardFront = (e) => setCardFront(e.target.value)
  const handleSetCardBack = (e) => setCardBack(e.target.value)

  // const addCardToDb = () => {console.log('adding card to db...')}
  const addCardToDb = async () => {
    if (cardFront && cardBack) {
      fetch(`/addDeck/${currentDeck}`, {
        method: 'POST',
        body: JSON.stringify({ front: cardFront, back: cardBack })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        })
        .catch((err) => console.log(err));
    }
    setAddCard(false);
  }

  const handleCancel = () => {
    setAddCard(false);
  }

  return (
    <FormControl gridGap={4}>
      <FormLabel>Enter Card Front:</FormLabel>
      <Input placeholder='Front of Card' value={cardBack} onChange={handleSetCardFront} />
      <FormLabel>Enter Card Back:</FormLabel>
      <Input placeholder='Back of Card' value={cardFront} onChange={handleSetCardBack} />
      <Button color="white" bgColor="pink1" mt={5} type="submit" onClick={addCardToDb}>Add Card</Button>
      <Button mt={5} ml={2} onClick={handleCancel}>Cancel</Button>
    </FormControl>
  )
}

export default AddCard