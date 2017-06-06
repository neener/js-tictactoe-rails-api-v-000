$(function() {
    attachListeners();
})

const EMPTY = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
// const WIN_COMBINATIONS = [

//     [0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
//     [0,4,8],
//     [2,4,6]

//   ]

var currentGame = 0;

var games = {}
var turn = 0

function attachListeners() {
    $('tbody td').on('click', function() {
        doTurn(this);
    })
    console.log('attached')
    $('#save').on('click', function(e) {
        saveGame();
        e.preventDefault();
    })
    $('#previous').on('click', function(e) {
        loadGames();
        e.preventDefault();
    })
}

function doTurn(element) {
    console.log('turn called')
        // check if the cell open
    if (element.innerHTML != "") return;
    turn++;
    updateState(element)
    checkWinner()
        // if its open make move for the player and increment the turn
        // check for a winner
        // loadGame
}

function player() {
    return (turn % 2 === 0) ? "X" : "O";
}

function checkWinner() {
    var board = currentGame.state
    var win = board.some((row) => { return row[0] !== "" && row[0] === row[1] && row[1] === row[2] }) || [0, 1, 2].some((column) => { return board[0][column] !== "" && board[0][column] === board[1][column] && board[1][column] === board[2][column] }) ||
        (board[1][1] !== "" && ((board[1][1] === board[0][0] && board[1][1] == board[2][2]) || (board[1][1] === board[0][2] && board[1][1] === board[2][0])));
    //if win show winMessage
    if (win) message("Player " + player() + " won!")
        // save game (next step)
}

function message(text) {
    $('#message').html(text)
}

function saveGame() {
    var url = '/games'
    if (currentGame != null) {
        url = url + '/' + currentGame.id;
    }
    $.ajax({
        type: currentGame.id == null ? "POST" : "PATCH",
        url: url,
        data: currentGame,
        success: function(response) {
            currentGame = new Game(response.id, response.state);
        },
        dataType: 'json'
    })

}

function loadGames() {
    $.getJSON('games', function(response) {
        games = response.games;
        showGames();
    }).fail(function(error) { displayError(error) });
}

function showGames() {
    var $list = $('<ul></ul>');
    games.forEach((game) => {
        $li = $('<li>');
        $li.text(game.id);
        $li.on('click', function() { loadGame(this) });
        $list.append($li)
    })
    $('div#games ul').remove();
    $('div#games').append($list);
}

function updateState(element) {
    // function call to take a game and put it onto the board
    $(element).html(player())
}

function setState(state) {
    $('#game').data()['state'] = state.join(',')
}

function getState() {
    return $('#game').data()['state'].split(',')
}

function getId() {
    return $('#game').data()['game-id'];
}

function setId(id) {
    $('#game').data()['game-id'] = id;
}

function displayError() {
    $('#errors').text("I'm sorry, there's been an error. Please try again.");
}