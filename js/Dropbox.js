'use strict';

var dbClient = new Dropbox.Client({
	key: '51rqcwrylm53i02'
});

function getAccountInfo() {
	displayDir('/');
	dbClient.getAccountInfo({}, function(error, info) {
		console.log('get acc info');

		User(info);
		Header.updateName(User.name);
	});
}

function displayDir(rootPath) {
	boxes.reset();

	// clean up list
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

var login = function() {
	console.log('login');
	dbClient.authenticate({}, function(error) {
		if (error) {
			showError(error);
			return;
		}

		getAccountInfo();
	});
	Header.setButtonCallback(logout);
}

var logout = function() {
	console.log('logout');
	dbClient.signOut({}, function(e) {
		console.log('logged out');
	});
	document.location.reload();
}