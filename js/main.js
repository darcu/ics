var boxes = (function() {
	var boxes = {};
	var items = [];
	var uiItems = [];

	var draw = function() {
		document.getElementById('list').insertBefore(uiItems[uiItems.length - 1].dom, null);
	};

	boxes.push = function(f) {
		items.push(new Item(f));
		uiItems.push(new UiItem(items[items.length - 1]));
		draw();
	};

	return boxes;
}());

var initListeners = function() {
	// file upload listener
	document.getElementById('files').addEventListener('change', function(e) {
		var files = e.target.files;
		for (var i = 0, f; f = files[i]; i++) {
			boxes.push(f);
		}
	}, false);
	// contentOverlay.initData();
};

initListeners();