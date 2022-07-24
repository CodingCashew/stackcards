import { React, useState } from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import './DeckMenu';

function AddDeck({setDecks, decks, setAddingDeck, getDecks}) {
  // stores the current user input for new deck name
  const [deckName, setDeckName] = useState('')
  const handleSetDeckName = (e) => setDeckName(e.target.value)

  // won't add the deck if the input form is empty
  const addDeck = async () => {
    if (deckName !== '') {
      fetch(`/addDeck/${deckName}`, { method: 'POST' })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        })
        .catch((err) => console.log(err));
    }
    setAddingDeck(false);
    // setCurrentDeck(**)
    getDecks();
  }

  return (
    <FormControl gridGap={4}>
      <FormLabel>Enter Deck Name:</FormLabel>
      <Input placeholder='Deck Name' onChange={handleSetDeckName} />
      <Button color="white" bgColor="yellow2" mt={5} type="submit" onClick={addDeck}>Add Deck</Button>
    </FormControl>
  )
}

export default AddDeck;