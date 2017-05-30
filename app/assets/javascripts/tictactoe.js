$(function() {
    $('tbody td').on('click', function() {
        handleClick(this);
    })
})

function handleClick(el) {
    console.log(el)
}