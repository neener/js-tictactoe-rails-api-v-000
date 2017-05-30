$(function() {
    $('tbody td').on('click', function() {
        handleClick(this);
    })
    $('#save').on('click', function(e) {
        saveGame();
        e.preventDefault();
    })
    $('#previous').on('click', function(e) {
        loadGames();
        e.preventDefault();
    })
})

function handleClick(el) {
    doTurn();
}

function saveGame(el) {

}

function loadGames(el) {
    $.getJSON('games', function(response) {
        showGames(response.games)
    }).fail(function(error) { displayError(error) });
}

function showGames(games) {
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
    console.log(el);
}

function displayError() {
    $('#errors').text("I'm sorry, there's been an error. Please try again.");
}