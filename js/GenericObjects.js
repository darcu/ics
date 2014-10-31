// this is the generic Item metadata holder
var Item = function(file) {
	this.file = file;
	this.url = urlFromFile(file);
	this.name = file.name.lastIndexOf('.') !== -1 ? file.name.substring(0, file.name.lastIndexOf('.')) : file.name;
	this.ext = file.name.lastIndexOf('.') !== -1 ? file.name.substring(file.name.lastIndexOf('.') + 1) : '';
	this.size = file.size;
	this.type = file.type;
	this.mime = getMimeFromExt(this.ext);
};

// this is the generic UI Item holder
// it holds a reference to the DOM element 
var UiItem = function(i) {
	var item;

	item = createItemDom(i);

	(i.mime === 'image') && calcImgHeight(i.url, function(aspect) {
		var className = (aspect >= 1 ? 'hor' : 'vert');
		addClasses(item.getElementsByTagName('img')[0], className);
	});
	
	this.dom = item;
};
