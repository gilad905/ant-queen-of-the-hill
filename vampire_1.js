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
if it's a spot - find its center
if it's a trail - follow it
favor spots over trails (higher chance that the queen is idle)
trace the queen
steal from it with the worker, until it's empty
go on until finding another queen

*/

var WORKER = 1;
var QUEEN = 5;

var WHITE = 1;
var YELLOW = 2;
var RED = 5;

var myCell = view[4];
var me = myCell.ant;

function forQueen() {
   if (myCell.color == WHITE)
      return MarkMe(RED);
   else {
      var friendAround = FindAround("friend");
      var redPos = FindAround("color", RED);
      var oppRed = OppositeTo(redPos);

      if (me.food && friendAround == -1) {
         if (redPos != -1 && view[oppRed].color != RED) {
            var workerPos = NewWorker(redPos);
            return CreateAt(workerPos);
         } else
            return MoveTo(4);
      } else {
         if (redPos != -1) {
            return MoveTo(oppRed);
         } else
            return MoveTo(0);
      }
   }
}

function forWorker() {
   if (myCell.color == WHITE)
      return MarkMe(YELLOW);
   else {
      var queenPos = FindAround("friend");
      var redPos = FindAround("color", RED);
      var toGo = ContinuePath(queenPos, redPos);
      return MoveTo(toGo == -1 ? 4 : toGo);
   }
}

return Validate(me.type == QUEEN ? forQueen() : forWorker());

///////////////////////////////////////////////////////////////////////////////

function NewWorker(redPos) {
   if (redPos == 0 || redPos == 2)
      return 7;
   else
      return 1;
}

function ContinuePath(queenPos, redPos) {
   var toGo = -1;
   if (queenPos == 1)
      toGo = redPos == 3 ? 2 : 0;
   else if (queenPos == 3)
      toGo = redPos == 1 ? 6 : 0;
   else if (queenPos == 5)
      toGo = redPos == 1 ? 8 : 2;
   else if (queenPos == 7)
      toGo = redPos == 5 ? 6 : 8;
   return toGo;
}

function Validate(move) {
   if (
      (!move) ||
      (move.cell === undefined || move.cell < 0 || move.cell > 8) ||
      (move.color < 1 || move.color > 8) ||
      (move.type < 1 || move.type > 4) ||
      (move.color && move.type) ||
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
   if (type == "friend" && cell.ant && cell.ant.friend)
      return true;
   else if (type == "color" && cell.color == value)
      return true;
   else if (type == "food" && cell.food)
      return true;

   return false;
}
