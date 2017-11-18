const express = require('express');
const router = express.Router(); //Make express router

const { data } = require('../data/flashcardData.json'); //Same things as saying ----> const data = require('../data/flashcardData.json').data;
const { cards } = data; //Same things as saying ----> const cards = data.cards;

//This will only be triggered on paths starting with '/cards' so it is relative here. '/' here means '/cards in a wider scope'
router.get('/:id', (req, res) => { //Treats everything after / as id variable and stored in request's params property
    const side = req.query.side; //Store query property as key-value pair
    const id = req.params.id; //Stores the id field from the route parameter

    if(!side){
        return res.redirect(`/cards/${id}?side=question`);
    }

    const name = req.cookies.username;
    const text = cards[id][side]; //Ex: If id=0 and side=question you'd get cards[0].question and that'd be stored into text
    let hint = '';
    if(req.query.side === "question"){
      hint = cards[id].hint;
      slideToShow = 'answer';
      slideToShowDisplay = 'Answer';
    } else{
      slideToShow = 'question';
      slideToShowDisplay = 'Question';
    }


    const templateData = {
      text,
      hint,
      id,
      name,
      slideToShow,
      slideToShowDisplay
    }; //Same thing as saying ----> const templateData = {text: text, hint: hint}

    res.render('card', templateData);
});

router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashcardId = Math.floor( Math.random() * numberOfCards);
    res.redirect(`/cards/${flashcardId}`);
});


module.exports = router;
