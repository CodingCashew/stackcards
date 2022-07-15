import { React, useState, useEffect } from 'react';
import { Container, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex
} from '@chakra-ui/react'

const hardcodedDecks = ['Spanish', 'Chinese', 'Arabic', 'French', 'Persian', 'Swedish', 'Turkish']


function DeckMenu() {
  const [currentDeck, setCurrentDeck] = useState(hardcodedDecks[0])
  const [cards, setCards] = useState([{front: 'almond', back: 'almendra'}]);
  const [isShowingBack, setIsShowingBack] = useState(false)
  const [index, setIndex] = useState(0);

  // when the user clicks on a deck in the deck menu
  const handleChangeDeck = (e) => {
    setCurrentDeck(e.target.value)
    console.log('current deck in handleChangeDeck:', e.target.value)
  }

  const getCards = async () => {
    fetch(`/getCards/${currentDeck}`)
      .then((res) => res.json())
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
    };

  useEffect(() => {
    getCards();
  }, [currentDeck]);


  // button functions to control where you are in the deck and show the back of the current card
  const getPrevious= () => {
    console.log('getting previous...')
    if (index > 0) {
      setIndex(index - 1)
      setIsShowingBack(false)
    }
  }

  const showBack = () => {
    console.log('showing back...')
    if (!isShowingBack) setIsShowingBack(true)
  }

  const getNext= () => {
    console.log('getting next...')
    if (index < cards.length - 1) {
      setIndex(index + 1)
      setIsShowingBack(false)
    }
  }

  return (
    <Container maxW='3xl'>

      {/* Menu bar to change decks */}
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {currentDeck}
        </MenuButton>
        <MenuList>
          {hardcodedDecks.map((deck, i) =>
            <MenuItem key={i} onClick={handleChangeDeck} value={deck}>{deck}</MenuItem>
          )}
        </MenuList>
      </Menu>

      {/* Front of card */}
      <Container  m={10} minH='40px'>
        <Text fontSize='3xl' color="yellow1">{cards[index].front}</Text>
        Index: {index}
      </Container>
      {/* Back of card */}
      <Container m={10} minH='40px'>
        {isShowingBack && <Text fontSize='3xl' color="pink2">{cards[index].back}</Text>}
      </Container >


        {/* Buttons Container */}
        <Flex justify="center" gridGap={3}>
          <Button onClick={getPrevious} bgColor="pink1" color="white">Previous</Button>
          <Button onClick={showBack} bgColor="yellow1" color="white">Show Back</Button>
          <Button onClick={getNext} bgColor="pink1" color="white">Next</Button>
        </Flex>
      </Container>
  )
}

export default DeckMenu
