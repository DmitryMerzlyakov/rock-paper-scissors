function renderGameWaitingForm(container) {
    const header = document.createElement('h1');
    header.textContent = 'Решим это по взрослому';
    header.classList.add('top__form-header');
    header.classList.add('text');

    const title = document.createElement('h2');
    title.textContent = 'Игра началась! Подбираем достойного противника!';
    title.classList.add('text');

    const intervalId = setInterval(() => { request({
            method: 'GET',
            url: `${backURL}/game-status`,
            params: {
                token: window.application.token,
                id: window.application.gameId,
            },
            onSuccess: (response) => {
                if (response.status === 'ok') {
                    if (response['game-status'].status !== 'waiting-for-start' ) {
                        window.application.renderScreen('gameBoxScreens');
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
    container.appendChild(title);
    container.appendChild(img);
};

window.application.blocks['renderGameWaitingForm'] = renderGameWaitingForm;


function renderGameScreens() {
    const top = document.querySelector('.top');
    top.textContent = '';

    const lobbyForm = document.createElement('div');
    

    window.application.renderBlock('renderGameWaitingForm', container);

    container.appendChild(lobbyForm);

};

window.application.screens['gameWaitingScreens'] = renderGameScreens;