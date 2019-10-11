/* eslint-disable */
// adapted from https://codepen.io/Shihab993/pen/YjqZMg
const VideoPlayer = function(t) {
  function setAttributes(el, options) {
    Object.keys(options).forEach(function(attr) {
      el.setAttribute(attr, options[attr]);
    });
  }
  this.s = {
    play:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.cls-1{fill:#fff;}</style></defs><g><g><g><path class="cls-1" d="M35.94,17.8c2,1.2,2,3.1,0,4.3L6.26,39.49c-2,1.2-3.7.2-3.7-2.1V2.61c0-2.3,1.6-3.3,3.7-2.1Z"/></g></g></g></svg>',
    pause:
      '<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Artboard 1</title><g><g><path class="cls-1" d="M23.59,4.39A4.42,4.42,0,0,1,27.88,0h4.89a4.29,4.29,0,0,1,4.29,4.39V35.61A4.42,4.42,0,0,1,32.77,40H27.88a4.29,4.29,0,0,1-4.29-4.39Zm-20.65,0A4.42,4.42,0,0,1,7.23,0h4.89a4.29,4.29,0,0,1,4.29,4.39V35.61A4.42,4.42,0,0,1,12.12,40H7.23a4.29,4.29,0,0,1-4.29-4.39Z"/></g></g></svg>',
    replay:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.cls-1{fill:#fff;}</style></defs><g><g><path class="cls-1" d="M39.94,15.66V.06L34,6A19.74,19.74,0,0,0,17.94.26c-.3,0-.6.1-.9.1s-.7.1-1.1.2a3.55,3.55,0,0,1-1,.2c-.3.1-.6.1-.9.2l-.9.3-.9.3c-.3.1-.6.3-.9.4s-.6.3-.9.4a3.51,3.51,0,0,0-.8.5c-.3.2-.6.3-.9.5l-.9.6c-.2.2-.5.3-.7.5a18.53,18.53,0,0,0-2.8,2.8,3,3,0,0,0-.5.7l-.6.9a4.05,4.05,0,0,0-.5.9c-.2.3-.3.5-.5.8a3.55,3.55,0,0,0-.4.9c-.1.3-.3.6-.4.9l-.3.9c-.1.3-.2.6-.3,1a2.92,2.92,0,0,0-.2.9,3.55,3.55,0,0,0-.2,1c-.1.3-.1.7-.2,1.1s-.1.6-.1.9a25.39,25.39,0,0,0,0,3.9c0,.3.1.6.1.9a4.25,4.25,0,0,0,.2,1.1,3.55,3.55,0,0,1,.2,1c.1.3.1.6.2.9l.3.9.3.9c.1.3.3.6.4.9s.3.6.4.9a3.51,3.51,0,0,0,.5.8c.2.3.3.6.5.9l.6.9c.2.2.3.5.5.7a18.53,18.53,0,0,0,2.8,2.8,3,3,0,0,0,.7.5l.9.6a4.05,4.05,0,0,0,.9.5c.3.2.5.3.8.5a3.55,3.55,0,0,0,.9.4c.3.1.6.3.9.4l.9.3.9.3a2.92,2.92,0,0,0,.9.2,3.55,3.55,0,0,0,1,.2c.3.1.7.1,1.1.2s.6.1.9.1a25.39,25.39,0,0,0,3.9,0c.3,0,.6-.1.9-.1a4.25,4.25,0,0,0,1.1-.2,3.55,3.55,0,0,1,1-.2c.3-.1.6-.1.9-.2l.9-.3.9-.3c.3-.1.6-.3.9-.4s.6-.3.9-.4a3.51,3.51,0,0,0,.8-.5c.3-.2.6-.3.9-.5l.9-.6c.2-.2.5-.3.7-.5a19.81,19.81,0,0,0,7.3-15.4h-5.2a14.74,14.74,0,0,1-4.3,10.4,11,11,0,0,1-1.1,1c-.2.1-.3.3-.5.4s-.4.3-.6.5-.4.3-.6.4a2.09,2.09,0,0,0-.6.4,4.88,4.88,0,0,1-.7.3l-.6.3a1.45,1.45,0,0,1-.7.2,1.85,1.85,0,0,1-.7.2,6.37,6.37,0,0,1-.7.2c-.2.1-.5.1-.7.2a2.2,2.2,0,0,1-.8.1c-.2,0-.4.1-.7.1-.5,0-1,.1-1.5.1a7.57,7.57,0,0,1-1.5-.1c-.2,0-.4-.1-.7-.1s-.5-.1-.8-.1a1.85,1.85,0,0,1-.7-.2,6.37,6.37,0,0,0-.7-.2,1.85,1.85,0,0,0-.7-.2,1.45,1.45,0,0,0-.7-.2l-.6-.3a4.88,4.88,0,0,0-.7-.3,2.09,2.09,0,0,1-.6-.4,2.09,2.09,0,0,1-.6-.4,2.65,2.65,0,0,1-.6-.5,2.18,2.18,0,0,1-.5-.4,10,10,0,0,1-1.1-1h0a11,11,0,0,1-1-1.1,2.18,2.18,0,0,0-.4-.5c-.2-.2-.3-.4-.5-.6s-.3-.4-.4-.6l-.3-.6a4.88,4.88,0,0,1-.3-.7l-.3-.6a1.45,1.45,0,0,1-.2-.7,1.85,1.85,0,0,1-.2-.7c-.1-.2-.1-.5-.2-.7s-.1-.5-.2-.7a2.2,2.2,0,0,1-.1-.8c0-.2-.1-.4-.1-.6,0-.5-.1-1-.1-1.5a7.57,7.57,0,0,1,.1-1.5c0-.2.1-.4.1-.6s.1-.5.1-.8a1.85,1.85,0,0,1,.2-.7c.1-.2.1-.5.2-.7a1.85,1.85,0,0,0,.2-.7,1.45,1.45,0,0,0,.2-.7l.3-.6c.1-.2.2-.5.3-.7a2.09,2.09,0,0,1,.4-.6c.1-.2.3-.4.4-.6a2.65,2.65,0,0,1,.5-.6,2.18,2.18,0,0,1,.4-.5,10,10,0,0,1,1-1.1h0a11,11,0,0,1,1.1-1,2.18,2.18,0,0,0,.5-.4c.2-.2.4-.3.6-.5s.4-.3.6-.4a2.09,2.09,0,0,0,.6-.4,4.88,4.88,0,0,1,.7-.3l.6-.3a1.45,1.45,0,0,1,.7-.2c.2-.1.5-.2.7-.3a6.37,6.37,0,0,1,.7-.2c.2-.1.5-.1.7-.2s.5-.1.8-.1.4-.1.7-.1c.5,0,1-.1,1.5-.1a14.52,14.52,0,0,1,10.4,4.3l-6,6Z"/></g></g></svg>',
    mute:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M10.25,11.35l8.5-10.3c1.4-1.7,2.6-1.3,2.6,1V38c0,2.3-1.2,2.7-2.6,1l-8.5-10.3H6.45a4.06,4.06,0,0,1-4.1-4.1v-9a4.06,4.06,0,0,1,4.1-4.1h3.8Z"/></svg>',
    unmute:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><style>.cls-1{fill:#fff;}.cls-2{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><g><path class="cls-1" d="M10.25,11.35l8.5-10.3c1.4-1.7,2.6-1.3,2.6,1V38c0,2.3-1.2,2.7-2.6,1l-8.5-10.3H6.45a4.06,4.06,0,0,1-4.1-4.1v-9a4.06,4.06,0,0,1,4.1-4.1h3.8Z"/><path class="cls-2" d="M27.15,29a12.61,12.61,0,0,0,3.5-9,13.05,13.05,0,0,0-3.5-9"/><path class="cls-2" d="M32.05,34.25A20.53,20.53,0,0,0,37.65,20a20.46,20.46,0,0,0-5.5-14.3"/></g></svg>',
    fullscreen:
      '<svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 451.111 451.111" height="512" viewBox="0 0 451.111 451.111" width="512"><path d="m64.444 128.889h-64.444v-128.889h128.889v64.444h-64.445z"/><path d="m128.889 451.111h-128.889v-128.889h64.444v64.444h64.444v64.445z"/><path d="m451.111 128.889h-64.444v-64.445h-64.444v-64.444h128.889v128.889z"/><path d="m451.111 451.111h-128.889v-64.444h64.444v-64.444h64.444v128.888z"/></svg>',
  };

  (this.container = t),
    (this.video = t.parentElement.querySelector('video')),
    (this.mousedown = { grab: false }),
    (this.holder = document.createElement('div')),
    (this.holder.className = 'player__controls'),
    this.container.appendChild(this.holder),
    //                this.holder.innerHtml = '<div class="progress"> <div class="progress__filled"></div></div><div class="player__buttons"> <button class="play__button toggle" title="Toggle Play"></button> <button class="mute__button toggle" title="Toggle mute"></button> <input type="range" name="volume" class="player__slider" min="0" max="1" step="any" value="1"> </div>',
    (this.progress = document.createElement('div')),
    (this.progress.className = 'progress'),
    (this.progressBar = document.createElement('div')),
    (this.progressBar.className = 'progress__filled'),
    (this.playerButtons = document.createElement('div')),
    (this.playerButtons.className = 'player__buttons'),
    (this.playBtn = document.createElement('div')),
    (this.playBtn.className = 'play__button'),
    (this.playBtn.innerHTML = this.s.play),
    (this.fullscreen = document.createElement('div')),
    (this.fullscreen.className = 'fullscreen__button'),
    (this.fullscreen.innerHTML = this.s.fullscreen),
    (this.muteBtn = document.createElement('div')),
    (this.muteBtn.className = 'mute__button'),
    (this.muteBtn.innerHTML = this.s.unmute),
    (this.range = document.createElement('input')),
    (this.range.className = 'player__slider'),
    setAttributes(this.range, {
      type: 'range',
      value: 1,
      max: 1,
      min: 0,
      step: 'any',
    }),
    (this.bigPlay = document.createElement('div')),
    (this.bigPlay.className = 'big__play'),
    (this.bigPlay.innerHTML = this.s.play),
    this.container.appendChild(this.bigPlay),
    this.holder.appendChild(this.progress),
    this.progress.appendChild(this.progressBar),
    this.holder.appendChild(this.playerButtons),
    // this.playerButtons.appendChild(this.playBtn),
    this.playerButtons.appendChild(this.fullscreen),
    // this.playerButtons.appendChild(this.muteBtn),
    // this.playerButtons.appendChild(this.range),

    (this.progress = t.querySelector('.progress')),
    (this.progressBar = t.querySelector('.progress__filled')),
    (this.toggle = t.querySelector('.toggle')),
    (this.skipButtons = t.querySelectorAll('[data-skip]')),
    (this.range = t.querySelector('.player__slider')),
    this.init();
};
var p = VideoPlayer.prototype;

(p.init = function() {
  this.video.addEventListener('timeupdate', this.handleProgress.bind(this)),
    this.container.addEventListener('click', this.togglePlay.bind(this)),
    this.video.addEventListener('ended', this.handleEnd.bind(this)),
    this.playBtn.addEventListener('click', this.togglePlay.bind(this)),
    this.bigPlay.addEventListener('click', this.togglePlay.bind(this));
  this.fullscreen.addEventListener('click', this.toggleFullscreen.bind(this));
  this.muteBtn.addEventListener('click', this.handleMute.bind(this));
  this.progress.addEventListener('click', this.scrub.bind(this));
  this.progress.addEventListener('mousemove', this.scrub2.bind(this));
  this.progress.addEventListener('mousedown', this.checkMousedown.bind(this));
  this.progress.addEventListener('mouseup', this.checkMousedown.bind(this));
  // this.range.addEventListener('change', this.handleRangeUpdate.bind(this))
  // this.range.addEventListener('mousemove', this.handleRangeUpdate.bind(this))
}),
  (p.checkMousedown = function() {
    this.mousedown.grab = this.mousedown.grab
      ? (this.mousedown.grab = false)
      : (this.mousedown.grab = true);
  }),
  (p.togglePlay = function() {
    this.video.paused
      ? (this.video.play(),
        (this.playBtn.innerHTML = this.s.pause),
        (this.bigPlay.innerHTML = this.s.pause),
        (this.bigPlay.style.display = 'none'))
      : (this.video.pause(),
        (this.playBtn.innerHTML = this.s.play),
        (this.bigPlay.innerHTML = this.s.play));
  }),
  (p.toggleFullscreen = function() {
    if (this.video.mozRequestFullScreen) {
      this.video.mozRequestFullScreen();
    } else if (this.video.webkitRequestFullScreen) {
      this.video.webkitRequestFullScreen();
    }
  }),
  (p.handleRangeUpdate = function(e) {
    this.video.volume = this.range.value;
    if (this.video.volume === 0) this.handleMute();
    else
      (this.video.muted = false),
        (this.video.volume = 1),
        (this.muteBtn.innerHTML = this.s.unmute);
  }),
  (p.handleMute = function() {
    0 !== this.video.volume || !this.video.muted
      ? ((this.video.muted = true),
        (this.video.volume = 0),
        (this.muteBtn.innerHTML = this.s.mute))
      : ((this.video.muted = false),
        (this.video.volume = 1),
        (this.muteBtn.innerHTML = this.s.unmute));
  });

(p.handleProgress = function() {
  var a = this.video;
  const percent = (a.currentTime / a.duration) * 100;
  this.progressBar.style.width = percent + '%';
}),
  (p.scrub = function(e) {
    const scrubTime =
      (e.offsetX / this.progress.offsetWidth) * this.video.duration;
    this.video.currentTime = scrubTime;
  }),
  (p.scrub2 = function(e) {
    if (this.mousedown.grab === true) {
      const scrubTime =
        (e.offsetX / this.progress.offsetWidth) * this.video.duration;
      this.video.currentTime = scrubTime;
    }
  });
p.handleEnd = function() {
  (this.bigPlay.style.display = 'block'),
    (this.bigPlay.innerHTML = this.s.replay);
};

export default VideoPlayer;
