var playerName = document.getElementsByClassName("name")[0];
var dev = document.getElementById("dev");

playerName.style.marginTop = (window.innerHeight/2 - playerName.offsetHeight/2 - dev.offsetHeight/2).toString() + "px";
dev.style.marginTop = (window.innerHeight/2 - playerName.offsetHeight/2 - dev.offsetHeight/2).toString() + "px";
window.onresize = () => {
	playerName.style.marginTop = (window.innerHeight/2 - playerName.offsetHeight/2 - dev.offsetHeight/2).toString() + "px";
	dev.style.marginTop = (window.innerHeight/2 - playerName.offsetHeight/2 - dev.offsetHeight/2).toString() + "px";
}

// Saving name of the player.
save_name = () => {
	let name = document.getElementById("name").value.trim();
	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/save_name', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function() {
		if(JSON.parse(this.responseText))
			location.href="/game";
	};
	xhr.send(JSON.stringify({name: name}));
};
