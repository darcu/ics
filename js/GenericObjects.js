// this is the generic Item metadata holder
var Item = function() {
	var obj = {};

	var init = function(file, url) {
		obj.file = file;
		obj.url = url || (file && urlFromFile(file)) || '';
		obj.name = nameFromString((file && file.name) || url);
		obj.ext = extFromString((file && file.name) || url);
		obj.size = file ? file.size : 0;
		obj.type = file ? file.type : '';
		obj.mime = getMimeFromExt(obj.ext);
	};

	obj.initFromUrl = function(url, callback) {
		var mime = getMimeFromExt(extFromString(url));

		if (mime === 'image' || mime === 'text' || mime === 'code') {
			getRemoteFileFromUrl(url, function(blob) {
				init(blob, url);
				callback && callback();
			})
		} else {
			init(null, url);
			callback && callback();
		}
	};

	obj.init = function(file) {
		init(file);
	}

	return obj;
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