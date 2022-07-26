const db = require('./FlashcardModel.js');

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
    .catch((err) => next({
      log: `Error in flashcardController.getCards: ${err}`,
      message: { err: 'Error getting Cards' }
    }));
}

// add a card to the current deck in the database
flashcardController.addCard = (req, res, next) => {
  const { currentDeck } = req.params;
  const { front, back } = req.body.values;
  const params = [front, back]
  // TODO: need to figure out how to account for decks with titles longer than one word
  // const queryString = `CREATE TABLE '${deckName}' (
  const queryString = `INSERT INTO ${currentDeck} (front, back) VALUES ($1, $2);`;

  db.query(queryString, params)
  .then((data) => {
    res.locals.added = `You have successfully added front: ${front} and back: ${back} to ${currentDeck}`;
    return next();
  })
  .catch((err) => next({
    log: `Error in flashcardController.addCard: ${err}`,
    message: { err: 'Error adding flashcard' }
  }));
}

flashcardController.deleteCard = (req, res, next) => {
  const { currentDeck } = req.params;
  const { cardid } = req.body;
  const queryString = `DELETE FROM ${currentDeck} where cardid = ${cardid};`;
  db.query(queryString)
    .then((data) => {
      res.locals.deleted = `You have successfully deleted card id: "${cardid}" from ${currentDeck}.`;
      return next();
    })
    .catch((err) => next({
      log: `Error in deckController.deleteCard: ${err}`,
      message: { err: 'Error deleting card' }
    }));
}

module.exports = flashcardController;