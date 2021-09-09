window.onload = async function lobbyOnLoad() {
	if (localStorage.getItem("tandem-token") === null) {
		redirectToLogin();
	}
	response = await queryRooms();
	if (response.ok) {
		rooms = await parseRooms(response);
		tbody = document.getElementById("roomTableBody");
		fillTable(tbody, rooms);
	} else {
		redirectToLogin();
	}
}

function redirectToLogin() {
	location.href = "http://localhost:3000/login?redirectedFrom=lobby";
}

async function queryRooms() {
	const response = await fetch("http://localhost:8080/lobby", {
		method: 'GET',
		headers: {
			'tandem-token': localStorage.getItem("tandem-token"),
			'Content-Type': 'application/json'
	}});
	return response;
}

function parseRooms(reponse) {
	const rooms = response.json();
	return rooms;
}

function fillTable(tbody, rooms) {
	rooms.forEach(room => {
		row = tbody.insertRow();
		nameCell = row.insertCell();
		nameCell.innerHTML = room;
		buttonCell = row.insertCell();
		button = document.createElement("button");
		button.innerHTML = "Join";
		button.className = "join-button";
		button.onclick = function () { joinRoom(room); }
		buttonCell.appendChild(button);
	});
	createRoomRow = tbody.insertRow();
	createRoomNameCell = createRoomRow.insertCell();
	textfield = document.createElement("input");
	textfield.type = "text";
	textfield.id = "createRoomNameField";
	createRoomNameCell.appendChild(textfield);
	createRoomButtonCell = createRoomRow.insertCell();
	button = document.createElement("button");
	button.innerHTML = "Create";
	button.className = "create-button";
	button.onclick = function () { 
		createRoom(document.getElementById("createRoomNameField").value);
	}
	createRoomButtonCell.appendChild(button);
	document.getElementById("roomTable").classList.remove("hidden");
}

async function joinRoom(roomName) {
	const response = await fetch("http://localhost:8080/lobby?join=" + roomName, {
		method: 'POST',
		headers: {
			'tandem-token': localStorage.getItem("tandem-token"),
			'Content-Type': 'application/json'
	}});
	const responseJson = await response.json();
	if (response.ok) {
		location.href = "http://localhost:3000/room?name=" + responseJson.roomName;
	} else {
		document.getElementById("message").innerHTML = responseJson.message;
	}
}

async function createRoom(roomName) {
	const response = await fetch("http://localhost:8080/lobby?create=" + roomName, {
		method: 'POST',
		headers: {
			'tandem-token': localStorage.getItem("tandem-token"),
			'Content-Type': 'application/json'
	}});
	const responseJson = await response.json();
	if (response.ok) {
		location.href = "http://localhost:3000/room?name=" + responseJson.roomName;
	} else {
		document.getElementById("message").innerHTML = responseJson.message;
	}
}