document.getElementsByClassName("name")[0].style.marginTop = (window.innerHeight/2 - 55).toString() + "px";
window.onresize = () => {
	document.getElementsByClassName("name")[0].style.marginTop = (window.innerHeight/2 - 55).toString() + "px";
}
