

window.addEventListener('DOMContentLoaded', () => {

    let logAreas = document.getElementsByClassName('log-area');
    let logArea = logAreas[logAreas.length - 1];
    let commandInputs = document.getElementsByClassName('command-input');
    let commandInput = commandInputs[commandInputs.length - 1];

    let currentIndex = 0;
    let logs = [];

    commandInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const command = commandInput.value;
            commandInput.value = '';
            processCommand(command);
        }
    });
    
    function processCommand(command) {
        commandInput.disabled = true;
        commandInput.value = command;
        console.log(command)
        commandInput.classList.add('disabled');

        if (command === '') {
            fetchLogs();
            return;
        }

        // 추가적인 명령어 처리 로직을 구현할 수 있습니다.
        // 본 예시에서는 입력된 명령어를 그대로 기록 후 input을 비활성화합니다.
        // updateLogArea(command);
        addNewInputLine();
    }
    
    function fetchLogs() {
        fetch('http://localhost:3000/logs')
            .then(response => response.json())
            .then(data => {
                logs = data;
                currentIndex = 0;
                printLogs();
            })
            .catch(error => console.error(error));
    }
    
    function printLogs() {
        if (currentIndex < logs.length) {
            const logMessage = logs[currentIndex];
            updateLogArea(logMessage);
            currentIndex++;
            const randomDelay = Math.floor(Math.random() * 600) + 0; // 1초부터 4초 사이의 랜덤한 값
            setTimeout(printLogs, randomDelay);
        } else {
            addNewInputLine();
        }
    }
    
    function updateLogArea(logMessage) {
        logArea.innerHTML += `<div>${logMessage}</div>`;
    }
    
    function addNewInputLine() {
        const inputLine = document.createElement('div');
        inputLine.classList.add('input-line');
        inputLine.innerHTML = `
            <span class="user">hanul@honghaneul-ui-MacBookPro-2</span>
            <span class="directory">~</span>
            <span class="symbol">%</span>
            <input class="command-input" type="text" autofocus>
        `;
        logArea.appendChild(inputLine);
        commandInput.removeEventListener('keyup', processCommand);
        commandInput = inputLine.querySelector('.command-input');
        commandInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                const command = commandInput.value;
                commandInput.value = '';
                processCommand(command);
            }
        });
        commandInput.focus();
    }
    
});
