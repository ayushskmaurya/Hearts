const express = require('express');
const fs = require('fs');
const path = require('path');
const game = require('../game');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {css: 'index', js: 'index'});
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
		css: 'game', js: 'game'
	});
});

router.get('/next_trick', (req, res) => {
	res.json(game.next_trick());
});

router.post('/throw_card', (req, res) => {
	res.json(game.throw_card(req.body.card));
});

module.exports = router;
