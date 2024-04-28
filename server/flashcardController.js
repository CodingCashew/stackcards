const db = require("./FlashcardModel.js");

const flashcardController = {};

// send all cards of the specified deck from the database to the front end
flashcardController.getCards = (req, res, next) => {
  const { currentDeck } = req.params;
  const queryString = `SELECT * FROM ${currentDeck};`;

  db.query(queryString)
    .then((data) => {
      res.locals.cards = data.rows;
      return next();
    })
    .catch((err) =>
      next({
        log: `Error in flashcardController.getCards: ${err}`,
        message: { err: "Error getting Cards" },
      })
    );
};

// add a card to the current deck in the database
flashcardController.addCard = (req, res, next) => {
  const { currentDeck } = req.params;
  const {
    sentence,
    sentence_with_blank,
    word,
    infinitive,
    definition,
    synonyms,
    locked,
  } = req.body.values;
  const params = [
    sentence,
    sentence_with_blank,
    word,
    infinitive,
    definition,
    synonyms,
    locked,
  ];

  // TODO: format deck titles longer than one word

  const queryString = `INSERT INTO ${currentDeck} (sentence, sentence_with_blank, word, infinitive, definition, synonyms, locked) VALUES ($1, $2, $3, $4, $5, $6, $7);`;

  db.query(queryString, params)
    .then((data) => {
      res.locals.added = `You have successfully added a new card!`;
      // res.locals.added = `You have successfully added front: ${front} and back: ${back} to ${currentDeck}`;
      return next();
    })
    .catch((err) =>
      next({
        log: `Error in flashcardController.addCard: ${err}`,
        message: { err: "Error adding flashcard" },
      })
    );
};

flashcardController.deleteCard = (req, res, next) => {
  const { currentDeck } = req.params;
  const { id } = req.body;
  const queryString = `DELETE FROM ${currentDeck} where id = ${id};`;
  db.query(queryString)
    .then((data) => {
      res.locals.deleted = `You have successfully deleted card id: "${id}" from ${currentDeck}.`;
      return next();
    })
    .catch((err) =>
      next({
        log: `Error in deckController.deleteCard: ${err}`,
        message: { err: "Error deleting card" },
      })
    );
};

flashcardController.editCard = (req, res, next) => {
  const { currentDeck } = req.params;
  const {
    sentence,
    sentence_with_blank,
    word,
    infinitive,
    definition,
    synonyms,
    locked,
    id,
  } = req.body.values;

  const queryString = `UPDATE ${currentDeck} SET sentence = '${sentence}', sentence_with_blank = '${sentence_with_blank}', word = '${word}', infinitive = '${infinitive}', definition = '${definition}', synonyms = '${synonyms}', locked = '${locked}' WHERE id = ${id};`;
  db.query(queryString)
    .then((data) => {
      res.locals.edited = `You have successfully edited card id: "${id}" in ${currentDeck} to have values: '${sentence}', '${sentence_with_blank}', '${word}', '${infinitive}', '${definition}', '${synonyms}'.`;
      return next();
    })
    .catch((err) =>
      next({
        log: `Error in deckController.editCard: ${err}`,
        message: { err: "Error editing card" },
      })
    );
};

module.exports = flashcardController;
