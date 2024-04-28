import { Button, Container, Text, useToast } from "@chakra-ui/react";
import "./DeckMenu";
import { prettyDeckLabels } from "./DeckMenu";

function DeleteDeck({
  currentDeck,
  setCurrentDeck,
  setDeletingDeck,
  getDecks,
  decks,
}) {
  const handleCancel = () => {
    setDeletingDeck(false);
  };

  const toast = useToast();

  const deleteDeck = async () => {
    fetch(`/deleteDeck/${currentDeck}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        getDecks();
        setDeletingDeck(false);
        setCurrentDeck(decks[0]);
        toast({
          title: "Success",
          description: `You have successfully deleted deck: ${currentDeck}`,
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
      <Text fontSize="xl">
        Are you absolutely sure you want to DELETE the{" "}
        <strong>
          {prettyDeckLabels[currentDeck]
            ? prettyDeckLabels[currentDeck]
            : currentDeck}
        </strong>{" "}
        deck and ALL the cards in it?{" "}
      </Text>
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
        onClick={deleteDeck}
      >
        Yes, DELETE this ENTIRE deck.
      </Button>
    </Container>
  );
}

export default DeleteDeck;
