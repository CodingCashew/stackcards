import { React } from "react";
import { Container, Text, Flex, Button, Image } from "@chakra-ui/react";
import { PlusSquareIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ViewIcon,
  ViewOffIcon,
  LockIcon,
} from "@chakra-ui/icons";

function CardContainer({
  cards,
  setAddingDeck,
  setDeletingDeck,
  addingCard,
  setAddingCard,
  editingCard,
  setEditingCard,
  currentDeck,
  index,
  setIndex,
  currentCard,
  setDeletingCard,
  deletingCard,
  getCards,
  isShowingBack,
  setIsShowingBack,
}) {
  // add a new card to the current deck in the database
  const handleAddCard = () => {
    if (addingCard) setAddingCard(false);
    else {
      setAddingCard(true);
      setAddingDeck(false);
      setDeletingDeck(false);
      setEditingCard(false);
      setDeletingCard(false);
    }
  };
  // edit the current card in the current deck
  const handleEditCard = () => {
    if (editingCard) setEditingCard(false);
    else {
      setEditingCard(true);
      setAddingDeck(false);
      setDeletingDeck(false);
      setAddingCard(false);
      setDeletingCard(false);
    }
  };
  // delete the current card in the current deck from the database
  const handleDeleteCard = () => {
    if (deletingCard) setDeletingCard(false);
    else {
      setDeletingCard(true);
      setAddingDeck(false);
      setDeletingDeck(false);
      setEditingCard(false);
      setAddingCard(false);
    }
  };

  // button functions to control where you are in the deck and show the back of the current card
  const getPrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
      setIsShowingBack(false);
      setEditingCard(false)
      setAddingCard(false)
      setDeletingCard(false)
      setAddingDeck(false)
      setDeletingDeck(false)
    }
  };
  const showBack = () => {
    setIsShowingBack(!isShowingBack);
  };
  const getNext = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      setIsShowingBack(false);
      setEditingCard(false)
      setAddingCard(false)
      setDeletingCard(false)
      setAddingDeck(false)
      setDeletingDeck(false)
    }
  };

  return (
    <Flex direction="column">
      {/* Front of card */}
      <Container
        mt={5}
        mb={4}
        minH="xs"
        borderRadius={6}
        boxShadow="3px 3px 5px 1px #ccc"
      >
        <Flex direction="column" justify="center" align="center" mt={10}>
          {/* {((cards[index].vocabImg !== undefined) && (cards[index].vocabImg !== "./dummyPath")) && <Image
            src={cards[index].vocabImg}
            alt={cards[index].alt}
            maxH="150px"
            maxW="100%"
          />} */}

          {cards.length > 0 && !isShowingBack && (
            <Text fontSize="3xl" color="primary" align="center" p={8}>
              {cards[index].sentence_with_blank}
            </Text>
          )}
          {cards.length <= 0 && currentDeck !== "Select a Deck" && (
            <Text fontSize="2xl" align="center" p={12}>
              This deck is empty. Click the plus icon below to add cards to this
              deck.
            </Text>
          )}
          {currentDeck === "Select a Deck" && (
            <Text fontSize="2xl" align="center" p={12}>
              Choose a deck from the menu.
            </Text>
          )}

          {/* Back of card */}
          {isShowingBack && (
            <Flex direction="column">
              <Text fontSize="3xl" color="secondaryDark" p={8}>
                {cards[index].word}
              </Text>
              <Text fontSize="3xl" color="secondaryDark" p={8}>
                {cards[index].sentence}
              </Text>
              <Text fontSize="3xl" color="secondaryDark" p={8}>
                {cards[index].infinitive}
              </Text>
              <Text fontSize="3xl" color="secondaryDark" p={8}>
                {cards[index].synonyms}
              </Text>
            </Flex>
          )}
        </Flex>
      </Container>

      {addingCard && (
        <AddCard
          onClick={handleAddCard}
          setAddingCard={setAddingCard}
          addingCard={addingCard}
          currentDeck={currentDeck}
          getCards={getCards}
        />
      )}
      {editingCard && (
        <EditCard
          onClick={handleEditCard}
          currentDeck={currentDeck}
          currentCard={currentCard}
          getCards={getCards}
          setEditingCard={setEditingCard}
        />
      )}
      {deletingCard && (
        <DeleteCard
          onClick={handleDeleteCard}
          setDeletingCard={setDeletingCard}
          getCards={getCards}
          currentDeck={currentDeck}
          currentCard={currentCard}
          index={index}
          setIndex={setIndex}
          deckLength={cards.length}
        />
      )}
      {cards.length > 0 && (
        <Text fontSize="lg" mb={1}  mt={3} color="primary">
          {index + 1}/{cards.length}
        </Text>
      )}
      {/* Icons Container   */}
      {currentDeck !== "Select a Deck" && (
        <Flex justify="center" gridGap={4} p={4}>
          <PlusSquareIcon
            w={5}
            h={5}
            color="gray"
            onClick={handleAddCard}
            sx={{ cursor: "pointer" }}
          />
          {cards[index] && cards[index].locked === false && (
            <Flex gap={4}>
              <EditIcon
                w={5}
                h={5}
                color="gray"
                onClick={handleEditCard}
                sx={{ cursor: "pointer" }}
              />
              <DeleteIcon
                w={5}
                h={5}
                color="gray"
                onClick={handleDeleteCard}
                sx={{ cursor: "pointer" }}
              />
            </Flex>
          )}
          {cards[index] && cards[index].locked === true && (
            <LockIcon w={5} h={5} color="gray" />
          )}
        </Flex>
      )}

      <Flex justify="center" gridGap={3} mb={20}>
        <Button
          onClick={getPrevious}
          disabled={!cards[index - 1]}
          color={index > 0 ? "white" : "gray.300"}
          bgColor="primary"
          _hover={{ color: "black", bgColor: "gray.200" }}
        >
          <ChevronLeftIcon mr={2} />
          Previous
        </Button>
        <Button
          onClick={showBack}
          bgColor="secondary"
          color="white"
          disabled={!cards[index]}
          _hover={{ color: "black", bgColor: "gray.200" }}
          aria-describedby="Show Back"
        >
          {isShowingBack ? <ViewOffIcon mr={2} /> : <ViewIcon mr={2} />}
          {isShowingBack ? "Hide" : "Show"}
        </Button>
        <Button
          onClick={getNext}
          // bgColor="primary"
          disabled={!cards[index + 1]}
          color={index < cards.length - 1 ? "white" : "gray.300"}
          bgColor="primary"
          _hover={{ color: "black", bgColor: "gray.200" }}
        >
          Next
          <ChevronRightIcon ml={2} />
        </Button>
      </Flex>
    </Flex>
  );
}

export default CardContainer;
