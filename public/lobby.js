import {frontend, backend} from './host.js';

window.onload = async function lobbyOnLoad() {
	if (localStorage.getItem("tandem-token") === null) {
		redirectToLogin();
	}
	const rooms = await queryRooms();
	const tbody = document.getElementById("roomTableBody");
	fillTable(tbody, rooms);
}

function redirectToLogin() {
	location.href = frontend("login", {"redirectedFrom":"lobby"});
}

async function queryRooms() {
	const response = await fetch(backend("lobby"), {
		method: 'GET',
		headers: {
			'tandem-token': localStorage.getItem("tandem-token"),
			'Content-Type': 'application/json'
	}});
	if (response.ok) {
		const rooms = await response.json();
		return rooms;
	} else {
		// TODO
	}
}

function fillTable(tbody, rooms) {
	rooms.forEach(room => {
		const row = tbody.insertRow();
		row.insertCell().innerHTML = room.roomName;
		row.insertCell().innerHTML = room.playerCount + "/4";
		row.insertCell().innerHTML = room.spectatorCount;
		const button = document.createElement("button");
		button.innerHTML = "Join";
		button.className = "join-button";
		button.onclick = function () { joinRoom(room.roomName); }
		row.insertCell().appendChild(button);
	});
	const createRoomRow = tbody.insertRow();
	const textfield = document.createElement("input");
	textfield.type = "text";
	textfield.id = "createRoomNameField";
	createRoomRow.insertCell().appendChild(textfield);
	const button = document.createElement("button");
	button.innerHTML = "Create";
	button.className = "create-button";
	button.onclick = function () { 
		createRoom(document.getElementById("createRoomNameField").value);
	}
	createRoomRow.insertCell().appendChild(button);
	document.getElementById("roomTable").classList.remove("hidden");
}

async function joinRoom(roomName) {
	const response = await fetch(backend("lobby/join", {"room":roomName}), {
		method: 'POST',
		headers: {
			'tandem-token': localStorage.getItem("tandem-token"),
			'Content-Type': 'application/json'
	}});
	const responseJson = await response.json();
	if (response.ok) {
		location.href = frontend("room", {"name":responseJson.roomName});
	} else {
		document.getElementById("message").innerHTML = responseJson.message;
	}
}

async function createRoom(roomName) {
	const response = await fetch(backend("lobby/create", {"room":roomName}), {
		method: 'POST',
		headers: {
			'tandem-token': localStorage.getItem("tandem-token"),
			'Content-Type': 'application/json'
	}});
	const responseJson = await response.json();
	if (response.ok) {
		location.href = frontend("room", {"name":responseJson.roomName});
	} else {
		document.getElementById("message").innerHTML = responseJson.message;
	}
}