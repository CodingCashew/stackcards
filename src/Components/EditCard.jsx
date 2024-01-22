import { React, useState, useEffect } from "react";
import { FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";
import "./CardContainer";
import "./DeckMenu";
import { prettyDeckLabels } from "./DeckMenu";

export default function EditCard({
  setEditingCard,
  currentDeck,
  currentCard,
  getCards,
}) {
  const id = currentCard.id;
  const [values, setValues] = useState({
    sentence_with_blank: "",
    sentence: "",
    synonyms: "",
    infinitive: "",
    word: "",
    definition: "",
    locked: false,
    id: id,
  });

  useEffect(() => {
    setValues(currentCard);
  }, [currentCard]);

  const handleChangeCardData = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const editCardInDb = async () => {
    console.log(currentDeck);
    if (values.sentence && values.sentence_with_blank && values.word) {
      console.log("values:", values);
      fetch(`/editCard/${currentDeck}`, {
        method: "PUT",
        body: JSON.stringify({ values }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          getCards();
          setEditingCard(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCancel = () => {
    setEditingCard(false);
  };

  return (
    <FormControl gridGap={4} mt={3}>
      <Text color="primary">
        Edit current card in deck:{" "}
        <strong>
          {prettyDeckLabels[currentDeck]
            ? prettyDeckLabels[currentDeck]
            : currentDeck}
        </strong>
      </Text>
      <Text>
        Any edits are not permanent, but could be modified or discarded in the
        future.
      </Text>
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
      <Button color="white" bgColor="primary" mt={5} onClick={editCardInDb}>
        Submit Changes
      </Button>
      <Button mt={5} ml={2} onClick={handleCancel}>
        Cancel
      </Button>
    </FormControl>
  );
}
