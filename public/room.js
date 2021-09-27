import {frontend, backend} from './host.js';

var roomName;
var username;
var stompClient = null;

window.onload = async function roomOnLoad() {
	const urlParams = new URLSearchParams(window.location.search);
	roomName = urlParams.get("name");

	if (localStorage.getItem("tandem-token") === null) {
		redirectToLogin();
	} else {
		connect();
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
	const cell = row.insertCell();
	cell.setAttribute("data-position", position);
	cell.className = "playerCell";
	if (players[position]) {
		if (players[position] == username) {
			cell.appendChild(standButton());
		} else {
			cell.innerHTML = players[position];
		}
	} else {
		cell.appendChild(sitButton(position));
	}
}

async function leaveRoom() {
	stand();
	const response = await fetch(backend("lobby/leave", {"room":roomName}), {
		method: 'POST',
		headers: {
			'tandem-token': localStorage.getItem("tandem-token"),
			'Content-Type': 'application/json'
	}});
	const responseJson = await response.json();
	location.href = frontend("lobby");
}

async function connect() {
	var socket = new SockJS(backend("stomp"));
	stompClient = Stomp.over(socket);
	stompClient.debug = function(){};	// Disables console logging
    stompClient.connect({"tandem-token":localStorage.getItem("tandem-token")}, function (frame) {
        stompClient.subscribe('/room/' + roomName, function(response) {
        	handleTableEvent(JSON.parse(response.body));
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
}

function sit(position) {
    stompClient.send("/app/room/" + roomName + "/sit", {}, JSON.stringify({
    	'position': position
    }));
}

function stand() {
    stompClient.send("/app/room/" + roomName + "/stand", {}, JSON.stringify({}));
}

function handleTableEvent(tableEvent) {
	const playerCells = Array.from(document.getElementsByClassName("playerCell"));
	if (tableEvent.action == "SIT") {
		playerCells.forEach(playerCell => {
			if (playerCell.getAttribute("data-position") == tableEvent.position) {
				if (tableEvent.username == username) {
					playerCell.innerHTML = "";
					playerCell.appendChild(standButton());
				} else {
					playerCell.innerHTML = tableEvent.username;
				}
			} else if (playerCell.innerHTML == tableEvent.username || (username == tableEvent.username && playerCell.getElementsByClassName("standButton").length > 0)) {
				playerCell.innerHTML = "";
				playerCell.appendChild(sitButton(playerCell.getAttribute("data-position")));
			}
		})
	}
	if (tableEvent.action == "STAND") {
		playerCells.forEach(playerCell => {
			if (playerCell.getAttribute("data-position") == tableEvent.position) {
				playerCell.innerHTML = "";
				playerCell.appendChild(sitButton(playerCell.getAttribute("data-position")));
			}
		})
	}
}

function sitButton(position) {
	const button = document.createElement("button");
	button.innerHTML = "Sit";
	button.className = "sitButton";
	button.onclick = function() {sit(position);};
	return button;
}

function standButton() {
	const button = document.createElement("button");
	button.innerHTML = "Stand";
	button.className = "standButton";
	button.onclick = function() {stand();};
	return button;
}