const db = require('./FlashcardModel.js');

const flashcardController = {};

// send all coffees in the database to the Shop Page Component on page render
flashcardController.getSpanish = (req, res, next) => {
  const queryString = 'SELECT * FROM Spanish;';

  db.query(queryString)
    .then((data) => {
      res.locals.cards = data.rows;
      return next();
    })
    .catch((err) => next({
      log: `Error in coffeeController.getSpanish: ${err}`,
      message: { err: 'Error getting Spanish cards' }
    }));
}

module.exports = flashcardController;