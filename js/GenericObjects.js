// this is the generic Item metadata holder
var Item = function(file, meta, url, initType, callback) {
	switch (initType) {
		case 'File':
			this.file = file;
			this.url = url || (file && urlFromFile(file)) || '';
			this.name = nameFromString((file && file.name) || url);
			this.ext = extFromString((file && file.name) || url);
			this.size = file ? file.size : 0;
			this.mime = getMimeFromExt(this.ext);
			break;
			// case 'URL':
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
			// 	break;
		case 'Dropbox':
			this.file = file;
			this.url = urlFromFile(file);
			this.name = nameFromString(meta.name);
			this.ext = extFromString(meta.name);
			this.size = meta.size;
			this.mime = getMimeFromExt(this.ext);
			break;
	}
};