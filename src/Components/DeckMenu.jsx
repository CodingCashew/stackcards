import { React, useState, useEffect } from 'react';
import { Container, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  List
} from '@chakra-ui/react'

const hardcodedDecks = ['Spanish', 'Chinese', 'Arabic', 'French', 'Persian', 'Swedish', 'Turkish']


function DeckMenu() {
  const [currentDeck, setCurrentDeck] = useState('Deck')
  const [cards, setCards] = useState({front: 'almond', back: 'almendra'});
  const handleChangeDeck = (e) => {
    setCurrentDeck(e.target.value)
    getCards();
  }

  const getCards = async () => {
    // fetch(`/get${{currentDeck}}`, {
    fetch('/spanish')
      .then((res) => res.json())
      .then((cards) => {
        console.log('front of first card:', cards[0].front)
        setCards({front: cards[0].front, back: cards[0].back});
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCards();
  }, [currentDeck]);




  return (
    <Container maxW='3xl'>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {currentDeck}
        </MenuButton>
        <MenuList>
          {hardcodedDecks.map((deck, i) =>
            <MenuItem key={i} onClick={handleChangeDeck} onChange={getCards} value={deck}>{deck}</MenuItem>
          )}
        </MenuList>
      </Menu>
      <Text>Your current deck is {currentDeck}</Text>
      <Button onClick={getCards} bgColor="pink1" color="white">Get Cards</Button>
      <Container  m={5} >
        {/* <List> */}
          {/* <Text>{cards[0].front}</Text> */}
          <Text fontSize='4xl' color="yellow1">{cards.front}</Text>
          </Container>
          <Container m={5} >
          <Text fontSize='4xl' color="pink2">{cards.back}</Text>
          {/* {cards.map((card, i) =>
            <ListItem key={i}>{card}</ListItem>
          )} */}
        {/* </List> */}
      </Container>
      </Container>
  )
}

export default DeckMenu
