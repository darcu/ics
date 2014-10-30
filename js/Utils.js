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
	// FIXME TODO error
	var img = new Image();
	img.onload = function() {
		var aspect = (this.width * 100 / this.height) / 100;
		callback(aspect);
	}
	img.src = url;
}

function getMimeFromExt(ext) {
	var type = '';
	var mime = mimes[ext.toLowerCase()];

	if (mime) {
		mime.indexOf('image') !== -1 && (type = 'image');
		mime.indexOf('video') !== -1 && (type = 'video');
		mime.indexOf('audio') !== -1 && (type = 'audio');
		mime.indexOf('text') !== -1 && (type = 'text');
	}

	return type;
}

function getExtFromType(type) {
	return type.split('/')[1];
}

function textFromFile(f, callback) {
	var r = new FileReader();
	r.onload = function(e) {
		// FIXME TODO error
		var text = e.target.result;
		callback(text);
	};
	r.readAsText(f);
}

function isMobile() {
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
}

function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};