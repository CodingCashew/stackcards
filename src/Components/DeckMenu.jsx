import { React, useState, useEffect } from 'react';
import AddDeck from './AddDeck';
import DeleteDeck from './DeleteDeck';
import setAddCard from './AddCard';
// import EditCard from './EditCard';
// import DeleteCard from './DeleteCard';
import CardContainer from './CardContainer';
import { ChevronDownIcon, PlusSquareIcon, DeleteIcon } from '@chakra-ui/icons'
import { Container, Menu, MenuButton, MenuList, MenuItem, Button, Flex } from '@chakra-ui/react';

const hardcodedDecks = ['Spanish', 'Chinese', 'Arabic', 'French', 'Persian', 'Swedish', 'Turkish']


function DeckMenu(props) {
  // list of decks in the database and the list above is a fallback
  const [decks, setDecks] = useState(hardcodedDecks)
  const [cards, setCards] = useState([{front: 'almond', back: 'almendra'}]);
  const [currentDeck, setCurrentDeck] = useState(decks[0])
  // These keep track of whether the add or delete decks are popped out
  const [addingDeck, setAddingDeck] = useState(false)
  const [deletingDeck, setDeletingDeck] = useState(false)
  
  const [isShowingBack, setIsShowingBack] = useState(false)
  // This controls which card is showing.
  const [index, setIndex] = useState(0);
  const currentCard = currentDeck[index]

  // These control if the add, edit, or delete card components are popped out; default is not showing.
  // const [addCard, setAddCard] = useState(false)
  // const [editCard, setEditCard] = useState(false)
  // const [deleteCard, setDeleteCard] = useState(false)

  // re-render the decks in the drop down menu
  useEffect(() => {
    getDecks();
  }, [addingDeck, deletingDeck]);
  // }, [addingDeck, DeleteDonClick={handleAddCard}eck]);

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
    setDeletingDeck(false);
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
    if (addingDeck) setAddingDeck(false)
    else {
      setAddingDeck(true)
      setDeletingDeck(false)
      setAddCard(false)
      // setEditCard(false)
      // setDeleteCard(false)
    }
  }

  // delete the current deck in the database
  const handleDeleteDeck = () => {
    if (deletingDeck) setDeletingDeck(false)
    else {
      setDeletingDeck(true)
      setAddingDeck(false)
      setAddCard(false)
      // setEditCard(false)
      // setDeleteCard(false)
    }
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
        <PlusSquareIcon w={5} h={5} color="gray" onClick={handleAddDeck} sx={{ cursor: "pointer" }} />
        <DeleteIcon w={5} h={5} color="gray" onClick={handleDeleteDeck} sx={{ cursor: "pointer" }}/>
      </Flex>

      {/* Container that pops out when adding or deleting deck, or adding/deleting/editing cards */}
      {addingDeck && <AddDeck setAddingDeck={setAddingDeck} />}
      {deletingDeck && <DeleteDeck currentDeck={currentDeck} setDeletingDeck={setDeletingDeck} deletingDeck={deletingDeck} getDecks={getDecks} />}

      {/* Card Container: Front and back of card, along with the three icons below the card */}
      <CardContainer cards={cards} currentCard={currentCard} index={index} isShowingBack={isShowingBack}  />

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
