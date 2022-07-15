import { React, useState } from 'react';
import { Container, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react'

const hardcodedDecks = ['Spanish', 'Chinese', 'Arabic', 'French', 'Persian', 'Swedish', 'Turkish']


function DeckMenu() {
  const [currentDeck, setCurrentDeck] = useState('Deck')


  const handleChangeDeck = (e) => {
    setCurrentDeck(e.target.value)
  }

  return (
    <Container>
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
      <Text>Your current deck is {currentDeck}</Text>
      </Container>
  )
}

export default DeckMenu
