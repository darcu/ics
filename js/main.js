// this is the generic Item metadata holder
var Item = function(file) {
	this.file = file;
	this.name = file.name;
	this.size = file.size;
	this.type = file.type;
};

// this is the generic UI Item holder
// it holds a reference to the DOM element 
var UiItem = function(i) {
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
		calcPosition();
	};

	var deselect = function() {
		if (isSelected) {
			// set this element to deselected and remove the class
			isSelected = false;
			Dom.removeClasses(item, 'selected');
		}
	};

	var toggle = function() {
		isSelected ? deselect() : select();
	};

	var calcPosition = function() {
		var goToPosition = item.offsetTop;
		smoothScrollTo(goToPosition, 300);
	};

	var smoothScrollTo = function(target, duration) {
		var timer,
			start = Date.now(),
			factor = 0,
			offset = window.pageYOffset,
			delta = target - window.pageYOffset;
		duration = duration || 1000;

		if (timer) {
			clearInterval(timer);
		}

		var step = function() {
			var y;
			factor = (Date.now() - start) / duration;
			if (factor >= 1) {
				clearInterval(timer);
				factor = 1;
			}
			y = factor * delta + offset;
			window.scrollBy(0, y - window.pageYOffset);
		}

		timer = setInterval(step, 10);
		return timer;
	};

	// listener to deselect element if another is selected
	deselListener = Event.add('select', 'done', deselect);

	item = createItemDom(i, toggle);
	this.dom = item;
};

function createItemDom(i, callback) {
	console.log(i.name + ' - ' + i.type);

	if (i.type === 'image/jpeg') {
		return (function() {
			var f = i.file;

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
		}());
	} else {
		return (function() {
			var f = i.file;

			// here we assign a blobURL for the current file
			var urlObj = URL || window.URL || webkitURL || window.webkitURL;
			var url = urlObj.createObjectURL(f);

			var item = document.createElement('li');
			item.className = 'item';
			item.innerHTML = '<div class="box"><a href="' + url + '">' + i.name + '</a></div>';
			item.addEventListener('click', callback);

			return item;
		}());
	}
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
};

initListeners();