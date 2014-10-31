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
		content.innerHTML = '';
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

	singleton.showImage = function(i) {
		showModal();

		var imageElem = createDom({
			'type': 'img',
			'attributes': {
				'class': 'photo',
				'src': i.url
			}
		});
		content.appendChild(imageElem);
	};

	singleton.showText = function(i) {
		showModal();

		textFromFile(i.file, function(text) {
			var codeExt = ['css', 'html'],
				textElem = createDom({
					'type': 'div',
					'attributes': {
						'class': 'text'
					},
					'events': {
						'click': function(e) {
							e.stopPropagation();
						}
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
							'type': (i.mime === 'text' ? 'p' : 'code'),
							'content': text
						})
					]
				});
			content.appendChild(textElem);
		});
	};

	return singleton;
})();