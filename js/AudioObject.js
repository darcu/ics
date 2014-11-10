var audioPlayer = (function() {
	var singleton = {},
		tracks = {},
		currentTrack = '',
		audio = new Audio();

	var audioName,
		audioCoverImage,
		audioTime,
		audioTracker,
		audioDom = createDom({
			'type': 'div',
			'attributes': {
				'class': 'mp3Player'
			},
			'content': [
				audioCoverImage = createDom({
					'type': 'div',
					'attributes': {
						'class': 'coverImage'
					}
				}),
				createDom({
					'type': 'div',
					'attributes': {
						'class': 'controls'
					},
					'content': [
						createDom({
							'type': 'div',
							'attributes': {
								'class': 'prev'
							},
							'events': {
								'click': function() {
									singleton.prevTrack();
								}
							}
						}),
						createDom({
							'type': 'div',
							'attributes': {
								'class': 'play'
							}
						}),
						createDom({
							'type': 'div',
							'attributes': {
								'class': 'next'
							},
							'events': {
								'click': function() {
									singleton.nextTrack();
								}
							}
						})
					]
				}),
				createDom({
					'type': 'div',
					'attributes': {
						'class': 'details'
					},
					'content': [
						audioName = createDom({
							'type': 'div',
							'attributes': {
								'class': 'name'
							}
						}),
						audioTime = createDom({
							'type': 'div',
							'attributes': {
								'class': 'time'
							}
						}),
						audioTracker = createDom({
							'type': 'div',
							'attributes': {
								'class': 'tracker'
							}
						})
					]
				})
			]
		});
	document.getElementsByClassName('content')[0].appendChild(audioDom);

	//for now we use the name instead of ID (to replace).
	singleton.addTrack = function(track) {
		tracks[track.name] = track;
	};

	//for now we use the name instead of ID (to replace).
	singleton.playTrack = function(id) {
		if (id !== currentTrack) {
			currentTrack = id;
			audio.src = tracks[id]['url'];
			audio.play();
			populateDom(tracks[id]);
		} else {
			currentTrack = id;
			audio.play();
		}
		return audio;
	};

	//for now we use the name instead of ID (to replace).
	singleton.pauseTrack = function() {
		audio.pause();
	};

	//play the next track in list. If last, play the first one.
	singleton.nextTrack = function() {
		var nextTrackID = nextTrack(tracks, currentTrack).name;
		singleton.playTrack(nextTrackID);
		currentTrack = nextTrackID;
	};

	//play the previous track in list. If first, play the last one.
	singleton.prevTrack = function() {
		var prevTrackID = prevTrack(tracks, currentTrack).name;
		singleton.playTrack(prevTrackID);
		currentTrack = prevTrackID;
	};

	singleton.displayTracks = function() {
		console.log(tracks);
	};

	//get next element in object
	function nextTrack(obj, key) {
		var keys = Object.keys(obj),
			i = keys.indexOf(key);
		return (i !== -1 && keys[i + 1]) ? obj[keys[i + 1]] : obj[keys[0]];
	};

	//get next element in object
	function prevTrack(obj, key) {
		var keys = Object.keys(obj),
			i = keys.indexOf(key);
		return (i !== -1 && keys[i - 1]) ? obj[keys[i - 1]] : obj[keys[keys.length - 1]];
	};

	function populateDom(obj) {
		//audioCoverImage cand o fi

		audioName.innerHTML = obj.name;

		audioEvents();
	};

	function audioEvents() {

	}



	return singleton;
})();