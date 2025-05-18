let player;
let isLooping = true;
const playlistId = 'PLJKwjtX6AccvFVv-5s9bIS6ee6Pm5hyxZ';

// Crea particelle di sfondo
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize YouTube Player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'gfow08no7q8',
        playerVars: {
            'listType': 'playlist',
            'list': playlistId,
            'loop': 1,
            'playlist': playlistId,
            'controls': 1,
            'autoplay': 1,
            'rel': 0,
            'showinfo': 0,
            'modestbranding': 1
        },
        events: {
            'onStateChange': onPlayerStateChange,
            'onReady': onPlayerReady
        }
    });
}

// Handle player state changes
function onPlayerStateChange(event) {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    const playerInfo = document.querySelector('.player-info span');

    switch(event.data) {
        case YT.PlayerState.PLAYING:
            statusDot.style.color = '#4CAF50';
            statusText.textContent = 'Riproduzione in corso';
            playerInfo.textContent = 'Riproduzione in corso';
            break;
        case YT.PlayerState.PAUSED:
            statusDot.style.color = '#FFC107';
            statusText.textContent = 'In pausa';
            playerInfo.textContent = 'In pausa';
            break;
        case YT.PlayerState.ENDED:
            if (isLooping) {
                player.playVideo();
            } else {
                statusDot.style.color = '#F44336';
                statusText.textContent = 'Riproduzione terminata';
                playerInfo.textContent = 'Riproduzione terminata';
            }
            break;
    }
}

function onPlayerReady(event) {
    // Aggiorna lo stato iniziale
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    statusDot.style.color = '#4CAF50';
    statusText.textContent = 'Riproduzione in corso';
}

// Toggle loop functionality
document.getElementById('toggleLoop').addEventListener('click', function() {
    isLooping = !isLooping;
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    
    if (isLooping) {
        this.innerHTML = '<i class="fas fa-sync-alt"></i><span>Disabilita Loop</span>';
        this.style.background = 'linear-gradient(45deg, var(--primary-color), var(--primary-dark))';
        statusDot.style.color = '#4CAF50';
        statusText.textContent = 'Loop attivo';
    } else {
        this.innerHTML = '<i class="fas fa-sync-alt"></i><span>Abilita Loop</span>';
        this.style.background = 'linear-gradient(45deg, #666666, #444444)';
        statusDot.style.color = '#F44336';
        statusText.textContent = 'Loop disattivato';
    }
});

// Handle errors
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
};

// Inizializza le particelle quando il documento è caricato
document.addEventListener('DOMContentLoaded', createParticles); 