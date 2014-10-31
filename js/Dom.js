/**** DOM utilities ****/

// FIXME TODO rewrite all of these, at least rename the variables, cuz we ain't thieves and shit

function createDom(obj) {
	var args = {
		type: obj['type'] || null,
		attributes: obj['attributes'] || null,
		content: obj['content'] ? (Array.isArray(obj['content']) ? obj['content'] : [obj['content']]) : [],
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
	domElem.appendChild(container);
	return domElem;
};

/**** class operations ****/

function removeClasses(node, cn) {
	if (!node) {
		return;
	}

	(typeof cn === 'string') && (cn = [cn]);
	cn.forEach(function(c) {
		var rgx = new RegExp('\\b' + c + '\\b');
		node.className = node.className.replace(rgx, "");
		node.className = node.className.trim();
	});
};

function addClasses(node, cn) {
	if (!node) {
		return;
	}

	(typeof cn === 'string') && (cn = [cn]);
	cn.forEach(function(c) {
		if (node.className.indexOf(c) === -1) {
			node.className += ' ' + c;
			node.className = node.className.trim();
		}
	});
};

// function addRemoveClasses(node, cn, toggle) {
// 	toggle ? addClasses(node, cn) : removeClasses(node, cn);
// };

// function hasClass(node, cn) {
// 	return node && node.className.indexOf(cn) > -1;
// };

// function toggleClass(node, cn) {
// 	if (!node) {
// 		return;
// 	}

// 	(typeof cn === 'string') && (cn = [cn]);
// 	cn.forEach(function(c) {
// 		if (hasClass(node, c)) {
// 			removeClasses(node, [c]);
// 		} else {
// 			addClasses(node, [c]);
// 		}
// 	});
// };
