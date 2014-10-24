var Item = function(file) {
	this.file = file;
	this.name = file.name;
	this.size = file.size;
	this.type = file.type;
};

var boxes = (function() {
	var boxes = {};
	var items = [];

	var draw = function() {
		Draw(items[items.length - 1].file);
	};

	boxes.push = function(i) {
		items.push(i);
		draw();
	};

	return boxes;
}());

function Draw(f) {
	var urlObj = URL || window.URL || webkitURL || window.webkitURL;
	var url = urlObj.createObjectURL(f);
	var item = document.createElement('li');

	item.className = 'item';
	item.innerHTML = '<div class="box photo" style="background-image: url(' + url + ');"><div class="overlay"></div></div>';
	document.getElementById('list').insertBefore(item, null);
}

var initListeners = function() {
	// file upload listener
	document.getElementById('files').addEventListener('change', function(e) {
		var files = e.target.files;
		for (var i = 0, f; f = files[i]; i++) {
			boxes.push(new Item(f));
		}
	}, false);
};

initListeners();