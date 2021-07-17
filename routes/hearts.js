const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {css: 'index', js: 'index'});
});

router.get('/game', (req, res) => {
	
	deck = []
	fs.readdirSync(path.join(__dirname, '../public/assets/cards')).forEach(card => {
		deck.push(card);
	});

	// Shuffling the deck of cards.
	for(let i=0; i<deck.length; i++) {
		let j = Math.floor(Math.random() * i);
		let temp = deck[i];
		deck[i] = deck[j];
		deck[j] = temp;
	}
	
	res.render('game', {
		player_cards: deck.splice(0, 13),
		comp1_cards: deck.splice(0, 13),
		comp2_cards: deck.splice(0, 13),
		comp3_cards: deck.splice(0, 13),
		css: 'game', js: false
	});
});

module.exports = router;
