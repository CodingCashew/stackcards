import { React, useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import "./DeckMenu";

function AddDeck({ setDecks, decks, setAddingDeck, getDecks }) {
  // stores the current user input for new deck name
  const [deckName, setDeckName] = useState("");
  const handleSetDeckName = (e) => setDeckName(e.target.value);
  const handleCancel = () => {
    setAddingDeck(false);
  };

  // won't add the deck if the input form is empty
  const addDeck = async () => {
    if (deckName !== "") {
      fetch(`/addDeck/${deckName}`, { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
    setAddingDeck(false);
    // setCurrentDeck(**)
    getDecks();
  };

  return (
    <FormControl gridGap={4}>
      <FormLabel>Enter Deck Name:</FormLabel>
      <Input placeholder="Deck Name" onChange={handleSetDeckName} />
      <Button
        color="white"
        bgColor="primary"
        mt={5}
        type="submit"
        onClick={addDeck}
      >
        Add Deck
      </Button>
      <Button mt={5} ml={3} onClick={handleCancel}>
        Cancel
      </Button>
    </FormControl>
  );
}

export default AddDeck;
