var roomName;

window.onload = function roomOnLoad() {
	const urlParams = new URLSearchParams(window.location.search);
	roomName = urlParams.get("name");
	roomHeader = document.getElementById("roomHeader");
	roomHeader.innerHTML = "Room " + roomName;
}

async function leaveRoom() {
	const response = await fetch("http://localhost:8080/lobby/leave?room=" + roomName, {
		method: 'POST',
		headers: {
			'tandem-token': localStorage.getItem("tandem-token"),
			'Content-Type': 'application/json'
	}});
	const responseJson = await response.json();
	location.href = "http://localhost:3000/lobby";
}