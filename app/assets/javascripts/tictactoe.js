$(function() {
    $('tbody td').on('click', function() {
        handleClick(this);
    })
    $('#save').on('click', function(e) {
        saveGame();
        e.preventDefault();
    })
    $('#previous').on('click', function(e) {
        showGames();
        e.preventDefault();
    })
})

function handleClick(el) {
    doTurn();
}

function saveGame(el) {

}

function showGames(el) {
    $.getJSON('games', function(response) {
        console.log(response)
    }).fail(function(error) { displayError(error) });
}

function displayError() {
    $('#errors').text("I'm sorry, there's been an error. Please try again.");
}