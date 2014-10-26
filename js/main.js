// this is the generic Item metadata holder
var Item = function(file) {
	this.file = file;
	this.name = file.name;
	this.size = file.size;
	this.type = file.type;
};

// this is the generic UI Item holder
// it holds a reference to the DOM element 
var UiItem = function(f) {
	// is the current element selected or not
	var isSelected = false;
	var deselListener;
	var item;

	var select = function() {
		// first trigger the global select event to deselect all other elements
		Event.trigger('select', 'done');

		// set this element to selected and add the class
		isSelected = true;
		Dom.addClasses(item, 'selected');
	};

	var deselect = function() {
		if (isSelected) {
			// set this element to deselected and remove the class
			isSelected = false;
			Dom.removeClasses(item, 'selected');
		}
	};

	var toggle = function() {
		console.log('toggle ' + isSelected);
		isSelected ? deselect() : select();
	};
	// listener to deselect element if another is selected
	deselListener = Event.add('select', 'done', deselect);

	item = createItemDom(f, toggle);
	this.dom = item;
};

function createItemDom(f, callback) {
	// here we assign a blobURL for the current file
	var urlObj = URL || window.URL || webkitURL || window.webkitURL;
	var url = urlObj.createObjectURL(f);

	// now, we create the dom element and assign it its properties
	var item = document.createElement('li');
	item.className = 'item';
	item.innerHTML = '<div class="box photo" style="background-image: url(' + url + ');"><div class="overlay"></div></div>';
	// item.innerHTML = '<img class="box photo" src="' + url + '"><div class="overlay"></div>';
	item.addEventListener('click', callback);

	return item;
}

var boxes = (function() {
	var boxes = {};
	var items = [];
	var uiItems = [];

	var draw = function() {
		document.getElementById('list').insertBefore(uiItems[uiItems.length - 1].dom, null);
	};

	boxes.push = function(f) {
		items.push(new Item(f));
		uiItems.push(new UiItem(f))
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
};

initListeners();