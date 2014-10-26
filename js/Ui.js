function createItemDom(i, clickHandler) {
	// now, we create the dom element and assign it its properties
	var item = document.createElement('li');
	item.className = 'item';
	item.addEventListener('click', clickHandler);

	if (i.mime === 'image') {
		// item.innerHTML = '<div class="box photo" style="background-image: url(' + url + ');"><div class="overlay"></div></div>';
		item.innerHTML = '<div class="box photo"><img src="' + i.url + '"><div class="overlay"></div></div>';
	} else if (i.mime === 'text') {
		textFromFile(i.file, function(text) {
			item.innerHTML = '<div class="box"><p>' + text + '</p></div>';
		});
	} else {
		item.innerHTML = '<div class="box"><a href="' + i.url + '">' + i.name + '</a></div>';
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