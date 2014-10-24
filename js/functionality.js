document.addEventListener('DOMContentLoaded', function() {
	var items = document.getElementsByClassName('item');

	for (var i = 0, n = items.length; i < n; i++) {
		items[i].addEventListener('click', function(e) {
			for (var j = 0, n = items.length; j < n; j++) {
				Utils.hasClass(items[j], 'selected') && Utils.removeClasses(items[j], 'selected', false);
			}
			window.scrollTo(0,  e.currentTarget.offsetTop + e.currentTarget.offsetHeight);
			Utils.addClasses(e.currentTarget, 'selected');
		});
	}
});