function createItemDom(i, clickHandler) {
	// now, we create the dom element and assign it its properties
	var item = document.createElement('li');
	item.className = 'item';
	item.addEventListener('click', clickHandler);
	if (i.mime === 'image') {
		var imageDom = Dom.createDom({
			'type': 'div',
			'attributes': {
				'class': isMobile() ? 'box photo mobile' : 'box photo'
			},
			'content': [
				Dom.createDom({
					'type': 'img',
					'attributes': {
						'src': i.url
					}
				}),
				Dom.createDom({
					'type': 'div',
					'attributes': {
						'class': 'overlay'
					}
				})
			]
		});
		item.appendChild(imageDom);
	} else if (i.mime === 'text') {
		textFromFile(i.file, function(text) {
			var textDom = Dom.createDom({
				'type': 'div',
				'attributes': {
					'class': 'box text'
				},
				'content': [
					Dom.createDom({
						'type': 'p',
						'attributes': {
							'class': 'fullContent'
						},
						'content': text
					}),
					Dom.createDom({
						'type': 'div',
						'attributes': {
							'class': 'expand'
						},
						'content': [
							Dom.createDom({
								'type': 'p',
								'content': 'View full post'
							})
						]
					})
				]
			});
			item.appendChild(textDom);
		});
	} else {
		var ext = getExtFromType(i.type),
			downloadDom = Dom.createDom({
				'type': 'div',
				'attributes': {
					'class': 'box download ' + ext
				},
				'content': [
					Dom.createDom({
						'type': 'a',
						'attributes': {
							'class': 'downloadButton',
							'href': i.url
						}
					}),
					Dom.createDom({
						'type': 'div',
						'attributes': {
							'class': 'details'
						},
						'content': [
							Dom.createDom({
								'type': 'p',
								'attributes': {
									'class': 'title'
								},
								'content': i.name
							}),
							Dom.createDom({
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

function smoothScrollTo(target, duration) {
	var timer,
		start = Date.now(),
		factor = 0,
		offset = window.pageYOffset,
		delta = target - window.pageYOffset;
	duration = duration || 1000;

	if (timer) {
		clearInterval(timer);
	}

	var step = function() {
		var y;
		factor = (Date.now() - start) / duration;
		if (factor >= 1) {
			clearInterval(timer);
			factor = 1;
		}
		y = factor * delta + offset;
		window.scrollBy(0, y - window.pageYOffset);
	};

	timer = setInterval(step, 10);
	return timer;
}