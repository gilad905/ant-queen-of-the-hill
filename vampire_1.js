/*
Vampire
-------

glide around until finding food, make 1 worker
continue gliding until finding any color
if it's a spot - find its center
if it's a trail - follow it
favor spots over trails (higher chance that the queen is idle)
trace the queen
steal from it with the worker, until it's empty
go on until finding another queen

----------------------------------------------------

start:
glide around until finding food, make 1 worker
continue gliding until finding any color
gravitate towards color's mass center

----------------------------------------------------

*/

var WORKER = 1;
var QUEEN = 5;

var WHITE = 1;
var YELLOW = 2;
var RED = 5;

var myCell = view[4];
var me = myCell.ant;

return Validate(me.type == QUEEN ? forQueen() : forWorker());

function forQueen() {
    var worker = FindAround("friend");

    if (worker == -1) {
        if (me.food)
            return CreateAt(3);
        else {
            var foodPos = FindAround("food");
            if (foodPos != -1) {
                console.pause();
                return MoveTo(foodPos);
            }
            else
                return RedTrail();
        }
    } else
        return MoveTo(RightOf(worker));
}

function forWorker() {
    var queen = FindAround("friend");
    return MoveTo(LeftOf(queen));
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function RedTrail() {
    if (myCell.color != RED)
        return MarkMe(RED);
    else {
        var redPos = FindAround("color", RED);
        if (redPos != -1) {
            var oppRed = OppositeTo(redPos);
            return MoveTo(oppRed);
        } else
            return MoveTo(2);
    }
}

function LeftOf(pos) {
    if (pos == 8 || pos == 5)
        return pos - 3;
    else if (pos == 0 || pos == 3)
        return pos + 3;
    else if (pos == 6 || pos == 7)
        return pos + 1;
    else if (pos == 1 || pos == 2)
        return pos - 1;
}

function RightOf(pos) {
    if (pos == 3 || pos == 6)
        return pos - 3;
    else if (pos == 2 || pos == 5)
        return pos + 3;
    else if (pos == 0 || pos == 1)
        return pos + 1;
    else if (pos == 7 || pos == 8)
        return pos - 1;
}

function Validate(move) {
    if (
        (!move) ||
        (move.cell === undefined || move.cell < 0 || move.cell > 8) ||
        (move.color < 1 || move.color > 8) ||
        (move.type < 1 || move.type > 4) ||
        (move.color && move.type) ||
        (move.type && view[move.cell].ant) ||
        (!move.color && !move.type && move.cell != 4 && view[move.cell].ant)
    ) {
        // console.error("INVALID MOVE:");
        // console.error(move);
        // console.pause();
        return MoveTo(4);
    }

    return move;
}

function OppositeTo(cell) {
    return 8 - cell;
}

function CreateAt(cell, type) {
    type = type || WORKER;
    return {
        cell: cell,
        type: type,
    };
}

function MarkMe(color) {
    return {
        cell: 4,
        color: color,
    };
}

function MoveTo(cell) {
    return {
        cell: cell,
    };
}

function FindAround(type, value) {
    for (var i = 0, cell; cell = view[i]; i++) {
        if (i != 4 && CellMatchesDesc(cell, type, value))
            return i;
    }
    return -1;
}

function CountAround(type, value) {
    var count = 0;
    for (var i = 0, cell; cell = view[i]; i++) {
        if (i != 4 && CellMatchesDesc(cell, type, value))
            count++;
    }
    return count;
}

function CellMatchesDesc(cell, type, value) {
    if (
        (type == "friend" && cell.ant && cell.ant.friend) ||
        (type == "color" && (cell.color == value || !value && cell.color != WHITE)) ||
        (type == "food" && cell.food)
    )
        return true;

    return false;
}
