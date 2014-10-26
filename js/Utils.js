function genRandomString() {
	var sid = 1840724046193;
	return Math.floor(Math.random() * sid).toString(36) + Math.abs(Math.floor(Math.random() * sid) ^ Date.now()).toString(36);
}

function urlFromFile(f) {
	// here we assign a blobURL for the current file
	var urlObj = URL || window.URL || webkitURL || window.webkitURL;
	var url = urlObj.createObjectURL(f);

	return url;
}

// we should get this straight from the img element
function calcImgHeight(url, callback) {
	var img = new Image();
	img.onload = function() {
		var aspect = (this.width * 100 / this.height) / 100;
		callback(aspect)
	}
	img.src = url;
}