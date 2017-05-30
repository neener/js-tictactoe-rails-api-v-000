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