var video = document.querySelector('.video'),
    player = document.querySelector('.player'),
    progress = document.querySelector('.progress'),
    fill = document.querySelector('.fill'),
    toggle = document.querySelector('.play'),
    skipBtn = document.querySelectorAll('.skip'),
    slider = document.querySelectorAll('.slider input');
/************************************************************************/
function togglePlay() {
    video[video.paused ? 'play' : 'pause']();
}

function updateButton() {
    toggle.textContent = video.paused ? '►' : '❚❚'
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    fill.style.width = ((video.currentTime / video.duration) * 100) + '%';
}

function scrub(e) {
    video.currentTime = ((e.offsetX / progress.offsetWidth) * video.duration);

}

function GoInFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function GoOutFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
/************************************************************************/
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

video.addEventListener('dblclick', ()=>{
    ele=video;
    GoInFullscreen(ele);
});

toggle.addEventListener('click', togglePlay);

for (btn of skipBtn) {
    btn.addEventListener('click', skip);
}
for (input of slider) {
    input.addEventListener('change', handleRangeUpdate);
    input.addEventListener('mousemove', handleRangeUpdate);

}
let mousedown = false;
progress.addEventListener('click', scrub);

progress.addEventListener('mousemove', (e) => {
    mousedown ? scrub(e) : 1;
});
progress.addEventListener('mousedown', () => {
    mousedown = true
});
progress.addEventListener('mouseup', () => {
    mousedown = false
});
