var cards_left = {player1: 13, player2: 13, player3: 13};  // How many cards are left by each computer players.

// Beginning next trick.
next_trick = () => {
	document.getElementById("ok").disabled = true;
	for(let i=0; i<=3; i++)
		document.getElementById("player" + i + "_card").style.visibility = "hidden";

	const xhr = new XMLHttpRequest();
	xhr.open('GET', '/next_trick', true);

	xhr.onload = function() {
		let data = JSON.parse(this.responseText);
		if(!data.game_over) {
			for(let player in data.scores)
				document.getElementById(player + "_score").innerHTML = data.scores[player];
			for(let player in data.players_card) {
				document.getElementById("p" + player + "-" + --cards_left['player' + player]).remove();
				document.getElementById("player" + player + "_card").value = data.players_card[player];
				document.getElementById("player" + player + "_card").style.visibility = "visible";
			}
		}
		else
			location.href="/score";
	};

	xhr.send();
};

// Throwing the card selected by the player and computer players left.
throw_card = (card) => {
	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/throw_card', true);
	xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.onload = function() {
		players_card = JSON.parse(this.responseText);
		document.getElementById(players_card[0]).remove();
		document.getElementById("player0_card").value = players_card[0];
		document.getElementById("player0_card").style.visibility = "visible";
		delete players_card[0];
		for(let player in players_card) {
			document.getElementById("p" + player + "-" + --cards_left['player' + player]).remove();
			document.getElementById("player" + player + "_card").value = players_card[player];
			document.getElementById("player" + player + "_card").style.visibility = "visible";
		}
		document.getElementById("ok").disabled = false;
	};

	xhr.send(JSON.stringify({card: card}));
};

// Check whether player can throw card.
can_throw = (card) => {
	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/can_throw', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function() {
		if(JSON.parse(this.responseText))
			throw_card(card);
	};
	xhr.send(JSON.stringify({card: card}));
};
