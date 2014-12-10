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


function ini() {
	dropthebox();
}

function dropthebox() {
	boxes.dropbox = dbClient;

	Header.showButton();

	if (dbClient.isAuthenticated()) {
		console.log('is auth');
		Header.setButtonCallback(logout);
		getAccountInfo();
	} else {
		console.log('is not auth');
		Header.setButtonCallback(login);
	}
}

ini();