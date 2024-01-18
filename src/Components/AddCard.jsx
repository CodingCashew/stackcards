import { React, useState } from "react";
import { FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";
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

  const addCardToDb = async () => {
    if (values.sentence && values.sentence_with_blank && values.word) {
      console.log("adding card to database...");
      fetch(`/addCard/${currentDeck}`, {
        method: "POST",
        body: JSON.stringify({ values }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data in .then:", data);
          getCards();
          setAddingCard(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCancel = () => {
    setAddingCard(false);
  };

  return (
    <FormControl gridGap={4}>
      <Text color="primary">
        Add a Card to{" "}
        <strong>
          {prettyDeckLabels[currentDeck]
            ? prettyDeckLabels[currentDeck]
            : currentDeck}
        </strong>
      </Text>
      <Text>Any added cards are not locked, but could be modified or discarded in the future.</Text>
      {/* <FormLabel>Enter Sentence with Blank:</FormLabel> */}
      <Input
        placeholder="Enter a sentence with a blank (missing word)"
        name="sentence_with_blank"
        value={values.sentence_with_blank}
        onChange={handleChangeCardData}
        my={3}
        required
      />
      {/* <FormLabel>Enter the answer:</FormLabel> */}
      <Input
        placeholder="Answer (missing word)"
        name="word"
        value={values.word}
        onChange={handleChangeCardData}
        my={3}
        required
      />
      {/* <FormLabel>Enter the Full Sentence:</FormLabel> */}
      <Input
        placeholder="Full Sentence"
        name="sentence"
        value={values.sentence}
        onChange={handleChangeCardData}
        my={3}
        required
      />
      {/* <FormLabel>Enter the Infinitive:</FormLabel> */}
      <Input
        placeholder="Infinitive"
        name="infinitive"
        value={values.infinitive}
        onChange={handleChangeCardData}
        my={3}
      />
      {/* <FormLabel>Enter the Definition:</FormLabel> */}
      <Input
        placeholder="Definition"
        name="definition"
        value={values.definition}
        onChange={handleChangeCardData}
        my={3}
      />
      {/* <FormLabel>Enter synonym(s):</FormLabel> */}
      <Input
        placeholder="Synonyms"
        name="synonyms"
        value={values.synonyms}
        onChange={handleChangeCardData}
        my={3}
      />
      <Button color="white" bgColor="primary" mt={5} onClick={addCardToDb}>
        Add Card
      </Button>
      <Button mt={5} ml={2} onClick={handleCancel}>
        Cancel
      </Button>
    </FormControl>
  );
}

export default AddCard;
