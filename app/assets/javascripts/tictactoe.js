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
    html = '<ul>';
    games.forEach((game) => {
        html += '<li>' + game.id + '</li>';
    })
    html += '</ul>';
    $('div#games')[0].innerHTML = html;
}

function displayError() {
    $('#errors').text("I'm sorry, there's been an error. Please try again.");
}