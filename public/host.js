const protocol = "http";
const host = window.location.hostname;
const frontendPort = "3000";
const backendPort = "8080";

export function backend(endpoint, params = {}) {
	return protocol + "://" + host + ":" + backendPort + "/" + endpoint + addParams(params);
}

export function frontend(endpoint, params = {}) {
	return protocol + "://" + host + ":" + frontendPort + "/" + endpoint + addParams(params);
}

function addParams(params) {
	if (isEmpty(params)) {
		return "";
	}
	let result = "?"
	for (const [key, value] of Object.entries(params)) {
		result += key + "=" + value + "&";
	}
	result = result.slice(0, -1);	//Remove last &
	return result;
}

function isEmpty(obj) {
	return Object.keys(obj).length === 0;
}