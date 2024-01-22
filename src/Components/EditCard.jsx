import { React, useState, useEffect } from "react";
import {
  FormControl,
  Input,
  Button,
  Text,
  useToast,
  FormLabel,
  Flex,
  FormErrorMessage
} from "@chakra-ui/react";
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

  const toast = useToast();

  const editCardInDb = async () => {
    console.log(values);
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
        .catch((err) => {
          console.log(err);
          toast({
            title: "Error",
            description:
              "An error occurred. Please make sure all required fields have valid inputs.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  const handleCancel = () => {
    setEditingCard(false);
  };

  return (
    <Flex mt={3} direction="column">
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
      <FormControl isInvalid={!values.sentence_with_blank}>
        <FormLabel mt={5}>Enter a sentence with blanks:</FormLabel>
        <Input
          placeholder="Enter a sentence with a blank (missing word)"
          name="sentence_with_blank"
          value={values.sentence_with_blank}
          onChange={handleChangeCardData}
          isRequired={true}
        />
        {!values.sentence_with_blank && (
          <FormErrorMessage>Sentence with blank is required.</FormErrorMessage>
        )}
        </FormControl>
        <FormControl  isInvalid={!values.word}>
        <FormLabel mt={5}>Enter the answer:</FormLabel>
        <Input
          placeholder="Answer (missing word)"
          name="word"
          value={values.word}
          onChange={handleChangeCardData}
          isRequired={true}
        />
        {!values.word && (
          <FormErrorMessage>Answer is required.</FormErrorMessage>
        )}
        </FormControl>
        <FormControl  isInvalid={!values.sentence}>
        <FormLabel mt={5}>Enter the Full Sentence:</FormLabel>
        <Input
          errorBorderColor="crimson"
          placeholder="Full Sentence"
          name="sentence"
          value={values.sentence}
          onChange={handleChangeCardData}
          isRequired={true}
        />
        {!values.sentence && (
          <FormErrorMessage>Full sentence is required.</FormErrorMessage>
        )}
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
      {/* </FormControl> */}
      <Flex justify="center">
        <Button
          color="white"
          bgColor="primary"
          
          mt={5}
          onClick={editCardInDb}
        >
          Submit Changes
        </Button>
        <Button mt={5} ml={2} onClick={handleCancel}>
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
}
