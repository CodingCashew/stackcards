import { React } from "react";
import { Text, Container, Button, useToast } from "@chakra-ui/react";
import "./CardContainer";
import "./DeckMenu";

function DeleteCard({
  setAddingCard,
  handleAddCard,
  currentCard,
  currentDeck,
  setDeletingCard,
  getCards,
  index,
  setIndex,
  deckLength,
}) {
  const id = currentCard.id;
  const handleCancel = () => {
    setDeletingCard(false);
  };

  const toast = useToast();

  const deleteCardFromDb = async () => {
    fetch(`/deleteCard/${currentDeck}`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // if delete last card, update index to be new last card in deck
        if (index === deckLength - 1 && index > 0) {
          setIndex(index - 1);
        }
        getCards();
        setDeletingCard(false);
        toast({
          title: "Success",
          description: `You have successfully deleted card from deck: ${currentDeck}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: "An error occurred.",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      });
  };

  return (
    <Container>
      <Text fontSize="xl">Are you want to DELETE the current card? </Text>
      <Text fontSize="lg">This action cannot be undone.</Text>
      <Button mt={5} onClick={handleCancel}>
        Cancel
      </Button>
      <Button
        bgColor="secondary"
        color="white"
        _hover={{ color: "black", bgColor: "gray.200" }}
        mt={5}
        ml={3}
        onClick={deleteCardFromDb}
      >
        Yes, DELETE this card.
      </Button>
    </Container>
  );
}

export default DeleteCard;
