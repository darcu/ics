/*** image manipulation ***/

// we should get this straight from the img element
function calcImgHeight(url, callback) {
	// FIXME TODO error
	var img = new Image();
	img.onload = function() {
		var aspect = (this.width * 100 / this.height) / 100;
		callback(aspect);
	};
	img.src = url;
}

/*** file operations ***/

function urlFromFile(f) {
	// here we assign a blobURL for the current file
	var urlObj = URL || window.URL || webkitURL || window.webkitURL;
	var url = urlObj.createObjectURL(f);

	return url;
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

/*** browser checks ***/

function isMobile() {
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

/*** generics ***/

function bytesToSize(val) {
	var sufix = [' Bytes', ' KB', ' MB', ' GB', ' TB'];
	var size = val;
	var i = 0;

	// 1000 ca folosim sistemu metric
	while(size/1000 > 1) {
		i++;
		size /= 1000;
	}
	return size.toFixed(2) + sufix[i];
};

function genRandomString() {
	var sid = 1840724046193;
	return Math.floor(Math.random() * sid).toString(36) + Math.abs(Math.floor(Math.random() * sid) ^ Date.now()).toString(36);
}

/*** supported mime types ***/

function getMimeFromExt(ext) {
	return mimez[ext.toLowerCase()];
}

var mimez = {
	'zip': 'archive',
	'7z': 'archive',
	'rar': 'archive',
	'ace': 'archive',
	'gz': 'archive',
	'tar': 'archive',
	'bz2': 'archive',

	'weba': 'audio',
	'webm': 'video',
	'webp': 'image',

	'oga': 'audio',
	'ogg': 'audio',
	'ogv': 'video',
	'ogx': 'video', // maybe

	'mp3': 'audio',
	'mp4': 'video',
	'mp4a': 'audio',
	'mp4s': 'video',
	'mp4v': 'video',
	'mpg4': 'video',

	'wav': 'audio',

	'pdf': 'pdf',

	'txt': 'text',
	'log': 'code',
	'css': 'code',

	'jpg': 'image',
	'jpeg': 'image',
	'jpe': 'image',
	'bmp': 'image',
	'bmp': 'image',
	'gif': 'image',
	'ico': 'image',
	'png': 'image',
	'svg': 'image',

	// TODO add source code files maybe
};
