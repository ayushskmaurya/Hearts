var players_cards = {};  // Cards of each computer player.
var player_cards = [];  // Cards of the player.
var lead;  // Player who leads with the current trick.
var tricks_left;  // To track the no. of tricks left.
var cards_thrown = {};  // Cards thrown by each player for the trick.
var isPlayerTurn = false;  // To check whether the player can throw card.
var scores = {};

// Sorting the cards
sortCards = (card2, card1) => {
	if(card2[0] > card1[0])
		return 0;
	else if(card2[0] < card1[0])
		return -1;
	else
		return (card2.substring(1) - card1.substring(1));
};

// Deleting the card from the array.
deleteCard = (cards, card) => {
	return cards.filter((currCard) => {
		if(currCard !== card)
			return currCard;
	});
};

// To return the player who is winner of the trick.
trick_winner = () => {
	let winner = lead;
	let score = 0;
	for(let player in cards_thrown) {
		if(cards_thrown[player] == 's12')
			score += 13;
		else if(cards_thrown[player][0] == 'h')
			score += 1;
		let cond1 = cards_thrown[lead.toString()][0] === cards_thrown[player][0];
		let cond2 = cond1 && (parseInt(cards_thrown[winner.toString()].substring(1)) < parseInt(cards_thrown[player].substring(1)));
		if(cond2)
			winner = parseInt(player);
	}
	scores['player' + winner] += score;
	return winner;
};

// To return the player who will lead the current trick.
trick_lead = () => {
	if(tricks_left !== 13)
		return trick_winner();
	else {
		for(let player in players_cards)
			if(players_cards[player][0] === 'c2')
				return parseInt(player.substring(6));
		return 0;
	}
};

// Choose the card (Computer Players)
choose_card = (player) => {
	let card;
	if(('player' + lead) !== player) {
		let req_cards = players_cards[player].filter((currCard) => {
			if(currCard[0] === cards_thrown[lead][0])
				return currCard;
		});
		if(req_cards.length > 0)
			card = req_cards[Math.floor(Math.random() * req_cards.length)];
		else
			card = players_cards[player][Math.floor(Math.random() * tricks_left)];
	}

	else
		card = (tricks_left === 13) ? "c2" : players_cards[player][Math.floor(Math.random() * tricks_left)];

	players_cards[player] = deleteCard(players_cards[player], card);
	return card;
};

// Dealing the cards
exports.Deal = (deck) => {
	tricks_left = 13;
	scores = {'player0': 0, 'player1': 0, 'player2': 0, 'player3': 0};
	for(let i=1; i<=3; i++)
		players_cards['player' + i] = deck.splice(0, 13).sort((card2, card1) => {return sortCards(card2, card1)});
	player_cards = deck.splice(0, 13).sort((card2, card1) => {return sortCards(card2, card1)});
	return player_cards;
};

// Beginning next trick.
exports.next_trick = () => {
	if(tricks_left > 0) {
		lead = trick_lead();
		cards_thrown = {};
		if(lead !== 0) {
			for(let i=lead; i<=3; i++)
				cards_thrown[i] = choose_card('player' + i);
			isPlayerTurn = true;
			return {game_over: false, scores: scores, players_card: cards_thrown};
		}
		isPlayerTurn = true;
		return {game_over: false, scores: scores, players_card: cards_thrown};
	}
	isPlayerTurn = true;
	return {game_over: true, scores: scores, players_card: cards_thrown};
}

// Check whether player can throw card.
exports.can_throw = (card) => {
	if(isPlayerTurn) {
		if(lead !== 0) {
			for(let currCard of player_cards)
				if(currCard[0] === cards_thrown[lead][0] && card[0] !== cards_thrown[lead][0])
					return false;
			return true;
		}
		else {
			if(tricks_left < 13)
				return true;
			else if(card === 'c2')
				return true;
			return false;
		}
	}
	return false;
};

// Throwing the card selected by the player and computer players left.
exports.throw_card = (card) => {
	let players_card = {};
	cards_thrown[0] = card;
	players_card[0] = card;
	player_cards = deleteCard(player_cards, card);
	isPlayerTurn = false;
	let n = (lead === 0) ? 4 : lead;
	for(let i=1; i<n; i++) {
		cards_thrown[i] = choose_card('player' + i);
		players_card[i] = cards_thrown[i];
	}
	tricks_left--;
	return players_card;
}
