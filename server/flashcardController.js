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

// add a deck to the database
flashcardController.addDeck = (req, res, next) => {
  console.log('req.params:', req.params)
  const { deckName } = req.params;
  console.log('deckName:', deckName)
  const queryString = `CREATE TABLE ${deckName} (
    CardId serial NOT NULL PRIMARY KEY,
    Front varchar(255),
    Back varchar(255)
);`;

  db.query(queryString)
    .then((data) => {
      // need to doublecheck this because I'm not sure if adding a deck returns anything
      res.locals.added = data.rows[0];
      // res.locals.added = `You have added ${deckName}`;
      return next();
    })
    .catch((err) => next({
      log: `Error in flashcardController.addDeck: ${err}`,
      message: { err: 'Error adding deck' }
    }));
}

// delete a deck fron the database
flashcardController.deleteDeck = (req, res, next) => {
  const { currentDeck } = req.params;
  const queryString = `DROP TABLE ${currentDeck};`;

  db.query(queryString)
    .then((data) => {
      // need to doublecheck this because I'm not sure if deleting a deck returns anything
      res.locals.deleted = data.rows[0];
      // res.locals.deleted = `You have deleted ${deckName}`;
      return next();
    })
    .catch((err) => next({
      log: `Error in flashcardController.deleteDeck: ${err}`,
      message: { err: 'Error deleting deck' }
    }));
}



module.exports = flashcardController;