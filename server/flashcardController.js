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
      log: `Error in coffeeController.getCards: ${err}`,
      message: { err: 'Error getting Cards' }
    }));
}











// flashcardController.postCard: (req, res, next) => {
//   const { message, password } = req.body;
//   const query = 'INSERT INTO Message (message, password) VALUES ($1, $2) RETURNING *;';
//   const params = [message, password];
//   // const { message } = req.body;
//   // const query = 'INSERT INTO Message (message) VALUES ($1) RETURNING *;';
//   // const params = [message];

//   try {
//     const response = await db.query(query, params);
//     res.locals.newMessage = response.rows[0];
//     return next();
//   }
//   catch (error) {
//     return next({
//       log: 'Error in messageController.postMessage',
//       status: 500,
//       message: { err: `An error occured in messageController.postMessage ${error}` },
//     });
//   }
// },



module.exports = flashcardController;