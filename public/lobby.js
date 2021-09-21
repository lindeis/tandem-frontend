import {frontend, backend} from './host.js';

var message;

window.onload = async function lobbyOnLoad() {
	if (localStorage.getItem("tandem-token") === null) {
		redirectToLogin();
	}
	message = document.getElementById("message");
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
	textfield.setAttribute("maxlength", 255);
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
		message.innerHTML = responseJson.message;
	}
}

async function createRoom(roomName) {
	message.innerHTML = "";
	if (isRoomNameValid(roomName)) {
		const response = await fetch(backend("lobby/create"), {
			method: 'POST',
			headers: {
				'tandem-token': localStorage.getItem("tandem-token"),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'name': roomName
			})
		});
		const responseJson = await response.json();
		if (response.ok) {
			location.href = frontend("room", {"name":responseJson.roomName});
		} else {
			message.innerHTML = responseJson.message;
		}
	}
}

function isRoomNameValid(roomName) {
	if (roomName.length < 3 || roomName.length > 255) {
		message.innerHTML = "The room name has to be between 3 and 255 characters long.";
		return false;
	}
	const regex = /^[a-zA-Z0-9._]+$/
	if (!regex.test(roomName)) {
		message.innerHTML = "The room name can only contain letters, numbers, underscores and periods";
		return false;
	}
	return true;
}