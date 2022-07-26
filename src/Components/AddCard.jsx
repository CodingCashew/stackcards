import { React, useState } from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import './CardContainer';
import './DeckMenu'

function AddCard({ setAddingCard, currentDeck, getCards }) {

  const [values, setValues] = useState({ front: '', back: '' });
  const handleChangeCardData = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const addCardToDb = async () => {
    console.log('adding card to database...')
    if (values.front && values.back) {
      fetch(`/addCard/${currentDeck}`, {
        method: 'POST',
        body: JSON.stringify({ values }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          getCards();
        })
        .catch((err) => console.log(err));
    }
    setAddingCard(false);
  }

  const handleCancel = () => {
    setAddingCard(false);
  }

  return (
    <FormControl gridGap={4}>
      <FormLabel>Enter Card Front:</FormLabel>
      <Input placeholder='Front of Card' name="front" value={values.front} onChange={handleChangeCardData} />
      <FormLabel>Enter Card Back:</FormLabel>
      <Input placeholder='Back of Card' name="back" value={values.back} onChange={handleChangeCardData} />
      <Button color="white" bgColor="pink1" mt={5} type="submit" onClick={addCardToDb}>Add Card</Button>
      <Button mt={5} ml={2} onClick={handleCancel}>Cancel</Button>
    </FormControl>
  )
}

export default AddCard