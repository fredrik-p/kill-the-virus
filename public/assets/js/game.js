/**
 * Game
 */

var socket = io();

// Listen for when the player form is submited
document.querySelector('#player-form').addEventListener('submit', e => {
    e.preventDefault();

    // Get the value from the input
    const username = document.querySelector('#username').value

    socket.emit('newPlayer', username)

});

socket.on('newGame', (players) => {

    const player1 = players[socket.id]
    delete players[socket.id]
    const player2 = Object.values(players)

    // Sidebar info
    document.querySelector('#player1 h1').innerHTML = player1
    document.querySelector('#player2 h1').innerHTML = player2

    // Hide the start screen, show the game display
    document.querySelector('#register-player').classList.add('hide')
    document.querySelector('#game').classList.remove('hide')

})


document.querySelector('#player1 button').addEventListener('click', () => {
    console.log('clicked!')
    document.querySelector('#player1 button').innerHTML = 'Ready!'
})