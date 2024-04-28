import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import "./DeckMenu";

function AddDeck({ setDecks, decks, setAddingDeck, getDecks, setCurrentDeck }) {
  const [deckName, setDeckName] = useState("");
  const handleSetDeckName = (e) => {
    setDeckName(e.target.value);
  };
  const handleCancel = () => {
    setAddingDeck(false);
  };

  const toast = useToast();

  // const validPattern = /^\w\s/;

  // const hasPatternError = !validPattern.test(deckName) && deckName !== "";

  const addDeck = async () => {
    if (deckName !== "") {
      fetch(`/addDeck/${deckName}`, { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          setAddingDeck(false);
          getDecks();
          setCurrentDeck(deckName);
          toast({
            title: "Success",
            description: `You have successfully added a new deck: ${deckName}`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: "Error",
            description:
              "An error occurred. Please make sure all required fields have valid inputs.",
            status: "error",
            duration: 6000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <form>
      <FormControl gridGap={4} isRequired>
        <FormLabel>Enter Deck Name:</FormLabel>
        <Input
          placeholder="Deck Name"
          pattern="([^\s][A-z0-9À-ž\s]+)"
          onChange={handleSetDeckName}
          required={true}
        />
        {!deckName.length && (
          <FormErrorMessage>Deck name is required.</FormErrorMessage>
        )}
        <Button color="white" bgColor="primary" mt={5} onClick={addDeck}>
          Add Deck
        </Button>
        <Button mt={5} ml={3} onClick={handleCancel}>
          Cancel
        </Button>
      </FormControl>
    </form>
  );
}

export default AddDeck;
