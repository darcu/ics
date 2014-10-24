// FIXME TODO rewrite all of these, at least rename the variables, cuz we ain't thieves and shit

var Dom = {};

Dom.createDom = function(obj) {
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
		args.content[i] && container.appendChild(typeof args.content[i] == "string" || typeof args.content[i] == "number" ? document.createTextNode(args.content[i]) : args.content[i]);
	}
	container.appendChild(domElem);
	return domElem;
};

Dom.removeClasses = function(node, aClass) {
	if (!node) {
		return;
	}

	(typeof aClass === 'string') && (aClass = [aClass]);
	aClass.forEach(function(c) {
		var rgx = new RegExp('\\b' + c + '\\b');
		node.className = node.className.replace(rgx, "");
		node.className = node.className.trim();
	});
};

Dom.addClasses = function(node, aClass) {
	if (!node) {
		return;
	}

	(typeof aClass === 'string') && (aClass = [aClass]);
	aClass.forEach(function(c) {
		if (node.className.indexOf(c) === -1) {
			node.className += ' ' + c;
			node.className = node.className.trim();
		}
	});
};

Dom.addRemoveClasses = function(node, aClass, toggle) {
	toggle ? Dom.addClasses(node, aClass) : Dom.removeClasses(node, aClass);
};

Dom.hasClass = function(node, aClass) {
	return node && node.className.indexOf(aClass) > -1;
};

Dom.toggleClass = function(node, aClass) {
	if (!node) {
		return;
	}

	(typeof aClass === 'string') && (aClass = [aClass]);
	aClass.forEach(function(c) {
		if (Dom.hasClass(node, c)) {
			Dom.removeClasses(node, [c]);
		} else {
			Dom.addClasses(node, [c]);
		}
	});
};