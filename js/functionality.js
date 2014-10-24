$(document).ready(function(){

	var pulamea = Utils.createDom({
		'type': 'div',
		'attributes': {
			'class': 'na',
			'id': 'membru'
		},
		'events': {
			'click': function(){
				alert('we have a winner');
			}
		}
	});
	$('body').append(pulamea);
});

