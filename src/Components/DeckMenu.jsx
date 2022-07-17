import { React, useState, useEffect } from 'react';
import AddDeck from './AddDeck';
import DeleteDeck from './DeleteDeck';
import AddCard from './AddCard';
import EditCard from './EditCard';
import DeleteCard from './DeleteCard';
import CardContainer from './CardContainer';
import { ChevronDownIcon, PlusSquareIcon, DeleteIcon } from '@chakra-ui/icons'
import { Container, Menu, MenuButton, MenuList, MenuItem, Button, Flex } from '@chakra-ui/react';

const hardcodedDecks = ['Spanish', 'Chinese', 'Arabic', 'French', 'Persian', 'Swedish', 'Turkish']


function DeckMenu(props) {
  const [decks, setDecks] = useState(hardcodedDecks)
  const [currentDeck, setCurrentDeck] = useState(decks[0])
  // These keep track of whether the add or delete decks are popped out
  const [addDeck, setAddDeck] = useState(false)
  const [deleteDeck, setDeleteDeck] = useState(false)
  // Might not need this? It's a default card.
  const [cards, setCards] = useState([{front: 'almond', back: 'almendra'}]);
  const [isShowingBack, setIsShowingBack] = useState(false)
  // This controls which card is showing.
  const [index, setIndex] = useState(0);
  // These control if the add, edit, or delete card components are popped out; default is not showing.
  const [addCard, setAddCard] = useState(false)
  const [editCard, setEditCard] = useState(false)
  const [deleteCard, setDeleteCard] = useState(false)
  // reference for the current card
  // Wait, do I need this or can I just use cards[index]?
  const [currentCard, setCurrentCard] = useState(cards[index])

  // re-render the decks in the drop down menu
  useEffect(() => {
    getDecks();
  }, [addDeck, deleteDeck]);
  // }, [addDeck, DeleteDonClick={handleAddCard}eck]);

  const getDecks = async () => {
    fetch('/getDecks')
      .then((res) => res.json())
      .then((data) => {
        const dataArray = getArrOfTableNames(data)
        cards && setDecks(dataArray);
      })
  }

  function getArrOfTableNames(arrayOfObjects) {
    return arrayOfObjects.reduce((acc, curr) => {
      acc.push(curr.table_name)
      return acc;
    }, [])
  }

  // when the user clicks on a deck in the deck menu, assign it to be the "current deck" value
  // it also hides the back of the card and closes the delete menu if it is open
  const handleChangeDeck = (e) => {
    setCurrentDeck(e.target.value);
    setIsShowingBack(false);
    setDeleteDeck(false);
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

  // add a new deck to the database
  const handleAddDeck = () => {
    if (addDeck) setAddDeck(false)
    else {
      setAddDeck(true)
      setDeleteDeck(false)
    }
  }

  // delete the current deck in the database
  const handleDeleteDeck = () => {
    if (deleteDeck) setDeleteDeck(false)
    else {
      setDeleteDeck(true)
      setAddDeck(false)
    }
  }

  const handleAddCard = () => {
    console.log('adding card...')
  }

  const handleEditCard = () => {
    console.log('editing card...')
  }

  const handleDeleteCard = () => {
    console.log('deleting card...')
  }





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

  return (
    <Container maxW='3xl' >
      {/* Menu bar to change decks and deck icons */}
      <Flex justify="center" gridGap={4} p={4} align="center" >
        <Menu >
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {currentDeck}
          </MenuButton>
          <MenuList>
            {decks.map((deck, i) =>
              <MenuItem key={i} onClick={handleChangeDeck} value={deck}>{deck}</MenuItem>
            )}
          </MenuList>
        </Menu>
        {/* Add and delete deck buttons */}
        <PlusSquareIcon w={5} h={5} color="gray" onClick={handleAddDeck}  />
        <DeleteIcon w={5} h={5} color="gray" onClick={handleDeleteDeck} />
      </Flex>

      {/* Container that pops out when adding or deleting deck, or adding/deleting/editing cards */}
      {addDeck && <AddDeck setAddDeck={setAddDeck} />}
      {deleteDeck && <DeleteDeck currentDeck={currentDeck} setDeleteDeck={setDeleteDeck} deleteDeck={deleteDeck} getDecks={getDecks} />}

      {/* Card Container: Front and back of card, along with the three icons below the card */}
      <CardContainer cards={cards} index={index} isShowingBack={isShowingBack} />
      
      {addCard && <AddCard onClick={handleAddCard}/>}
      {editCard && <EditCard onClick={handleEditCard}/>}
      {deleteCard && <DeleteCard onClick={handleDeleteCard}/>}

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
