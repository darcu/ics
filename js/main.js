var boxes = (function() {
	var boxes = {};
	var items = [];
	var uiItems = [];

	var draw = function() {
		document.getElementById('list').insertBefore(uiItems[uiItems.length - 1], null);
	};

	// boxes.pushFile = function(f) {
	// 	var item = new Item();
	// 	item.init(f);

	// 	items.push(item);
	// 	uiItems.push(new UiItem(item));
	// 	draw();
	// };

	// boxes.pushUrl = function(url) {
	// 	var item = new Item();

	// 	// we must wait for the content to load, so we use a callback
	// 	item.initFromUrl(url, function() {
	// 		items.push(item);
	// 		uiItems.push(new UiItem(item));
	// 		draw();
	// 	});
	// };

	boxes.pushDropbox = function(f, meta) {
		var item = new Item(f, meta, '', 'Dropbox');

		items.push(item);
		uiItems.push(createItemDom(item));

		draw();
	};

	return boxes;
}());

function dropthebox() {
	var dbClient = new Dropbox.Client({
		key: '51rqcwrylm53i02'
	});

	dbClient.authenticate({}, function(error) {
		error && showError(error);
	});

	dbClient.readdir("/", function(error, entries) {
		if (error) {
			return showError(error);
		}

		entries.forEach(function(fileName) {
			dbClient.metadata(fileName, {}, function(error, stat) {
				if (error) {
					return showError(error);
				}

				if (stat.isFile) {
					dbClient.readFile(fileName, {
						blob: true
					}, function(error, data) {
						if (error) {
							return showError(error);
						}

						boxes.pushDropbox(data, stat);
					});
				}
			});
		});
	});
}

dropthebox();
