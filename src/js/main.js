var window = require('./utils/window'),
    Game = require('./game'),
    document = window.document;

var game,
    stopButton = document.getElementById('stopButton'),
    startButton = document.getElementById('startButton'),
    nextButton = document.getElementById('nextButton'),
    randomButton = document.getElementById('randomButton'),
    clearButton = document.getElementById('clearButton');

game = new Game({
    rows: 30,
    cols: 40,
    elem: document.body
});

startButton.addEventListener('click', game.start.bind(game), false);
stopButton.addEventListener('click', game.stop.bind(game), false);
nextButton.addEventListener('click', game.next.bind(game), false);
randomButton.addEventListener('click', game.randomise.bind(game), false);
clearButton.addEventListener('click', game.reset.bind(game), false);

game.init();