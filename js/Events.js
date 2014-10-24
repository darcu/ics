var Event = (function() {
	// the global Event object
	var ev = {};

	// a container for all the events
	var events = {};

	// all listened events referenced by ids
	var ids = {};

	// ev.create = function(type, phase) {
	// 	events.type || (events.type = {});
	// 	events.type.phase = phase;
	// };

	// add a new event of the 'type' and 'phase'
	// FIXME TODO add a standard list of events
	ev.add = function(type, phase, callback) {
		events.type || (events.type = {});
		events.type.phase || (events.type.phase = []);
		events.type.phase.push(callback);

		var id = genRandomString();
		ids.id = {
			'index': events.type.phase.length - 1,
			'ev': events.type.phase
		}

		return id;
	};

	// remove an event by id
	ev.remove = function(id) {
		ids.id && ids.id.ev.splice(ids.id.index, 1);
	};

	// trigger an event of 'type' and 'phase' with optional 'arguments'
	ev.trigger = function(type, phase, arguments) {
		for (var i = 0, n = (events.type && events.type.phase && events.type.phase.length) || 0; i < n; i++) {
			events.type.phase[i]({
				'type': type,
				'phase': phase,
				'arguments': arguments
			});
		}
	};

	return ev;
}());