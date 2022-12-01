import { React, useState } from 'react';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import './CardContainer';
import './DeckMenu'

export default function EditCard({ setEditingCard, currentDeck, currentCard, getCards }) {
  const cardid = currentCard.cardid
  const [values, setValues] = useState({ front: '', back: '', cardid });
  const handleChangeCardData = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const editCardInDb = async () => {
    console.log('editing card in database...')
    if (values.front && values.back) {
      fetch(`/editCard/${currentDeck}`, {
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
    setEditingCard(false);
  }

  const handleCancel = () => {
    setEditingCard(false);
  }

  return (
    <FormControl gridGap={4}>
      <FormLabel>Enter New Card Front:</FormLabel>
      <Input placeholder='Front of Card' name="front" value={values.front} onChange={handleChangeCardData} />
      <FormLabel>Enter New Card Back:</FormLabel>
      <Input placeholder='Back of Card' name="back" value={values.back} onChange={handleChangeCardData} />
      <Button color="white" bgColor="pink1" mt={5} type="submit" onClick={editCardInDb}>Submit Changes</Button>
      <Button mt={5} ml={2} onClick={handleCancel}>Cancel</Button>
    </FormControl>
  )
}
