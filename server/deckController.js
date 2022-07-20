const db = require('./FlashcardModel.js');

const deckController = {};

// get a list of all the decks (tables) in the database to use for the drop down menu
deckController.getDecks = (req, res, next) => {

  const queryString = `SELECT * FROM information_schema.tables WHERE table_schema = 'public'  AND table_name != 'pg_stat_statements';`;

  db.query(queryString)
    .then((data) => {
      res.locals.decks = data.rows;
      return next();
    })
    .catch((err) => next({
      log: `Error in deckController.getDecks: ${err}`,
      message: { err: 'Error getting decks' }
    }));
}

// add a deck to the database
deckController.addDeck = (req, res, next) => {
  const { deckName } = req.params;
  // TODO: need to figure out how to account for decks with titles longer than one word
  // const queryString = `CREATE TABLE '${deckName}' (
  const queryString = `CREATE TABLE ${deckName} (
    CardId serial NOT NULL PRIMARY KEY,
    Front varchar(255),
    Back varchar(255)
);`;

  db.query(queryString)
    .then((data) => {
      res.locals.added = `You have successfully added ${deckName}`;
      return next();
    })
    .catch((err) => next({
      log: `Error in deckController.addDeck: ${err}`,
      message: { err: 'Error adding deck' }
    }));
}

// delete a deck fron the database
deckController.deleteDeck = (req, res, next) => {
  const { currentDeck } = req.params;
  const queryString = `DROP TABLE ${currentDeck};`;

  db.query(queryString)
    .then((data) => {
      res.locals.deleted = `You have successfully deleted ${currentDeck}`;
      return next();
    })
    .catch((err) => next({
      log: `Error in deckController.deleteDeck: ${err}`,
      message: { err: 'Error deleting deck' }
    }));
}

module.exports = deckController;