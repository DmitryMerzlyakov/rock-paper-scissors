function renderWaitingBox(container) {
    const header = document.createElement('h1');
    header.textContent = 'Решим это по взрослому';
    header.classList.add('top__form-header');
    header.classList.add('text');

    const imgWaiting = document.createElement('img');
    imgWaiting.src = './/waiting.jpg';
    imgWaiting.classList.add('img_final');

    const intervalId = setInterval(() => { request({
        method: 'GET',
        url: `${backURL}/game-status`,
        params: {
            token: window.application.token,
            id: window.application.gameId,
        },
        onSuccess: (response) => {
            if (response.status === 'ok') {
                const status = response['game-status'].status;
                switch (status) {
                    case 'waiting-for-enemy-move':
                        window.application.renderScreen('gameBoxScreens');
                        break;
                    case 'lose':
                        window.application.renderScreen('loseScreens');
                        break;
                    case 'win':
                        window.application.renderScreen('winScreens');
                    break;
                    default:
                        break;
                }
            } else {
                console.warn(response.massage);
            }
        }
    });
    }, 500);

    window.application.timers.push(intervalId);

    const img = document.createElement('img');
    img.src = './/back.jpg';
    img.classList.add('top__img');

    container.appendChild(header);
    container.appendChild(imgWaiting);
    container.appendChild(img);
};

window.application.blocks['waitingBox'] = renderWaitingBox;

function renderWaitingScreens() {
    const top = document.querySelector('.top');
    top.textContent = '';

    const lobbyForm = document.createElement('div');
    

    window.application.renderBlock('waitingBox', container);

    container.appendChild(lobbyForm);

};

window.application.screens['waitingScreens'] = renderWaitingBox;