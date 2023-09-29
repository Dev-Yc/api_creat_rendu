const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function getUsersFromDatabase() {
    const usersData = fs.readFileSync(path.join(__dirname, 'users.json'));
    return JSON.parse(usersData);
}

function saveUsersToDatabase(users) {
    const usersData = JSON.stringify(users, null, 2);
    fs.writeFileSync(path.join(__dirname, 'users.json'), usersData);
}

app.get('/signup', (req, res) => {
    res.send(`
        <form action="/signup" method="POST">
            <label for="username">Nom d'utilisateur:</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="password">Mot de passe:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <input type="submit" value="S'inscrire">
        </form>
    `);
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    const users = getUsersFromDatabase();
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(409).json({ message: 'Ce nom d\'utilisateur existe déjà' });
    }

    const newUser = { username, password };
    users.push(newUser);
    saveUsersToDatabase(users);

    res.status(201).send('<p>Le compte a été créé avec succès</p>');
});

app.get('/start-game', (req, res) => {
    const { player1, player2 } = req.query;
    if (!player1 || !player2) {
        return res.status(400).json({ message: 'Les noms des joueurs doivent être fournis' });
    }

    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const players = {
        player1,
        player2
    };

    let activePlayer = player1;

    function makeMove(row, col) {
        if (board[row][col] !== '') {
            return false;
        }

        board[row][col] = activePlayer;

        return true;
    }
    res.status(200).json({ board });
});

app.post('/make-move', (req, res) => {
    const { row, col } = req.body;
    const moveResult = makeMove(row, col);

    if (moveResult) {
        res.status(200).send('<p>Mouvement réussi</p>');
    } else {
        res.status(400).send('<p>Mouvement pas autorisé</p>');
    }
});

app.listen(3000, () => {
    console.log('Test port 3000');
});