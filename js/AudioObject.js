/* global createDom */
/* global console */
/* global addClasses */
/* global removeClasses */

var audioPlayer = (function() {
	var singleton = {},
		tracks = {},
		currentTrackID = '',
		currentElement = '',
		audio = new Audio();

	var audioName,
		audioCoverImage,
		audioTime,
		audioTracker,
		audioProgress,
		audioPin,
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
							},
							'events': {
								'click': function() {
									singleton.playTrack(currentTrackID);
								}
							}
						}),
						createDom({
							'type': 'div',
							'attributes': {
								'class': 'pause'
							},
							'events': {
								'click': function() {
									singleton.pauseTrack();
								}
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
							'type': 'p',
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
							},
							'content': [
								audioProgress = createDom({
									'type': 'div',
									'attributes': {
										'class': 'progress'
									}
								}),
								audioPin = createDom({
									'type': 'div',
									'attributes': {
										'class': 'pin'
									}
								})
							]
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
		addClasses(musicDom, 'playing');
		if (id !== currentTrackID) {
			//TODO @Stefan replace when we'll have an ID
			currentElement = document.querySelector('[data-id=' + (currentTrackID || id).replace(/[0-9]/g, '').replace(' ', '') + ']');
			removeClasses(currentElement, 'playing');
			currentTrackID = id;
			audio.src = tracks[id]['url'];
			audio.play();
			populateDom(tracks[id]);
		} else {
			currentTrackID = id;
			audio.play();
		}

		currentElement = document.querySelector('[data-id=' + id.replace(/[0-9]/g, '').replace(' ', '') + ']');
		addClasses(currentElement, 'playing');
		return audio;
	};

	//for now we use the name instead of ID (to replace).
	singleton.pauseTrack = function() {
		removeClasses(musicDom, 'playing');
		audio.pause();
	};

	//play the next track in list. If last, play the first one.
	singleton.nextTrack = function() {
		var nextTrackID = getNextTrack(tracks, currentTrackID).name;
		singleton.playTrack(nextTrackID);
		currentTrackID = nextTrackID;
	};

	//play the previous track in list. If first, play the last one.
	singleton.prevTrack = function() {
		var prevTrackID = getPrevTrack(tracks, currentTrackID).name;
		singleton.playTrack(prevTrackID);
		currentTrackID = prevTrackID;
	};

	singleton.displayTracks = function() {
		console.log(tracks);
	};

	//get next element in object
	function getNextTrack(obj, key) {
		var keys = Object.keys(obj),
			i = keys.indexOf(key);
		return (i !== -1 && keys[i + 1]) ? obj[keys[i + 1]] : obj[keys[0]];
	}

	//get next element in object
	function getPrevTrack(obj, key) {
		var keys = Object.keys(obj),
			i = keys.indexOf(key);
		return (i !== -1 && keys[i - 1]) ? obj[keys[i - 1]] : obj[keys[keys.length - 1]];
	}

	function populateDom(obj) {
		//audioCoverImage cand o fi

		audioName.innerHTML = obj.name;

		audioEvents();
		pinEvents();
		trackerEvents();
	}

	function audioEvents() {
		audio.addEventListener('timeupdate', function() {
			var percentage = audio.currentTime * 100 / audio.duration;
			audioProgress.style.width = percentage + '%';
			audioPin.style.left = percentage + '%';
		}, false);

	}

	function trackerEvents() {
		audioTracker.addEventListener('click', function(e) {
			e.stopPropagation();
			var offsetX = e.offsetX,
				width = e.currentTarget.offsetWidth,
				percentage = offsetX * 100 / width;
			audio.currentTime = audio.duration * percentage / 100;

		}, false);
	}

	function pinEvents() {
		var width = audioTracker.offsetWidth,
			percentage = 0,
			selected = null;

		audioPin.addEventListener('mousedown', function(e) {
			e.stopPropagation();
			selected = audioPin;
		}, false);

		audioTracker.addEventListener('mousemove', function(e) {
			e.stopPropagation();
			setTimeout(function() {
				percentage = e.offsetX * 100 / width;
				if (selected !== null) {
					audio.currentTime = audio.duration * percentage / 100;
				}
			}, 100);

		}, false);

		audioTracker.addEventListener('mouseup', function(e) {
			e.stopPropagation();
			percentage = e.offsetX * 100 / width;
			if (selected !== null) {
				audio.currentTime = audio.duration * percentage / 100;
			}
			selected = null;
		}, false);
	}


	return singleton;
})();