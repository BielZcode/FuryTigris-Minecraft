/**
 * @createAccount.js usado para a criação de contas
*/

const { ipcRenderer } = require('electron');

document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    
    ipcRenderer.invoke('does-account-exist', username).then((exists) => {
        if (exists) {
            document.getElementById('error-message').innerText = 'Este nome de usuário já existe.';
        } else {
            ipcRenderer.invoke('create-account', username).then((response) => {
                if (response.success) {
                    document.getElementById('error-message').innerText = response.message;
                } else {
                    document.getElementById('error-message').innerText = response.message;
                }
            });
        }
    });
});
