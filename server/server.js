const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;
const flashcardController = require('./flashcardController');

// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static and html
app.use(express.static(path.resolve(__dirname, '../src/styles.css')));
app.use(express.static(path.resolve(__dirname, '../src/assets/')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
});

// middleware routes

// get all cards in selected deck
app.get('/getCards/:currentDeck', flashcardController.getCards, (req, res) => {
  return res.status(200).json(res.locals.cards);
});

app.post('/addDeck/:deckName', flashcardController.addDeck, (req, res) => {
  return res.status(200).json(res.locals.added);
});

app.delete('/deleteDeck/:currentDeck', flashcardController.deleteDeck, (req, res) => {
  return res.status(200).json(res.locals.deleted);
});





// requests to an unknown route
app.use('*', (req, res) => res.status(404).send('The page you are looking for does not exist'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred. :/' },
  };
  const errObj = Object.assign({}, defaultErr, err);

  console.log(errObj.log);
  res.status(errObj.status).json(errObj.message);
});

// server listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;