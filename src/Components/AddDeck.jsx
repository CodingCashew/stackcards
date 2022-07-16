import { React, useState } from 'react';
import { FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import './DeckMenu';

function AddDeck(props) {
  // const { myDecks } = props
  // const { setMyDecks } = props
  const [deckName, setDeckName] = useState('')

  const handleSetDeckName = (e) => setDeckName(e.target.value)

  const addDeck = async () => {
    fetch(`/addDeck/${deckName}`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        // setMyDecks([...myDecks, deckName])
      })
      .catch((err) => console.log(err));
  }

  return (
    <FormControl gridGap={4}>
      <FormLabel>Enter Deck Name:</FormLabel>
      <Input placeholder='Deck Name' onChange={handleSetDeckName} />
      <Button color="white" bgColor="yellow2" type="submit" onClick={addDeck}>Add Deck</Button>
    </FormControl>
  )
}

export default AddDeck