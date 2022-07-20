const db = require('./FlashcardModel.js');

const flashcardController = {};

// get a list of all the decks (tables) in the database to use for the drop down menu
// flashcardController.getDecks = (req, res, next) => {

//   const queryString = `SELECT * FROM information_schema.tables WHERE table_schema = 'public'  AND table_name != 'pg_stat_statements';`;

//   db.query(queryString)
//     .then((data) => {
//       res.locals.decks = data.rows;
//       return next();
//     })
//     .catch((err) => next({
//       log: `Error in flashcardController.getDecks: ${err}`,
//       message: { err: 'Error getting decks' }
//     }));
// }

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
  const { front, back } = req.params.message;
  const params = [front, back]
  // TODO: need to figure out how to account for decks with titles longer than one word
  // const queryString = `CREATE TABLE '${deckName}' (
  const queryString = `INSERT INTO ${currentDeck} (front, back) VALUES ($1, $2);`;

  db.query(queryString, params)
    .then((data) => {
      res.locals.added = `You have successfully added a new card to ${currentDeck}`;
      return next();
    })
    .catch((err) => next({
      log: `Error in flashcardController.addCard: ${err}`,
      message: { err: 'Error adding flashcard' }
    }));
}

module.exports = flashcardController;