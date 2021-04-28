/**
 * Game
 */

let socket = io();

const virusEl = document.querySelector('#virus');

let timer;
let newListItem;


/**
 * Functions
 */

const clickedFunction = () => {

    socket.emit('clicked');

    virusEl.removeEventListener('click', clickedFunction);
}

/**
 * Event listeners
 */

// Listen for when the player form is submited
document.querySelector('#player-form').addEventListener('submit', e => {
    e.preventDefault();

    document.querySelector('#loading').classList.remove('hide')

    // Get the value from the input
    const username = document.querySelector('#username').value

    socket.emit('newPlayer', username)

});

// Listen for ready button interaction
document.querySelector('#player1 button').addEventListener('click', () => {
    document.querySelector('#player1 button').innerHTML = 'Ready!'
    socket.emit("ready")
})

/**
 * Sockets
 */

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

socket.on('startGame', (delay, position1, position2) => {
    //remove ready button
    document.querySelector('#player1 button').classList.add('hide');

    // add the position to the virus
    virusEl.style.gridColumn = position1;
    virusEl.style.gridRow = position2;

    // remove the class hide from the virus
    setTimeout(() => {
        virusEl.classList.remove('hide');

        const startTime = new Date().getTime();

        const ul1 = document.querySelector('#timer1');
        const li1 = document.createElement('LI');
        newListItem1 = ul1.appendChild(li1);

        const ul2 = document.querySelector('#timer2');
        const li2 = document.createElement('LI');
        newListItem2 = ul2.appendChild(li2);

        timer1 = setInterval(() => {
            let diff = moment(new Date().getTime()).diff(moment(startTime));

            newListItem1.innerHTML = moment(diff).format('mm:ss:SSS');
        }, 1)

        timer2 = setInterval(() => {
            let diff = moment(new Date().getTime()).diff(moment(startTime));

            newListItem2.innerHTML = moment(diff).format('mm:ss:SSS');
        }, 1)

        virusEl.addEventListener('click', clickedFunction)
    }, delay)

})

socket.on('getPoint', id => {
    let player = null;

    id === socket.id
        ? player = 'player2'
        : player = 'player1'

    let oldScore = Number(document.querySelector(`#${player}Score`).innerHTML);
    let newScore = ++oldScore;
    document.querySelector(`#${player}Score`).innerHTML = newScore;

    // hide the virus
    virusEl.classList.add('hide')
})

socket.on('stopTimer', (id) => {
    id === socket.id
        ? clearInterval(timer1)
        : clearInterval(timer2)
})