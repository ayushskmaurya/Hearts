var players_cards = {};  // Cards of each computer player.
var lead;  // Player who leads with the current trick.
var tricks_left;  // To track the no. of tricks left.
var cards_thrown = {};  // Cards thrown by each player for the trick.

// Sorting the cards
sortCards = (card2, card1) => {
	if(card2[0] > card1[0])
		return 0;
	else if(card2[0] < card1[0])
		return -1;
	else
		return (card2.substring(1) - card1.substring(1));
};

// To return the player who is winner of the trick.
trick_winner = () => {
	let winner = lead;
	for(let player in cards_thrown) {
		let cond1 = cards_thrown[lead.toString()][0] === cards_thrown[player][0];
		let cond2 = cond1 && (parseInt(cards_thrown[winner.toString()].substring(1)) < parseInt(cards_thrown[player].substring(1)));
		if(cond2)
			winner = parseInt(player);
	}
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

// Dealing the cards
exports.Deal = (deck) => {
	tricks_left = 13;
	for(let i=1; i<=3; i++)
		players_cards['player' + i] = deck.splice(0, 13).sort((card2, card1) => {return sortCards(card2, card1)});
	return deck.splice(0, 13).sort((card2, card1) => {return sortCards(card2, card1)});
};

// Beginning next trick.
exports.next_trick = () => {
	if(tricks_left > 0) {
		lead = trick_lead();
		cards_thrown = {};
		if(lead !== 0) {
			for(let i=lead; i<=3; i++)
				cards_thrown[i] = 'c' + Math.floor(Math.random() * 14);
			return {game_over: false, players_card: cards_thrown};
		}
		return {game_over: false, players_card: cards_thrown};
	}
	return {game_over: true, players_card: cards_thrown};
}

// Throwing the card selected by the player and computer players left.
exports.throw_card = (card) => {
	let players_card = {};
	cards_thrown[0] = card;
	players_card[0] = card;
	let n = (lead === 0) ? 4 : lead;
	for(let i=1; i<n; i++) {
		cards_thrown[i] = 'c' + Math.floor(Math.random() * 14);
		players_card[i] = cards_thrown[i];
	}
	tricks_left--;
	return players_card;
}
