$(function() {
    attachListeners();
})

const EMPTY = ["", "", "", "", "", "", "", "", ""];
var currentGame = new Game(null, EMPTY);
var games = {}

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

function doTurn(el) {
    console.log('turn called')
}

function saveGame(el) {
    var url = '/games'
    if (currentGame.id != null) {
        url = url + '/' + currentGame.id;
    }
    $.ajax({
        type: "PATCH",
        url: url,
        data: currentGame,
        success: function(response) {
            currentGame = new Game(response.id, response.state);
        },
        dataType: 'json'
    })

}

function loadGames(el) {
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

function loadGame(el) {
    var gameId = el.innerText;
    currentGame = $.grep(games, function(i) {
        return i.id == gameId;
    })[0]
}

function displayError() {
    $('#errors').text("I'm sorry, there's been an error. Please try again.");
}