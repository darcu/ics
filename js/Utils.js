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
	};
	img.src = url;
}

function getMimeFromExt(ext) {
	return mimez[ext.toLowerCase()];
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
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

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