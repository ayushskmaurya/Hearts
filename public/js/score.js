const status = (isWinner) ? "You Won!" : "You Lose!";
const statusElement = document.getElementById("status");
var chCount = 0;
statusElement.innerHTML = status[chCount++];

var interval = setInterval(() => {
	statusElement.innerHTML += status[chCount++];
	if(chCount === status.length)
		clearInterval(interval);
}, 100);
