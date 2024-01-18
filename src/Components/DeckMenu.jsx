import { React, useState, useEffect } from "react";

import AddDeck from "./AddDeck";
import DeleteDeck from "./DeleteDeck";
import CardContainer from "./CardContainer";

// import setIsShowingBack from './CardContainer';

import { ChevronDownIcon, PlusSquareIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
} from "@chakra-ui/react";

const initialDeck = ["Select a Deck"];

let vocab = {
  cards: [
    {
      word: "put together",
      definition: "put together",
      synonyms: "put together",
      sentence_with_blank: "integrate",
      sentence: "We need to integrate the new feature into   the program.",
      vocabImg: "/vocab/anja-bauermann-VnIgQz6UqoE-unsplash.jpg",
      audioPath: "/dummy-audio.mp3",
      locked: false,
    },
  ],
};

export const prettyDeckLabels = {
  verbs_present: "Present Tense Verbs",
  verbs_future: "Future Tense Verbs",
  verbs_past: "Past Tense Verbs",
};

function DeckMenu() {
  // list of decks in the database
  const [decks, setDecks] = useState(initialDeck);
  // cards in the current deck
  const [cards, setCards] = useState(vocab);
  const [currentDeck, setCurrentDeck] = useState(decks[0]);

  // Which card is showing and whether the back is revealed.
  const [index, setIndex] = useState(0);
  const currentCard = cards[index];
  const [isShowingBack, setIsShowingBack] = useState(false);

  //  whether the add or delete decks are popped out
  const [addingDeck, setAddingDeck] = useState(false);
  const [deletingDeck, setDeletingDeck] = useState(false);

  // whether the add/edit/delete fields are popped out
  const [addingCard, setAddingCard] = useState(false);
  const [editingCard, setEditingCard] = useState(false);
  const [deletingCard, setDeletingCard] = useState(false);

  // re-render the decks in the drop down menu
  useEffect(() => {
    getDecks();
  }, [addingDeck, deletingDeck]);

  const getDecks = async () => {
    fetch("/getDecks")
      .then((res) => res.json())
      .then((data) => {
        const dataArray = getArrOfTableNames(data);
        cards && setDecks(dataArray);
      });
  };
  // formats the data that we get back from the database
  function getArrOfTableNames(arrayOfObjects) {
    return arrayOfObjects.reduce((acc, curr) => {
      // TODO: make title case
      acc.push(curr.table_name);
      return acc;
    }, []);
  }

  // when the user clicks on a deck in the deck menu, assign it to be the "current deck" value
  // it also hides the back of the card and closes the delete menu if it is open
  const handleChangeDeck = (e) => {
    setCurrentDeck(e.target.value);
    setIsShowingBack(false);
    setDeletingDeck(false);
  };

  // whenever the currentDeck updates, call "getCards"
  useEffect(() => {
    getCards();
  }, [currentDeck]);

  // make fetch request to backend to retrieve the selected deck from the database
  const getCards = async () => {
    if (currentDeck === "Select a Deck") return;
    fetch(`/getCards/${currentDeck}`)
      .then((res) => res.json())
      .then((cards) => {
        setCards(cards);
        console.log(cards);
      })
      .catch((err) => console.log(err));
  };

  // add a new deck to the database
  const handleAddDeck = () => {
    if (addingDeck) setAddingDeck(false);
    else {
      setAddingDeck(true);
      setDeletingDeck(false);
      setAddingCard(false);
      setEditingCard(false);
      setDeletingCard(false);
    }
  };

  // delete the current deck in the database
  const handleDeleteDeck = () => {
    if (deletingDeck) setDeletingDeck(false);
    else {
      setDeletingDeck(true);
      setAddingDeck(false);
      setAddingCard(false);
      setEditingCard(false);
      setDeletingCard(false);
    }
  };

  return (
    <Container maxW="3xl">
      {/* Menu bar to change decks and deck icons */}
      <Flex justify="center" gridGap={4} p={4} align="center">
        <Menu>
          <MenuButton
            as={Button}
            id="menuButton"
            rightIcon={<ChevronDownIcon />}
          >
            {prettyDeckLabels[currentDeck]
              ? prettyDeckLabels[currentDeck]
              : currentDeck}
          </MenuButton>
          <MenuList>
            {decks.map((deck, i) => (
              <MenuItem key={i} onClick={handleChangeDeck} value={deck}>
                {prettyDeckLabels[deck] ? prettyDeckLabels[deck] : deck}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        {/* Add and delete deck buttons */}
        <Flex gap={3}>
          <PlusSquareIcon
            w={5}
            h={5}
            color="gray"
            onClick={handleAddDeck}
            sx={{ cursor: "pointer" }}
          />
          {!prettyDeckLabels[currentDeck] && (
            <DeleteIcon
              w={5}
              h={5}
              color="gray"
              onClick={handleDeleteDeck}
              sx={{ cursor: "pointer" }}
            />
          )}
        </Flex>
      </Flex>

      {/* Container that pops out when adding or deleting deck, or adding/deleting/editing cards */}
      {addingDeck && (
        <AddDeck setAddingDeck={setAddingDeck} getDecks={getDecks} />
      )}
      {deletingDeck && (
        <DeleteDeck
          currentDeck={currentDeck}
          setCurrentDeck={setCurrentDeck}
          setDeletingDeck={setDeletingDeck}
          deletingDeck={deletingDeck}
          getDecks={getDecks}
          decks={decks}
        />
      )}

      {/* Card Container: Front and back of card, along with the three icons below the card */}
      <CardContainer
        cards={cards}
        setAddingDeck={setAddingDeck}
        setDeletingDeck={setDeletingDeck}
        currentDeck={currentDeck}
        setAddingCard={setAddingCard}
        addingCard={addingCard}
        index={index}
        setIndex={setIndex}
        currentCard={currentCard}
        setDeletingCard={setDeletingCard}
        deletingCard={deletingCard}
        getCards={getCards}
        isShowingBack={isShowingBack}
        setIsShowingBack={setIsShowingBack}
      />
    </Container>
  );
}

export default DeckMenu;
