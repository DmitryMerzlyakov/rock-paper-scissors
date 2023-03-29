function renderGameBox(container) {
    const header = document.createElement('h1');
    header.textContent = 'Решим это по взрослому';
    header.classList.add('top__form-header');
    header.classList.add('text');

    const title = document.createElement('h2');
    title.textContent = `Игра началась! `;
    title.classList.add('text');

    const btnScissors = document.createElement('button');
    btnScissors.textContent = 'Ножницы!'
    btnScissors.classList.add('button');
    btnScissors.addEventListener('click', () => {
        pushButton('scissors');
    });

    const btnPaper = document.createElement('button');
    btnPaper.textContent = 'Бумага!'
    btnPaper.classList.add('button');
    btnPaper.addEventListener('click', () => {
        pushButton('paper');
    });

    const btnRock = document.createElement('button');
    btnRock.textContent = 'Камень!'
    btnRock.classList.add('button');
    btnRock.addEventListener('click', () => {
        pushButton('rock');
    });

    function pushButton(move) {
        request({
            url: `${backURL}/play`,
            params: {
                token: window.application.token,
                id: window.application.gameId,
                move: move
            },
            onSuccess: (response) => {
                if (response.status === 'ok') {
                    const status = response['game-status'].status;
                    switch (status) { 
                        case 'waiting-for-enemy-move':
                            window.application.renderScreen('waitingScreens');
                            break;
                        case 'lose':
                            window.application.renderScreen('loseScreens');
                            break;
                        case 'win':
                            window.application.renderScreen('winScreens');
                            break;
                        default:
                            window.application.renderScreen('gameBoxScreens');
                            break;
                    }
                } else {
                    console.warn(response.massage);
                }
            }
        });
    };

    const img = document.createElement('img');
    img.src = './/back.jpg';
    img.classList.add('top__img');

    container.appendChild(header);
    container.appendChild(title);
    container.appendChild(btnScissors);
    container.appendChild(btnPaper);
    container.appendChild(btnRock);
    container.appendChild(img);
};

window.application.blocks['gameBox'] = renderGameBox;

function renderGameBoxScreens() {
    const top = document.querySelector('.top');
    top.textContent = '';

    const lobbyForm = document.createElement('div');
    

    window.application.renderBlock('gameBox', container);

    container.appendChild(lobbyForm);

};

window.application.screens['gameBoxScreens'] = renderGameBoxScreens;