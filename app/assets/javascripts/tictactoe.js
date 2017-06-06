$(function() {
    attachListeners();
})

const WIN_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

var currentGame = 0;
var games = {};
var turn = 0;

var attachListeners = function() {
    $('td').click(function(event) {
        doTurn(event);
    })
    console.log('attached')
    $('#save').click(function(e) {
        saveGame();
        e.preventDefault();
    })
    $('#previous').click(function(e) {
        loadGames();
        e.preventDefault();
    })
}

var doTurn = function(event) {
    console.log('turn called')
    updateState(event.target)
    checkWinner()
    turn++;
}

var player = function() {
    return (turn % 2 === 0) ? "X" : "O";
}

var checkWinner = function() {
    var board = getState();
    //var win = board.some((row) => { return row[0] !== "" && row[0] === row[1] && row[1] === row[2] }) || [0, 1, 2].some((column) => { return board[0][column] !== "" && board[0][column] === board[1][column] && board[1][column] === board[2][column] }) ||
    //    (board[1][1] !== "" && ((board[1][1] === board[0][0] && board[1][1] == board[2][2]) || (board[1][1] === board[0][2] && board[1][1] === board[2][0])));
    let win = false;
    WIN_COMBINATIONS.forEach(function(item) {
        if (board[item[0]] == board[item[1]] && board[item[0]] == board[item[2]] && board[item[0]] != "") {
            win = true;
        }
    })

    //if win show winMessage
    if (win) message("Player " + player() + " won!")
        // save game (next step)
}

var message = function(text) {
    $('#message').html(text)
}

var saveGame = function() {
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

var loadGames = function() {
    $.getJSON('games', function(response) {
        games = response.games;
        showGames();
    }).fail(function(error) { displayError(error) });
}

var showGames = function() {
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

var updateState = function(element) {
    $(element).html(player())
}

var setState = function(state) {
    $('table td').each(function(index) {
        $(this).html(state[index])
    })
    $('table').data()['state'] = state.join(',')
}

var getState = function() {
    return $('table td').map(function() {
        return this.innerHTML
    }).get();
}

var getId = function() {
    return $('table').data()['game-id'];
}

var setId = function(id) {
    $('#game').data()['game-id'] = id;
}

var displayError = function() {
    $('#errors').text("I'm sorry, there's been an error. Please try again.");
}