import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import "./CardContainer";
import "./DeckMenu";
import { prettyDeckLabels } from "./DeckMenu";

function AddCard({ setAddingCard, currentDeck, getCards }) {
  const [values, setValues] = useState({
    sentence_with_blank: "",
    sentence: "",
    synonyms: "",
    infinitive: "",
    word: "",
    definition: "",
    locked: false,
  });
  const handleChangeCardData = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const toast = useToast();

  const addCardToDb = async () => {
    if (values.sentence && values.sentence_with_blank && values.word) {
      fetch(`/addCard/${currentDeck}`, {
        method: "POST",
        body: JSON.stringify({ values }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          getCards();
          setAddingCard(false);
          toast({
            title: "Success",
            description: `You have successfully added a new card to deck: ${currentDeck}`,
            status: "success",
            duration: 1500,
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

  const handleCancel = () => {
    setAddingCard(false);
  };

  return (
    <Flex direction="column">
      <form>
        <Flex align="center" justify="center" gap={2}>
        <Text color="primary">
          Add a Card to deck:{" "}
          <strong>
            {prettyDeckLabels[currentDeck]
              ? prettyDeckLabels[currentDeck]
              : currentDeck}
          </strong>
        </Text>
        <Button variant="ghost" color="gray" ml={5} onClick={handleCancel}>
            Cancel
          </Button>
          </Flex>
        <Text>
          Any added cards are not permanent, but could be modified or discarded
          in the future.
        </Text>
        <FormControl isRequired>
          <FormLabel mt={5}>Enter a sentence with blanks:</FormLabel>
          <Input
            errorBorderColor="crimson"
            placeholder="Enter a sentence with a blank (missing word)"
            name="sentence_with_blank"
            value={values.sentence_with_blank}
            onChange={handleChangeCardData}
            isRequired={true}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel mt={5}>Enter the answer:</FormLabel>
          <Input
            errorBorderColor="crimson"
            placeholder="Answer (missing word)"
            name="word"
            value={values.word}
            onChange={handleChangeCardData}
            isRequired={true}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel mt={5}>Enter the Full Sentence:</FormLabel>
          <Input
            errorBorderColor="crimson"
            placeholder="Full Sentence"
            name="sentence"
            value={values.sentence}
            onChange={handleChangeCardData}
            isRequired={true}
          />
        </FormControl>
        <FormLabel mt={5}>Enter the Infinitive:</FormLabel>
        <Input
          placeholder="Infinitive"
          name="infinitive"
          value={values.infinitive}
          onChange={handleChangeCardData}
        />
        <FormLabel mt={5}>Enter the Definition:</FormLabel>
        <Input
          placeholder="Definition"
          name="definition"
          value={values.definition}
          onChange={handleChangeCardData}
        />
        <FormLabel mt={5}>Enter synonym(s):</FormLabel>
        <Input
          placeholder="Synonyms"
          name="synonyms"
          value={values.synonyms}
          onChange={handleChangeCardData}
        />
        <Flex>
          <Button color="white" bgColor="primary" mt={5} onClick={addCardToDb}>
            Add Card
          </Button>
          <Button mt={5} ml={2} onClick={handleCancel}>
            Cancel
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

export default AddCard;
