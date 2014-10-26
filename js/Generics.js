// this is the generic Item metadata holder
var Item = function(file) {
	this.file = file;
	this.url = urlFromFile(file);
	this.name = file.name;
	this.size = file.size;
	this.type = file.type;
	this.mime = getMimeFromExt(file.name.substring(file.name.lastIndexOf('.') + 1));
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

	// listener to deselect element if another is selected
	deselListener = Event.add('select', 'done', deselect);
	item = createItemDom(i, toggle);
	(i.mime === 'image') && calcImgHeight(i.url, function(aspect) {
		var className = (aspect >= 1 ? 'hor' : 'vert');
		Dom.addClasses(item.getElementsByTagName('img')[0], className);
	});
	
	this.dom = item;
};