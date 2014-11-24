'use strict';

var Item = function(meta, type) {
	switch (type) {
		case 'Dropbox':
			this.name = meta.name;
			this.path = meta.path;
			this.size = meta.size;
			this.humanSize = meta.humanSize;
			this.type = {};
			this.type.mime = meta.mimeType;
			this.type.splitMime = this.type.mime.split('/');
			this.type.type = typeFromMime(this.type.splitMime);
			this.type.ext = extFromString(this.name);
			this.type.className = mimeFromExt(this.type.ext)
			this.sn = 'Dropbox';
			break;
	}
};