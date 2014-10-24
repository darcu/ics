var Utils = {};

Utils.createDom = function(obj) {
	var args = {
		type: obj['type'] || null,
		attributes: obj['attributes'] || null,
		content: obj['content'] ? (obj['content'].isArray ? obj['content'] : [obj['content']]) : [],
		events: obj['events'] || {}
	};
	var domElem = document.createElement(args['type']);
	
	for (var i in args.attributes) {
		args.attributes.hasOwnProperty(i) && domElem.setAttribute(i, args.attributes[i]);
	}
	for (var i in args.events) {
		args.events.hasOwnProperty(i) && domElem.addEventListener(i, args.events[i]);
	}
	var container = document.createDocumentFragment();
	for (var i = 0, n = args.content.length; i < n; i += 1) {
		args.content[i] && container.appendChild( typeof args.content[i] == "string" || typeof args.content[i] == "number" ? document.createTextNode(args.content[i]) : args.content[i]);
	}
	container.appendChild(domElem);
	return domElem;
};