'use strict';

/* global newItem */
/* global createItemDom */
/* global Dropbox */
/* global showError */

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

	boxes.pushDropbox = function(meta) {
		var item = new Item(meta, 'Dropbox');

		items.push(item);
		uiItems.push(createItemDom(item));

		draw();
	};

	boxes.reset = function() {
		boxes = {};
		items = [];
		for (var i = 0, n = uiItems.length; i < n; i++) {
			uiItems[i].parentNode.removeChild(uiItems[i]);
		}

		uiItems = [];
	};

	boxes.dropbox = null;

	return boxes;
}());

function dropthebox() {
	var dbClient = new Dropbox.Client({
		key: '51rqcwrylm53i02'
	});

	dbClient.authenticate({}, function(error) {
		error && showError(error);
	});

	boxes.dropbox = dbClient;

	displayDir('/');

	function displayDir(rootPath) {
		boxes.reset();

		var rootElem = document.querySelector('.dirList');
		var kids = rootElem.childNodes;
		for (var i = 0, n = kids.length; i < n; i++) {
			rootElem.removeChild(kids[i]);
		}

		dbClient.readdir(rootPath, {}, function(error, entryNames, rootData, entriesData) {
			var listEntries = [];

			entriesData && entriesData.forEach(function(data, i) {
				// console.log(data.isFolder);
				if (data.isFolder) {
					listEntries.push({
						'name': entryNames[i],
						'path': entriesData[i].path
					});
				} else {
					boxes.pushDropbox(data);
				}
			});

			rootChooserDom(null, listEntries, function(i) {
				if (i === -1) {
					displayDir(rootPath.substring(0, rootPath.lastIndexOf('/')));
				} else {
					displayDir(listEntries[i].path);
				}
			});
		});
	}
}

dropthebox();