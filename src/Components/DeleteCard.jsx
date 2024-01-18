import { React } from "react";
import { Text, Container, Button } from "@chakra-ui/react";
import "./CardContainer";
import "./DeckMenu";

function DeleteCard({
  setAddingCard,
  handleAddCard,
  currentCard,
  currentDeck,
  setDeletingCard,
  getCards,
}) {
  const cardid = currentCard.cardid;
  const handleCancel = () => {
    setDeletingCard(false);
  };

  const deleteCardFromDb = async () => {
    fetch(`/deleteCard/${currentDeck}`, {
      method: "DELETE",
      body: JSON.stringify({ cardid }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
        getCards();
      })
      .catch((err) => console.log(err));
    setDeletingCard(false);
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
