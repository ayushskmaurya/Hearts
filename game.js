var players_cards = {};  // Cards of each computer player.
var lead;  // Player who leads with the current trick.
var tricks_left;  // To track the no. of tricks left.

// Sorting the cards
sortCards = (card2, card1) => {
	if(card2[0] > card1[0])
		return 0;
	else if(card2[0] < card1[0])
		return -1;
	else
		return (card2.substring(1) - card1.substring(1));
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
		lead = Math.floor(Math.random() * 4);
		if(lead !== 0) {
			let players_card = {};
			for(let i=lead; i<=3; i++)
				players_card[i] = 'c' + Math.floor(Math.random() * 14);
			return {game_over: false, players_card: players_card};
		}
		return {game_over: false, players_card: {}};
	}
	return {game_over: true, players_card: {}};
}

// Throwing the card selected by the player and computer players left.
exports.throw_card = (card) => {
	let players_card = {};
	players_card[0] = card;
	let n = (lead === 0) ? 4 : lead;
	for(let i=1; i<n; i++)
		players_card[i] = 'c' + Math.floor(Math.random() * 14);
	tricks_left--;
	return players_card;
}
