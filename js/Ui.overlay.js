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
				},
				'events': {
					'click': function(e) {
						e.stopPropagation();
					}
				}
			}),
			Dom.createDom({
				'type': 'button',
				'attributes': {
					'class': 'close'
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
		this.data = {};

		this.initData = function(args) {
			this.data = args;

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
			switch (this.data.mime) {
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
					'src': this.data.url
				}
			});
			content.appendChild(imageElem);
		};

		//text custom dom
		this.textDom = function() {
			textFromFile(this.data.file, function(text) {
				var codeExt = ['css', 'html'],
					textElem = Dom.createDom({
						'type': 'div',
						'attributes': {
							'class': 'text'
						},
						'content': [
							Dom.createDom({
								'type': codeExt.indexOf(getExtFromType(this.data.file.type)) !== -1 ? 'code' : 'p',
								'content': text
							})
						]
					});
				content.appendChild(textElem);
			}.bind(this));
		};

		//default file dom
		this.defaultDom = function() {
			textFromFile(this.data.file, function(text) {
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