import { React } from "react";
import { Container, Text, Flex, Button, Image } from "@chakra-ui/react";
import { PlusSquareIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard";
import { ChevronLeftIcon, ChevronRightIcon, ViewIcon } from "@chakra-ui/icons";

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
    }
  };
  const showBack = () => {
    if (!isShowingBack) setIsShowingBack(true);
  };
  const getNext = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      setIsShowingBack(false);
    }
  };

  return (
    <Flex direction="column">
      {/* Front of card */}
      <Container
        mt={10}
        mb={7}
        minH="240px"
        borderRadius={6}
        boxShadow="3px 3px 5px 1px #ccc"
      >
        <Flex direction="column" justify="center" align="center" mt={10}>
          <Image
            src={cards[index].vocabImg}
            alt={cards[index].alt}
            maxH="150px"
            maxW="100%"
          />

          {cards.length ? (
            <Text fontSize="3xl" color="primary" align="center" p={8}>
              {cards[index].sentence_with_blanks}
            </Text>
          ) : (
            <Text fontSize="2xl" align="center" p={12}>
              Select a deck or add cards to the current deck.
            </Text>
            // <Text fontSize="2xl" align="center" p={12}>
            //   This deck is empty. Click the plus icon below to add cards to this
            //   deck.{" "}
            // </Text>
          )}
          {/* Back of card */}
          {isShowingBack && (
            <Text fontSize="3xl" color="primary" p={8}>
              {cards[index].back}
            </Text>
          )}
        </Flex>
      </Container>
      <Text fontSize="lg" mb={1} color="primary">
        {index + 1}/{cards.length}
      </Text>
      {addingCard && (
        <AddCard
          onClick={handleAddCard}
          setAddingCard={setAddingCard}
          addingCard={addingCard}
          currentDeck={currentDeck}
          getCards={getCards}
        />
      )}
      {/* TODO: hide edit button if locked; render if not locked */}
      {editingCard && !currentCard.locked && (
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
        />
      )}

      {/* Icons Container   */}
      <Flex justify="center" gridGap={4} p={4}>
        <PlusSquareIcon
          w={5}
          h={5}
          color="gray"
          onClick={handleAddCard}
          sx={{ cursor: "pointer" }}
        />
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

      <Flex justify="center" gridGap={3} mb={20}>
        <Button
          onClick={getPrevious}
          color={index > 0 ? "white" : "gray.300"}
          bgColor={index > 0 ? "primary" : ""}
          _hover={{ color: "black", bgColor: "gray.200" }}
        >
          <ChevronLeftIcon mr={2} />
          Previous
        </Button>
        <Button
          onClick={showBack}
          bgColor="secondary"
          color="white"
          _hover={{ color: "black", bgColor: "gray.200" }}
          aria-describedby="Show Back"
        >
          <ViewIcon mr={2} />
          {isShowingBack ? "Hide" : "Show"}
        </Button>
        <Button
          onClick={getNext}
          // bgColor="primary"
          color={index < cards.length - 1 ? "white" : "gray.300"}
          bgColor={index < cards.length - 1 ? "primary" : ""}
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
