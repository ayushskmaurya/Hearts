document.getElementsByClassName("name")[0].style.marginTop = (window.innerHeight/2 - 55).toString() + "px";
window.onresize = () => {
	document.getElementsByClassName("name")[0].style.marginTop = (window.innerHeight/2 - 55).toString() + "px";
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
