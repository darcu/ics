var boxes = (function() {
	var boxes = {};
	var items = [];
	var uiItems = [];

	var draw = function() {
		document.getElementById('list').insertBefore(uiItems[uiItems.length - 1].dom, null);
	};

	boxes.pushFile = function(f) {
		var item = new Item();
		item.initFromFile(f);

		items.push(item);
		uiItems.push(new UiItem(item));
		draw();
	};

	boxes.pushUrl = function(url) {
		var item = new Item();

		// we must wait for the content to load, so we use a callback
		item.initFromUrl(url, function() {
			items.push(item);
			uiItems.push(new UiItem(item));
			draw();
		});
	};

	return boxes;
}());

var URLS = [
	'./_resources/mongoose-free-5.4.1.exe',
	'./_resources/03.png',
	'./_resources/6.jpg',
	'./_resources/desktop.ini',
	'./_resources/Best-top-desktop-abstract-pattern-wallpapers-hd-wallpaper-pattern-pictures-and-images-34.jpg',
	'./_resources/Best-top-desktop-abstract-pattern-wallpapers-hd-wallpaper-pattern-pictures-and-images-4.jpg',
	'./_resources/Best-top-desktop-abstract-pattern-wallpapers-hd-wallpaper-pattern-pictures-and-images-5.jpg',
	'./_resources/Best-top-desktop-abstract-pattern-wallpapers-hd-wallpaper-pattern-pictures-and-images-11.jpg',
	'./_resources/Best-top-desktop-abstract-pattern-wallpapers-hd-wallpaper-pattern-pictures-and-images-8.jpg',
	'./_resources/Best-top-desktop-abstract-pattern-wallpapers-hd-wallpaper-pattern-pictures-and-images-52.jpg',
	'./_resources/4.jpg',
	'./_resources/cookie click',
	'./_resources/recovery.img',
	'./_resources/Strange Visitor_ A Conversation With Aphex Twin _ Features _ Pitchfork.pdf',
	'./_resources/rds plata.pdf',
	'./_resources/2560x1440-4.zip',
	'./_resources/npm-debug.log',
	'./_resources/5.jpg',
	'./_resources/2013071910481040-.jpg',
	'./_resources/10.jpg',
	'./_resources/Reader - 24 iun 2013 - darcu.ro@gmail.com-takeout.zip',
	'./_resources/8.jpg',
	'./_resources/Best-top-desktop-abstract-pattern-wallpapers-hd-wallpaper-pattern-pictures-and-images-21.jpg',
	'./_resources/hidden_universe_2560.png',
	'./_resources/subscriptions.xml',
	'./_resources/low_poly_flower_by_maty241-d5oy8q8.png',
	'./_resources/12.jpg',
	'./_resources/2560x1440-4.jpg',
	'./_resources/Dream_03_by_pr09studio.png',
	'./_resources/Best-top-desktop-abstract-pattern-wallpapers-hd-wallpaper-pattern-pictures-and-images-38.jpg',
	'./_resources/Best-top-desktop-abstract-pattern-wallpapers-hd-wallpaper-pattern-pictures-and-images-51.jpg',
	'./_resources/Best-top-desktop-abstract-pattern-wallpapers-hd-wallpaper-pattern-pictures-and-images-30.jpg',
	'./_resources/2.jpg',
	'./_resources/BoxCryptor-Backup.xml',
	'./_resources/Low_poly_mountain.png',
	'./_resources/1371146792980.jpg',
	'./_resources/16.jpg',
	'./_resources/Dream_01_by_pr09studio.png',
	'./_resources/01-50-21-meh.ro11741.jpg',
	'./_resources/05 Retrograde.mp3',
	'./_resources/11.jpg',
	'./_resources/15.jpg',
	'./_resources/Best-top-desktop-abstract-pattern-wallpapers-hd-wallpaper-pattern-pictures-and-images-1.jpeg',
	'./_resources/1.jpeg',
	'./_resources/7.jpeg',
	'./_resources/14.jpg',
	'./_resources/Best-top-desktop-abstract-pattern-wallpapers-hd-wallpaper-pattern-pictures-and-images-53.png',
	'./_resources/Solaris - Stanislaw Lem.epub',
	'./_resources/Best-top-desktop-abstract-pattern-wallpapers-hd-wallpaper-pattern-pictures-and-images-3.jpg',
	'./_resources/2013071910481040.jpg',
	'./_resources/GetReady_02.png',
	'./_resources/3.jpg',
	'./_resources/18.jpg',
	'./_resources/Orar_An_IV_AIA_2014_2015.pdf',
	'./_resources/Color-Bright-Flower-Patterns1.jpg',
	'./_resources/FreeGreatPicture.com-5310-background-wallpaper-pattern-pattern.jpg',
	'./_resources/9.jpg',
	'./_resources/the machine question.pdf',
	'./_resources/1375822904455 (1).jpg',
	'./_resources/17.jpg',
	'./_resources/wiki.txt',
];



// function initListeners() {
// 	// file upload listener
// 	document.getElementById('files').addEventListener('change', function(e) {
// 		var files = e.target.files;
// 		for (var i = 0, f; f = files[i]; i++) {
// 			boxes.pushFile(f);
// 		}
// 	}, false);
// 	// contentOverlay.initData();
// };

function loadPage() {
	for (var i = 0, n = URLS.length; i < n; i++) {
		boxes.pushUrl(URLS[i]);
	}
}

loadPage();
// initListeners();