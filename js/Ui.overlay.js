/**
 *  Overlay for each type of content. It appears when the user selects a file (box)
 *
 */

var contentOverlay = (function() {
	var singleton,
		mainElement,
		content;

	// main dom, unique for all the file types
	mainElement = Dom.createDom({
		'type': 'div',
		'attributes': {
			'id': 'overlay',
			'class': 'hide',
		},
		'content': [
			content = Dom.createDom({
				'type': 'div',
				'attributes': {
					'class': 'content'
				}
			}),
			Dom.createDom({
				'type': 'button',
				'attributes': {
					'class': 'close'
				},
				'events': {
					'click': function(e) {
						Dom.addClasses(mainElement, 'hide');
					}
				}
			})
		],
		'events': {
			'click': function(e) {
				Dom.addClasses(mainElement, 'hide');
			}
		}
	});
	document.body.appendChild(mainElement);


	var init = function() {
		this.file = {};

		this.initData = function(args) {
			this.file = args;

			Dom.removeClasses(mainElement, 'hide');

			this.cleanDom();

			this.checkMime();
		};

		//clean previous dom appending
		this.cleanDom = function() {
			content.innerHTML = '';
		};

		//check for mime and build custom dom for each type
		this.checkMime = function() {
			switch (this.file.mime) {
				case 'image':
					this.imageDom();
					return;
				case 'text':
					this.textDom();
					return;
				default:
					this.defaultDom();
					return;
			}
		};

		//image custom dom
		this.imageDom = function() {
			var imageElem = Dom.createDom({
				'type': 'img',
				'attributes': {
					'class': 'photo',
					'src':  this.file.url
				}
			});
			content.appendChild(imageElem);
		};

		//text custom dom
		this.textDom = function() {
			textFromFile(this.file.file, function(text) {
				var textElem = Dom.createDom({
					'type': 'div',
					'attributes': {
						'class': 'text'
					},
					'content': text
				});
				content.appendChild(textElem);
			});
		};

		//default file dom
		this.defaultDom = function() {
			textFromFile(this.file.file, function(text) {
				var defaultDom = Dom.createDom({
					'type': 'div',
					'attributes': {
						'class': 'default'
					}
				});
				content.appendChild(defaultDom);
			});
		};

	};

	singleton = new init();

	return singleton;
})();