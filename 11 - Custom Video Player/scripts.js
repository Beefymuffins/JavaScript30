/* Fet Our Elements  */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build our functions */
function togglePlay() {
        const method = video.paused ? 'play' : 'pause';
        video[method]();

        // second way
        // if (video.paused) {
        //         video.play();
        // } else {
        //         video.pause();
        // }
}

function updateButton() {
        console.log('Update the button');
        const icon = this.paused ? '►' : '❚ ❚';
        toggle.textContent = icon;
}

function skip() {
        video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
        video[this.name] = this.value;
}

function handleProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        // In the DOM you can see that the duration runns on a flex-basis (0 - 100)
        progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
        console.log(scrubTime);
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach((button) => button.addEventListener('click', skip));
ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range) => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
// the && makes it so if mousedown is false it wont run scrub, if true will run scrub // e comes from the inital scrub function on line 43
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));

// CHALLENGE TIME: MAKE IT FULLSCREEN
// add a fullscreen button (its a flexbox)
// then make it functional
