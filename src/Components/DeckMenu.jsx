import { React, useState, useEffect } from 'react';
import AddDeck from './AddDeck'
import DeleteDeck from './DeleteDeck'
import { Container, Text } from '@chakra-ui/react';
import { ChevronDownIcon, PlusSquareIcon, EditIcon, DeleteIcon,  } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuList, MenuItem, Button, Flex, Input } from '@chakra-ui/react'

const hardcodedDecks = ['Spanish', 'Chinese', 'Arabic', 'French', 'Persian', 'Swedish', 'Turkish']


function DeckMenu() {
  const [myDecks, setMyDecks] = useState(hardcodedDecks)
  const [currentDeck, setCurrentDeck] = useState(myDecks[0])
  const [cards, setCards] = useState([{front: 'almond', back: 'almendra'}]);
  const [isShowingBack, setIsShowingBack] = useState(false)
  const [index, setIndex] = useState(0);
  const [addDeck, setAddDeck] = useState(false)
  const [deleteDeck, setDeleteDeck] = useState(false)

  // when the user clicks on a deck in the deck menu, assign it to be the "current deck" value
  const handleChangeDeck = (e) => {
    setCurrentDeck(e.target.value)
  }

  // whenever the currentDeck updates, call "getCards"
  useEffect(() => {
    getCards();
  }, [currentDeck]);

  // make fetch request to backend to retrieve the selected deck from the database
  const getCards = async () => {
    fetch(`/getCards/${currentDeck}`)
      .then((res) => res.json())
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
    };


  // button functions to control where you are in the deck and show the back of the current card
  const getPrevious = () => {
    if (index > 0) {
      setIndex(index - 1)
      setIsShowingBack(false)
    }
  }
  const showBack = () => {
    if (!isShowingBack) setIsShowingBack(true)
  }
  const getNext = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1)
      setIsShowingBack(false)
    }
  }


  // add a new deck to the database
  const handleAddDeck = () => {
    
    console.log(myDecks)
    addDeck ? setAddDeck(false) : setAddDeck(true)
  }
  // delete the current deck in the database
  const handleDeleteDeck = () => {
    deleteDeck ? setDeleteDeck(false) : setDeleteDeck(true)
  }

  

  return (
    <Container maxW='3xl' >

      {/* Menu bar to change decks and deck icons */}
      <Flex justify="center" gridGap={4} p={4} align="center" >
        <Menu >
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {currentDeck}
          </MenuButton>
          <MenuList>
            {myDecks.map((deck, i) =>
              <MenuItem key={i} onClick={handleChangeDeck} value={deck}>{deck}</MenuItem>
            )}
          </MenuList>
        </Menu>
        {/* Add and delete deck buttons */}
        <PlusSquareIcon w={5} h={5} color="gray" onClick={handleAddDeck}  />
        <DeleteIcon w={5} h={5} color="gray" onClick={handleDeleteDeck} />
      </Flex>
      {/* Container that pops out when adding or deleting deck, or adding/deleting/editing cards */}
      {/* <Flex justify="center" gridGap={4} p={4}> */}

      {addDeck && <AddDeck />}
      {deleteDeck && <DeleteDeck currentDeck={currentDeck} setDeleteDeck={setDeleteDeck} deleteDeck={deleteDeck} />}
        {/* <form gridGap={4}>
            <Text>Enter Deck Name: </Text>
            <Input placeholder='Basic usage' />
            <Button color="white" bgColor="yellow2">Add Deck</Button>
        </form>
      </Flex> */}

      {/* Front of card */}
      <Container  m={10} minH='240px' borderRadius={6} boxShadow='3px 3px 5px 1px #ccc' >
        <Text fontSize='3xl' color="yellow1" align="center" p={8}>{cards[index].front}</Text>
      {/* Back of card */}
        {isShowingBack && <Text fontSize='3xl' color="pink2" p={8}>{cards[index].back}</Text>}
      </Container >

      {/* Icons Container   */}
      <Flex justify="center" gridGap={4} p={4}>
        <PlusSquareIcon w={5} h={5} color="gray" />
        <EditIcon w={5} h={5} color="gray" />
        <DeleteIcon w={5} h={5} color="gray" />
      </Flex>

      {/* Control Buttons Container */}
      <Flex justify="center" gridGap={3}>
        <Button onClick={getPrevious} bgColor="pink1" color="white">Previous</Button>
        <Button onClick={showBack} bgColor="yellow1" color="white">Show Back</Button>
        <Button onClick={getNext} bgColor="pink1" color="white">Next</Button>
      </Flex>
    </Container>
  )
}

export default DeckMenu
