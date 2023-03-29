function renderPlayerLobby(container) {
    const header = document.createElement('h1');
    header.textContent = 'Решим это по взрослому';
    header.classList.add('top__form-header');
    header.classList.add('text');

    const title = document.createElement('h2');
    title.textContent = 'Вы в лобби. Ожидание соперников...';
    title.classList.add('text');

    container.appendChild(header);
    container.appendChild(title);
};

window.application.blocks['playerLobby'] = renderPlayerLobby;

//список игроков в лобби
function randerPlayerList(container) {
    const ul = document.createElement('ul');
    ul.classList.add('ul');

    const intervalId = setInterval(() => {
        request({
            method: 'GET',
                url: `${backURL}/player-list`,
                params: {
                    token: window.application.token
                },
                onSuccess: (data) => {
                if (data.status === 'ok') {
                    ul.replaceChildren();
                    data.list.forEach(element => {
                        const li = document.createElement('li');
                        li.classList.add('text');
                        li.textContent = element.login;
                        ul.appendChild(li);
                    });
                } else {
                    console.warn('Не удалось получить статус игроков')
                }
            }
        });
    },1000);
    
    window.application.timers.push(intervalId);

    container.appendChild(ul);
};

window.application.blocks['playerList'] = randerPlayerList;

// начало игры
function renderLobbyButton(container) {
    const lobbyBtn = document.createElement('button');
    lobbyBtn.textContent = 'Начать игру!';
    lobbyBtn.classList.add('button');

    const img = document.createElement('img');
    img.src = './/back.jpg';
    img.classList.add('top__img');

    lobbyBtn.addEventListener('click', () => {
        request({
            method: 'GET',
            url: `${backURL}/start`,
            params: {
                token: window.application.token
            },
            onSuccess: (response) => {
                console.log(response);
                 if (response.status === 'ok') {
                     window.application.gameId = response['player-status'].game.id;
                     window.application.renderScreen('gameWaitingScreens');
                } else {
                     console.warn('В данный момент невозможно начать игру.');
                };
            }
        });

    })

    container.appendChild(lobbyBtn);
    container.appendChild(img);
};

window.application.blocks['lobbyButton'] = renderLobbyButton;



function renderLobbyScreens() {
    const top = document.querySelector('.top');
    top.textContent = '';

    const lobbyForm = document.createElement('div');
    

    window.application.renderBlock('playerLobby', container);
    window.application.renderBlock('playerList', container);
    window.application.renderBlock('lobbyButton', container);
    

    container.appendChild(lobbyForm);

};

window.application.screens['lobbyScreens'] = renderLobbyScreens;
