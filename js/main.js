var Item = function(file) {
	this.file = file;
	this.name = file.name;
	this.size = file.size;
	this.type = file.type;
};

var UiItem = function(f) {
	// is the current element selected or not
	var isSelected = false;
	var deselListener;
	var imgSize = {
		'h': 0,
		'w': 0,
		'aspect': 0
	};

	var calcImgHeight = function() {
		console.log('calc');
		console.log(item.offsetHeight);
		console.log(item.offsetWidth);


		// var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		// var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		var iw = item.offsetWidth;
		var ih = item.offsetHeight;

		// FIXME TODO get an actual reference to the img dom object, don't do a query every time
		var img = item.getElementsByTagName('img')[0];

		if (imgSize.w < iw) {
			if (imgSize.h < ih) {
				img.style.width = imgSize.w + 'px';
				img.style.height = (imgSize.w / imgSize.aspect) + 'px';
			} else {
				img.style.height = ih + 'px';
				img.style.width = (ih * imgSize.aspect) + 'px';
			}
		} else {
			// img.style.width = iw + 'px';
		}


		// img.style.height = (imgSize.h < vh ? imgSize.h : vh) + 'px';
	};

	var select = function() {
		// first trigger the global select event to deselect all other elements
		Event.trigger('select', 'done');

		// set this element to selected and add the class
		isSelected = true;
		Dom.addClasses(item, 'selected');

		console.log('sel');
		console.log(item.offsetHeight);
		console.log(item.offsetWidth);

		calcImgHeight();
		window.addEventListener('resize', calcImgHeight, false);
	};

	var deselect = function() {
		// set this element to deselected and remove the class
		isSelected = false;
		Dom.removeClasses(item, 'selected');
		window.removeEventListener('resize', calcImgHeight, false);
	};

	var toggle = function() {
		isSelected ? deselect() : select();
	};
	// listener to deselect element if another is selected
	deselListener = Event.add('select', 'done', deselect);

	// here we assign a blobURL for the current file
	var urlObj = URL || window.URL || webkitURL || window.webkitURL;
	var url = urlObj.createObjectURL(f);

	var img = new Image();
	img.onload = function() {
		imgSize.w = this.width;
		imgSize.h = this.height;
		imgSize.aspect = (this.width * 100 / this.height) / 100;
	}
	img.src = url;

	// now, we create the dom element and assign it its properties
	var item = document.createElement('li');
	item.className = 'item';
	// item.innerHTML = '<div class="box photo" style="background-image: url(' + url + ');"><div class="overlay"></div></div>';
	item.innerHTML = '<img class="box photo" src="' + url + '"><div class="overlay"></div>';
	item.addEventListener('click', toggle);

	this.dom = item;
};

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