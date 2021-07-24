// Setting margins of cards.
const vertical = document.getElementById("vertical");
const horizontal = document.getElementById("horizontal");
const vCards = document.getElementsByClassName("vCardDiv");
const hCards = document.getElementsByClassName("hCardDiv");
vCards[0].style.marginLeft = "0px";
vCards[13].style.marginLeft = "0px";
hCards[0].style.marginTop = "0px";
hCards[13].style.marginTop = "0px";

var verticalWidth = vertical.offsetWidth;
var horizontalHeight = horizontal.offsetHeight;
var cardWidth = vCards[0].offsetWidth;
var cardHeight = vCards[0].offsetHeight;
var leftMargin = ((12 * cardWidth) - (verticalWidth - cardWidth)) / 12;
var topMargin = ((12 * cardHeight) - (horizontalHeight - cardHeight)) / 12;

for(let i=1; i<13; i++) {
	vCards[i].style.marginLeft = "-" + leftMargin + "px";
	hCards[i].style.marginTop = "-" + topMargin + "px";
}
for(let i=14; i<26; i++) {
	vCards[i].style.marginLeft = "-" + leftMargin + "px";
	hCards[i].style.marginTop = "-" + topMargin + "px";
}

window.onresize = () => {
	verticalWidth = vertical.offsetWidth;
	horizontalHeight = horizontal.offsetHeight;
	cardWidth = vCards[0].offsetWidth;
	cardHeight = vCards[0].offsetHeight;
	leftMargin = ((12 * cardWidth) - (verticalWidth - cardWidth)) / 12;
	topMargin = ((12 * cardHeight) - (horizontalHeight - cardHeight)) / 12;

	for(let i=1; i<13; i++) {
		vCards[i].style.marginLeft = "-" + leftMargin + "px";
		hCards[i].style.marginTop = "-" + topMargin + "px";
	}
	for(let i=14; i<26; i++) {
		vCards[i].style.marginLeft = "-" + leftMargin + "px";
		hCards[i].style.marginTop = "-" + topMargin + "px";
	}
}

var cards_left = {player1: 13, player2: 13, player3: 13};  // How many cards are left by each computer players.

// Beginning next trick.
next_trick = () => {
	document.getElementById("ok").disabled = true;
	for(let i=0; i<=3; i++) {
		document.getElementById("p" + i + "_card").style.visibility = "hidden";
		document.getElementById("player" + i + "_card").src = "";
	}

	const xhr = new XMLHttpRequest();
	xhr.open('GET', '/next_trick', true);

	xhr.onload = function() {
		let data = JSON.parse(this.responseText);
		if(!data.game_over) {
			for(let player in data.scores)
				document.getElementById(player + "_score").innerHTML = data.scores[player];
			for(let player in data.players_card) {
				document.getElementById("p" + player + "-" + --cards_left['player' + player]).style.visibility = "hidden";
				document.getElementById("player" + player + "_card").src = "assets/cards/" + data.players_card[player] + ".png";
				document.getElementById("p" + player + "_card").style.visibility = "visible";
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
		document.getElementById(players_card[0]).style.visibility = "hidden";
		document.getElementById("player0_card").src = "assets/cards/" + players_card[0] + ".png";
		document.getElementById("p0_card").style.visibility = "visible";
		delete players_card[0];
		for(let player in players_card) {
			document.getElementById("p" + player + "-" + --cards_left['player' + player]).style.visibility = "hidden";
			document.getElementById("player" + player + "_card").src = "assets/cards/" + players_card[player] + ".png";
			document.getElementById("p" + player + "_card").style.visibility = "visible";
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
