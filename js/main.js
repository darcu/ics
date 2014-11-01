var boxes = (function() {
	var boxes = {};
	var items = [];
	var uiItems = [];

	var draw = function() {
		document.getElementById('list').insertBefore(uiItems[uiItems.length - 1].dom, null);
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
		var item = new Item();

		// we must wait for the content to load, so we use a callback
		item.initFromDropbox(f, meta);

		items.push(item);
		uiItems.push(new UiItem(item));

		draw();
	};

	return boxes;
}());

function dropthebox() {
	var client = new Dropbox.Client({
		key: '51rqcwrylm53i02'
	});

	client.authenticate({}, function(error) {
		error && showError(error);
	});

	client.readdir("/", function(error, entries) {
		if (error) {
			return showError(error);
		}

		entries.forEach(function(fileName) {
			client.metadata(fileName, {}, function(error, stat) {
				if (error) {
					return showError(error);
				}

				if (stat.isFile) {
					client.readFile(fileName, {
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
