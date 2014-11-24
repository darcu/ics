'use strict';

/* global createDom */
/* global TYPE */
/* global isMobile */
/* global textFromFile */
/* global bytesToSize */
/* global calcImgHeight */
/* global addClasses */
/* global removeClasses */
/* global boxes */
/* global urlFromFile */
/* global showError */

function rootChooserDom(parentElem, dirs, callback) {
	!parentElem && (parentElem = document.querySelector('.dirList'));

	var list = createDom({
		'type': 'ul',
		'content': createDom({
			'type': 'li',
			'classes': 'root listItem',
			'content': '..',
			'events': {
				'click': function(e) {
					callback(-1);
				}
			}
		})
	});

	// for (var i = 0, n = dirNames.length; i < n; i++) {
	dirs.forEach(function(dir, i) {
		list.appendChild(createDom({
			'type': 'li',
			'classes': 'listItem',
			'content': dir.name,
			'events': {
				'click': function(e) {
					callback(i);
				}
			}
		}));
	});

	parentElem.appendChild(list);
}

// add a new to the page from a file
function createItemDom(i) {
	function draw() {
		switch (i.type.type) {
			// images are displayed as thumbnails
			case TYPE.IMAGE:
				var imageDom = createDom({
					'type': 'div',
					'class': isMobile() ? 'box photo mobile' : 'box photo',
					'content': [
						createDom({
							'type': 'img',
							'src': i.url
						}),
						createDom({
							'type': 'div',
							'class': 'overlay'
						})
					],
					'events': {
						'click': function() {
							contentOverlay.showImage(i);
							return false;
						}
					}
				});
				item.appendChild(imageDom);
				break;
			case TYPE.TEXT:
				// case 'code':
				textFromFile(i.file, function(text) {
					var textDom = createDom({
						'type': 'div',
						'class': 'box text',
						'events': {
							'click': function() {
								contentOverlay.showText(i);
								return false;
							}
						},
						'content': [
							createDom({
								// TODO change this
								'type': (i.type.splitMime[0] === 'text' ? 'p' : 'code'),
								'class': 'fullContent',
								'content': text
							}),
							createDom({
								'type': 'p',
								'class': 'title',
								'content': i.name
							})
						]
					});
					item.appendChild(textDom);
				});
				break;
			default:
				var extClass = i.type.className || '',
					downloadDom = createDom({
						'type': 'div',
						'class': 'box download ' + extClass,
						'content': [
							createDom({
								'type': 'a',
								'class': 'downloadButton',
								'href': i.url
							}),
							createDom({
								'type': 'div',
								'class': 'details',
								'content': [
									createDom({
										'type': 'p',
										'class': 'title',
										'content': i.name
									}),
									createDom({
										'type': 'p',
										'class': 'size',
										'content': bytesToSize(i.size)
									})
								]
							})
						]
					});
				item.appendChild(downloadDom);
		}

		(i.type.type === TYPE.IMAGE) && calcImgHeight(i.url, function(aspect) {
			var className = (aspect >= 1 ? 'hor' : 'vert');
			addClasses(imageDom.getElementsByTagName('img')[0], className);
		});
	}

	// now, we create the dom element and assign it its properties
	var item = document.createElement('li');
	item.className = 'item';

	if (i.type.type) {
		boxes.dropbox.readFile(i.path, {
				blob: true
			},
			function(error, data) {
				if (error) {
					return showError(error);
				}

				i.file = data;
				i.url = urlFromFile(i.file);

				draw();
			});
	} else {
		draw();
	}

	return item;
}

/**
 *  Overlay for each type of content. It appears when the user selects a file (box)
 *
 */

var contentOverlay = (function() {
	var singleton = {},
		container,
		content;

	function hideModal() {
		imageElem.src = '';
		textDom.innerHTML;
		addClasses(textElem, 'hide');
		addClasses(imageElem, 'hide');
		addClasses(container, 'hide');
	}

	function showModal() {
		removeClasses(container, 'hide');
	}

	window.addEventListener('keyup', function(e) {
		// close on ESC key
		e.keyCode === 27 && hideModal(e);
	}, false);

	// main dom, unique for all the file types
	container = createDom({
		'type': 'div',
		'id': 'overlay',
		'class': 'hide',
		'content': [
			content = createDom({
				'type': 'div',
				'class': 'content'
			}),
			createDom({
				'type': 'button',
				'class': 'close'
			})
		],
		'events': {
			'click': function(e) {
				hideModal(e);
			}
		}
	});
	document.body.appendChild(container);

	var imageElem = createDom({
		'type': 'img',
		'class': 'photo hide'
			/*,
			'src': i.url*/
	});
	content.appendChild(imageElem);

	var textDom = createDom({
		// 'type': (i.mime === 'text' ? 'p' : 'code')
		'type': 'p'
	});

	var titleDom = createDom({
		'type': 'p',
		'class': 'title'
	});

	var textElem = createDom({
		'type': 'div',
		'class': 'text hide',
		'events': {
			'click': function(e) {
				e.stopPropagation();
			}
		},
		'content': [
			titleDom,
			textDom
		]
	});
	content.appendChild(textElem);

	singleton.showImage = function(i) {
		showModal();
		imageElem.src = i.url;
		removeClasses(imageElem, 'hide');
	};

	singleton.showText = function(i) {
		showModal();

		textFromFile(i.file, function(text) {
			titleDom.innerHTML = i.name;
			textDom.innerHTML = text;
			removeClasses(textElem, 'hide');
		});
	};

	return singleton;
})();