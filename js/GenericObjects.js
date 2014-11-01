// this is the generic Item metadata holder
var Item = function() {
	var o = {};

	// var init = function(file, url) {
	// 	o.file = file;
	// 	o.url = url || (file && urlFromFile(file)) || '';
	// 	o.name = nameFromString((file && file.name) || url);
	// 	o.ext = extFromString((file && file.name) || url);
	// 	o.size = file ? file.size : 0;
	// 	o.mime = getMimeFromExt(o.ext);
	// };

	// o.initFromUrl = function(url, callback) {
	// 	var mime = getMimeFromExt(extFromString(url));

	// 	if (mime === 'image' || mime === 'text' || mime === 'code') {
	// 		getRemoteFileFromUrl(url, function(blob) {
	// 			init(blob, url);
	// 			callback && callback();
	// 		});
	// 	} else {
	// 		init(null, url);
	// 		callback && callback();
	// 	}
	// };

	o.initFromDropbox = function(file, meta, callback) {
		o.file = file;
		o.url = urlFromFile(file);
		o.name = nameFromString(meta.name);
		o.ext = extFromString(meta.name);
		o.size = meta.size;
		o.mime = getMimeFromExt(o.ext);
	};

	// o.init = function(file) {
	// 	init(file);
	// };

	return o;
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