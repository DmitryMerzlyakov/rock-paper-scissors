function renderLoseBox(container) {
    const header = document.createElement('h1');
    header.textContent = 'Решим это по взрослому';
    header.classList.add('top__form-header');
    header.classList.add('text');

    const imgLose = document.createElement('img');
    imgLose.src = './/lose.jpg';
    imgLose.classList.add('img_final');

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
                    case 'waiting-for-your-move':
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

    const backButton = document.createElement('button');
    backButton.textContent = 'Перейти в лобби';
    backButton.classList.add('button');
    backButton.addEventListener('click', () => {
        window.application.renderScreen('lobbyScreens');
    });

    const moreButton = document.createElement('button');
    moreButton.textContent = 'Ещё разок!';
    moreButton.classList.add('button');
    moreButton.addEventListener('click', () => {
        window.application.renderScreen('gameBoxScreens');
    });

    const img = document.createElement('img');
    img.src = './/back.jpg';
    img.classList.add('top__img');

    container.appendChild(header);
    container.appendChild(imgLose);
    container.appendChild(backButton);
    container.appendChild(moreButton);
    container.appendChild(img);
};

window.application.blocks['loseBox'] = renderLoseBox;

function renderLoseScreens() {
    const top = document.querySelector('.top');
    top.textContent = '';

    const lobbyForm = document.createElement('div');
    

    window.application.renderBlock('loseBox', container);

    container.appendChild(lobbyForm);

};

window.application.screens['loseScreens'] = renderLoseScreens;