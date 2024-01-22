import { React, useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import "./DeckMenu";

function AddDeck({ setDecks, decks, setAddingDeck, getDecks, setCurrentDeck }) {
  // stores the current user input for new deck name
  const [deckName, setDeckName] = useState("");
  const handleSetDeckName = (e) => setDeckName(e.target.value);
  const handleCancel = () => {
    setAddingDeck(false);
  };

  const validPattern = /^\w/

  const hasPatternError = !validPattern.test(deckName)

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
    setCurrentDeck(deckName)
    getDecks();
  };

  return (
    <form>
    <FormControl gridGap={4} isRequired isInvalid={hasPatternError}>
      <FormLabel>Enter Deck Name:</FormLabel>
      <Input placeholder="Deck Name" pattern="([^\s][A-z0-9À-ž\s]+)" onChange={handleSetDeckName} />
      <Button
        color="white"
        bgColor="primary"
        mt={5}
        type="submit"
        onClick={addDeck}
      >
        Add Deck
      </Button>
      <Button mt={5} ml={3} type="submit" onClick={handleCancel}>
        Cancel
      </Button>
    </FormControl>
    </form>
  );
}

export default AddDeck;
