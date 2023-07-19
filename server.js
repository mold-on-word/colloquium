const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(cors());

app.get('/logs', (req, res) => {
    fs.readFile('./sample.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return; // 오류 발생 시, 함수 종료
        }

        const lines = data.split('\n');
        const logs = lines.map(line => `[${getCurrentTimestamp()}] ${line}`);
        res.json(logs);
    });
});

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

function getCurrentTimestamp() {
    const now = new Date();
    const formattedTimestamp = now.toISOString().slice(0, 23).replace('T', ' ');
    return formattedTimestamp;
}
