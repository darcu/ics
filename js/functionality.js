$(document).ready(function(){
	var box = $('.box');
	$.each(box, function(key, value){
		$(value).height($(value).width());
		console.log();
	});
});