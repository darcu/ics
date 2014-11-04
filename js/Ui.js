// add a new to the page from a file
function createItemDom(i) {
	// now, we create the dom element and assign it its properties
	var item = document.createElement('li');
	item.className = 'item';

	switch (i.mime) {
		// images are displayed as thumbnails
		case 'image':
			var imageDom = createDom({
				'type': 'div',
				'attributes': {
					'class': isMobile() ? 'box photo mobile' : 'box photo'
				},
				'content': [
					createDom({
						'type': 'img',
						'attributes': {
							'src': i.url
						}
					}),
					createDom({
						'type': 'div',
						'attributes': {
							'class': 'overlay'
						}
					})
				],
				'events': {
					'click': function(e) {
						contentOverlay.showImage(i);
						return false;
					}
				}
			});
			item.appendChild(imageDom);
			break;
		case 'text':
		case 'code':
			textFromFile(i.file, function(text) {
				var textDom = createDom({
					'type': 'div',
					'attributes': {
						'class': 'box text'
					},
					'events': {
						'click': function(e) {
							contentOverlay.showText(i);
							return false;
						}
					},
					'content': [
						createDom({
							'type': (i.mime === 'text' ? 'p' : 'code'),
							'attributes': {
								'class': 'fullContent'
							},
							'content': text,
						}),
						createDom({
							'type': 'p',
							'attributes': {
								'class': 'title'
							},
							'content': i.name
						})
					]
				});
				item.appendChild(textDom);
			});
			break;
		default:
			var extClass = i.mime || '',
				downloadDom = createDom({
					'type': 'div',
					'attributes': {
						'class': 'box download ' + extClass
					},
					'content': [
						createDom({
							'type': 'a',
							'attributes': {
								'class': 'downloadButton',
								'href': i.url
							}
						}),
						createDom({
							'type': 'div',
							'attributes': {
								'class': 'details'
							},
							'content': [
								createDom({
									'type': 'p',
									'attributes': {
										'class': 'title'
									},
									'content': i.name
								}),
								createDom({
									'type': 'p',
									'attributes': {
										'class': 'size'
									},
									'content': bytesToSize(i.size)
								})
							]
						})
					]
				});
			item.appendChild(downloadDom);
	}

	(i.mime === 'image') && calcImgHeight(i.url, function(aspect) {
		var className = (aspect >= 1 ? 'hor' : 'vert');
		addClasses(imageDom.getElementsByTagName('img')[0], className);
	});

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

	function hideModal(e) {
		imageElem.src = '';
		textDom.innerHTML
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
		'attributes': {
			'id': 'overlay',
			'class': 'hide',
		},
		'content': [
			content = createDom({
				'type': 'div',
				'attributes': {
					'class': 'content'
				}
			}),
			createDom({
				'type': 'button',
				'attributes': {
					'class': 'close'
				}
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
		'attributes': {
			'class': 'photo hide'
			/*,
			'src': i.url*/
		}
	});
	content.appendChild(imageElem);

	var textDom = createDom({
		// 'type': (i.mime === 'text' ? 'p' : 'code')
		'type': 'p'
	});

	var titleDom = createDom({
		'type': 'p',
		'attributes': {
			'class': 'title'
		}
	});

	var textElem = createDom({
		'type': 'div',
		'attributes': {
			'class': 'text hide'
		},
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