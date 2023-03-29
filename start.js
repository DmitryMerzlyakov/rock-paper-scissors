const backURL = 'https://skypro-rock-scissors-paper.herokuapp.com';

const container = document.querySelector('.top');

function renderFormInput(container) {
    const loginInput = document.createElement('input');
    loginInput.classList.add('top__form-input');

    container.appendChild(loginInput);
};

window.application.blocks['FormInput'] = renderFormInput;
window.application.renderBlock('FormInput', container);

function renderFormButton(container) {
    const formButton = document.createElement('button');
    const img = document.createElement('img');
    formButton.textContent = 'Войти';
    formButton.classList.add('button');
    img.src = './/back.jpg';
    img.classList.add('top__img')

    formButton.addEventListener('click', () => {
        const login = document.querySelector('input')
        console.log(login.value);

        request({
                method: 'GET',
                url: `${backURL}/login`,
                params: {
                    login: login.value
                },
                onSuccess: (response) => {
                    console.log(response.token);
                    if (response.status === 'ok') {
                        const { token } = response;
                        window.application.token = token;
                        
                        request({
                            url: `${backURL}/player-status`,
                            params: {
                                token: window.application.token
                            },
                            onSuccess: (response) => {
                                if (response.status === 'ok') {
                                    console.log(response);
                                    if (response['player-status'].status === 'lobby') {
                                        window.application.renderScreen('lobbyScreens'); 
                                    }  else {
                                        window.application.gameId = response['player-status'].game.id;
                                        window.application.renderScreen('gameBoxScreens');
                                    }
                                } else {
                                    console.warn('Статус игрока неизвестен');
                                }
                            }
                        });
                    } else {
                        console.warn('Авторизация неудачна')
                    }
                    
                }
        });
    });

    container.appendChild(formButton);
    container.appendChild(img);
};

window.application.blocks['FormButton'] = renderFormButton;
window.application.renderBlock('FormButton', container);