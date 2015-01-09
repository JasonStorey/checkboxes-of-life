var window = require('./utils/window'),
    document = window.document;

function Cell() {
    this.alive = false;
    this.nextState = undefined;
    this.elem = createCheckbox.call(this);
    this.neighbours = [];

    function createCheckbox() {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this.alive;
        checkbox.addEventListener('click', function onClick() {
            this.alive = checkbox.checked;
        }.bind(this), false);

        return checkbox;
    }
}

Cell.prototype.draw = function draw(container) {
    container.appendChild(this.elem);
};

Cell.prototype.next = function next() {
    var aliveCells = this.neighbours.filter(function(neighbourCell) {
        return neighbourCell.alive;
    });

    if((aliveCells.length === 2 && this.alive) || aliveCells.length === 3) {
        this.nextState = true;
    } else  {
        this.nextState = false;
    }
};

Cell.prototype.update = function update() {
    this.alive = this.nextState;
    this.elem.checked = this.alive;
    return this.alive;
};

Cell.prototype.setAlive = function setAlive(state) {
    this.alive = state;
    this.elem.checked = this.alive;
};

Cell.prototype.reset = function reset() {
    this.setAlive(false);
    this.nextState = undefined;
};

module.exports = Cell;