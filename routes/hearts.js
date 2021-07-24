const express = require('express');
const fs = require('fs');
const path = require('path');
const game = require('../game');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {page: 'index'});
});

router.get('/game', (req, res) => {
	
	deck = []
	fs.readdirSync(path.join(__dirname, '../public/assets/cards')).forEach(card => {
		deck.push(card.substring(0, card.length - 4));
	});

	// Shuffling the deck of cards.
	for(let i=0; i<deck.length; i++) {
		let j = Math.floor(Math.random() * i);
		let temp = deck[i];
		deck[i] = deck[j];
		deck[j] = temp;
	}
	
	range = new Array();
	for(let i=0; i<13; i++)
		range.push(i)

	res.render('game', {
		player0_cards: game.Deal(deck),
		range: range,
		playerName: game.getName(),
		page: 'game'
	});
});

router.get('/score', (req, res) => {
	if(game.canShowScore())
		res.render('score', {page: 'score',
			data: {playerName: game.getName(), score: game.getScore()},
			isWinner: game.isWinner
		});
	else
		res.redirect("/");
});

router.post('/save_name', (req, res) => {
	res.json(game.save_name(req.body.name));
});

router.get('/next_trick', (req, res) => {
	res.json(game.next_trick());
});

router.post('/can_throw', (req, res) => {
	res.json(game.can_throw(req.body.card));
});

router.post('/throw_card', (req, res) => {
	res.json(game.throw_card(req.body.card));
});

module.exports = router;
