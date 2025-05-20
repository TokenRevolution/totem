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

// Funzione per verificare se il dispositivo è mobile
function isMobileDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log('Is Mobile Device:', isMobile, 'User Agent:', navigator.userAgent);
    return isMobile;
}

// Funzione per verificare se il browser supporta l'autoplay
async function checkAutoplaySupport() {
    try {
        const video = document.createElement('video');
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
            await playPromise;
            video.pause();
            return true;
        }
        return false;
    } catch (e) {
        console.warn('Autoplay non supportato:', e);
        return false;
    }
}

// Initialize YouTube Player
function onYouTubeIframeAPIReady() {
    try {
        const playerConfig = {
            height: '100%',
            width: '100%',
            videoId: 'gfow08no7q8',
            playerVars: {
                'listType': 'playlist',
                'list': playlistId,
                'loop': 1,
                'playlist': playlistId,
                'controls': 1,
                'autoplay': 0,
                'rel': 0,
                'showinfo': 0,
                'modestbranding': 1,
                'playsinline': 1,
                'enablejsapi': 1,
                'origin': window.location.origin
            },
            events: {
                'onStateChange': onPlayerStateChange,
                'onReady': onPlayerReady,
                'onError': onPlayerError
            }
        };

        player = new YT.Player('player', playerConfig);

        // Gestione del bottone play personalizzato
        const playButton = document.querySelector('.custom-play-button');
        if (playButton) {
            playButton.addEventListener('click', () => {
                if (player && player.playVideo) {
                    player.playVideo();
                }
            });
        }

    } catch (error) {
        console.error('Errore durante l\'inizializzazione del player:', error);
        showErrorMessage('Errore durante l\'inizializzazione del player. Ricarica la pagina o prova un browser diverso.');
    }
}

// Handle player state changes
function onPlayerStateChange(event) {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    const playerInfo = document.querySelector('.player-info span');
    const playButton = document.querySelector('.custom-play-button');

    switch(event.data) {
        case YT.PlayerState.PLAYING:
            statusDot.style.color = '#4CAF50';
            statusText.textContent = 'Riproduzione in corso';
            playerInfo.textContent = 'Riproduzione in corso';
            if (playButton) {
                playButton.classList.add('hidden');
            }
            break;
        case YT.PlayerState.PAUSED:
            statusDot.style.color = '#FFC107';
            statusText.textContent = 'In pausa';
            playerInfo.textContent = 'In pausa';
            if (playButton) {
                playButton.classList.remove('hidden');
            }
            break;
        case YT.PlayerState.ENDED:
            if (isLooping) {
                player.playVideo();
            } else {
                statusDot.style.color = '#F44336';
                statusText.textContent = 'Riproduzione terminata';
                playerInfo.textContent = 'Riproduzione terminata';
                if (playButton) {
                    playButton.classList.remove('hidden');
                }
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

// Gestione errori del player
function onPlayerError(event) {
    console.error('Errore del player YouTube:', event.data);
    let errorMessage = 'Si è verificato un errore durante la riproduzione. ';
    
    switch(event.data) {
        case 2:
            errorMessage += 'ID video non valido.';
            break;
        case 5:
            errorMessage += 'Errore HTML5. Prova un browser diverso.';
            break;
        case 100:
            errorMessage += 'Video non trovato o non disponibile.';
            break;
        case 101:
        case 150:
            errorMessage += 'Il video non può essere riprodotto in questo player.';
            break;
        default:
            errorMessage += 'Errore sconosciuto. Ricarica la pagina.';
    }
    
    showErrorMessage(errorMessage);
}

// Mostra messaggi di errore all'utente
function showErrorMessage(message) {
    const playerContainer = document.querySelector('.player-container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message glass-effect';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <p>${message}</p>
        <button onclick="window.location.reload()" class="btn">
            <i class="fas fa-sync-alt"></i>
            Ricarica pagina
        </button>
    `;
    playerContainer.appendChild(errorDiv);
}

// Handle errors
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
};

// Inizializza le particelle quando il documento è caricato
document.addEventListener('DOMContentLoaded', createParticles); 