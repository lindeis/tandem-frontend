import {frontend, backend} from './host.js';

var roomName;
var username;

window.onload = async function roomOnLoad() {
	const urlParams = new URLSearchParams(window.location.search);
	roomName = urlParams.get("name");

	if (localStorage.getItem("tandem-token") === null) {
		redirectToLogin();
	} else {
		document.getElementById("leaveButton").onclick = function() { leaveRoom(); };
		username = await getUsername();
		const roomInfo = await queryRoom();
		const roomHeader = document.getElementById("roomHeader");
		roomHeader.innerHTML = "Room " + roomName;
		const tbody = document.getElementById("positionTableBody");
		fillTable(tbody, roomInfo.players);
	}
}

function redirectToLogin() {
	location.href = frontend("login", {
		"redirectedFrom": "room",
		"name": roomName
	});
}

function redirectToLobby() {
	location.href = frontend("lobby", {
		"redirectedFrom": "invalidRoom"
	});
}

async function getUsername() {
	const response = await fetch(backend("user"), {
		method: 'GET',
		headers: {
			'tandem-token': localStorage.getItem("tandem-token"),
			'Content-Type': 'application/json'
	}});
	if (response.ok) {
		const userInfo = await response.json();
		return userInfo.username;
	} else {
		redirectToLogin();
	}	
}

async function queryRoom() {
	const response = await fetch(backend("room", {"room":roomName}), {
		method: 'GET',
		headers: {
			'tandem-token': localStorage.getItem("tandem-token"),
			'Content-Type': 'application/json'
	}});
	if (response.ok) {
		const roomInfo = await response.json()
		return roomInfo;
	} else {
		redirectToLobby();
	}	
}


function fillTable(tbody, players) {
	const rowWhite1 = tbody.insertRow();
	const rowBlack1 = tbody.insertRow();
	const rowWhite2 = tbody.insertRow();
	const rowBlack2 = tbody.insertRow();
	rowWhite1.insertCell().innerHTML = "White 1";
	rowBlack1.insertCell().innerHTML = "Black 1";
	rowWhite2.insertCell().innerHTML = "White 2";
	rowBlack2.insertCell().innerHTML = "Black 2";
	fillPlayer(rowWhite1, "WHITE1", players);
	fillPlayer(rowBlack1, "BLACK1", players);
	fillPlayer(rowWhite2, "WHITE2", players);
	fillPlayer(rowBlack2, "BLACK2", players);
}

function fillPlayer(row, position, players) {
	if (players[position]) {
		if (players[position] == username) {
			const button = document.createElement("button");
			button.innerHTML = "Stand";
			button.onclick = function () { stand(position, button); }
			row.insertCell().appendChild(button);
		} else {
			row.insertCell().innerHTML = players[position];
		}
	} else {
		const button = document.createElement("button");
		button.innerHTML = "Sit";
		button.onclick = function () { sit(position, button); }
		row.insertCell().appendChild(button);
	}
}

async function leaveRoom() {
	const response = await fetch(backend("lobby/leave", {"room":roomName}), {
		method: 'POST',
		headers: {
			'tandem-token': localStorage.getItem("tandem-token"),
			'Content-Type': 'application/json'
	}});
	const responseJson = await response.json();
	location.href = frontend("lobby");
}

async function sit(position, button) {
	const response = await fetch(backend("room/sit", {"room":roomName, "position":position}), {
		method: 'POST',
		headers: {
			'tandem-token': localStorage.getItem("tandem-token"),
			'Content-Type': 'application/json'
	}});
	if (response.ok) {
		button.innerHTML = "Stand";
		button.onclick = function() { stand(position, button); }
	} else {
		const responseJson = await response.json();
		document.getElementById("message").innerHTML = responseJson.message;
	}
}

async function stand(position, button) {
	const response = await fetch(backend("room/stand"), {
		method: 'POST',
		headers: {
			'tandem-token': localStorage.getItem("tandem-token"),
			'Content-Type': 'application/json'
	}});
	if (response.ok) {
		button.innerHTML = "Sit";
		button.onclick = function() { sit(position, button); }
	} else {
		const responseJson = await response.json();
		document.getElementById("message").innerHTML = responseJson.message;
	}
}