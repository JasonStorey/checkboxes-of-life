var window = require('./utils/window'),
    Cell = require('./cell'),
    document = window.document;

function Game(config) {
    this.config = config;
    this.cells = [];
    this.elem = config.elem;
    this.running = false;
    this._createCells(this.config.rows * this.config.cols);
}

Game.prototype.init = function init() {
    var rowElem;
    this.cells.forEach(function(cell, index) {
        var colIndex = index % this.config.cols;

        if(colIndex === 0) {
            rowElem = document.createElement('div');
            rowElem.className = 'row';
            this.elem.appendChild(rowElem);
        }

        cell.draw(rowElem);

    }.bind(this));
};

Game.prototype.next = function next() {
    this.cells.forEach(function(cell) {
        cell.next();
    });
    this.update();
};

Game.prototype.update = function update() {
    this.cells.forEach(function(cell) {
        cell.update();
    });
};

Game.prototype.start = function start() {
    if(this.running) {
        return;
    }
    this.running = true;
    function gameLoop() {
        this._timeoutId = window.requestAnimationFrame(gameLoop.bind(this));
        this.next();
    }
    gameLoop.call(this);
};

Game.prototype.stop = function stop() {
    if(!this.running) {
        return;
    }
    this.running = false;
    window.cancelAnimationFrame(this._timeoutId);
};

Game.prototype.randomise = function randomise() {
    this.cells.forEach(function(cell) {
        cell.setAlive(Math.random() > 0.5);
    });
};

Game.prototype.reset = function reset() {
    this.stop();
    this.cells.forEach(function(cell) {
        cell.reset();
    });
};

Game.prototype._createCells = function createCells(numOfCells) {
    for(var i = 0; i < numOfCells; i++) {
        this.cells[i] = new Cell();
    }

    this.cells.forEach(function(cell, index) {
        cell.neighbours = getNeighbours.call(this, index);
    }.bind(this));

    function getNeighbours(i) {
        var neighbours = [];

        if(i > this.config.cols) {
            if(i % this.config.cols !== 0) {
                neighbours.push(this.cells[i - this.config.cols - 1]);
            }
            neighbours.push(this.cells[i - this.config.cols]);
            if(i % this.config.cols !== this.config.cols - 1) {
                neighbours.push(this.cells[i - this.config.cols + 1]);
            }
        }

        if(i % this.config.cols !== 0) {
            neighbours.push(this.cells[i - 1]);
        }

        if(i % this.config.cols !== this.config.cols - 1) {
            neighbours.push(this.cells[i + 1]);
        }

        if(i < this.cells.length - this.config.cols) {
            if(i % this.config.cols !== 0) {
                neighbours.push(this.cells[i + this.config.cols - 1]);
            }
            neighbours.push(this.cells[i + this.config.cols]);
            if(i % this.config.cols !== this.config.cols - 1) {
                neighbours.push(this.cells[i + this.config.cols + 1]);
            }
        }

        return neighbours;
    }
};

module.exports = Game;