/*
same as 1, but walk in a staright, colored line.

if is queen:
   if on white:
      mark red
   else:
      if has food and no friend around:
         create friend on 1
      else:
         move opposite of near red
// else:

*/

var WORKER = 1;
var QUEEN = 5;

var WHITE = 1;
var YELLOW = 2;
var RED = 5;

var me = view[4].ant;

function Main() {
   if (me.type == QUEEN) {
      if (view[4].color == WHITE)
         return MarkMe(RED);
      else {
         var friendAround = FindAround("friend");
         if (me.food && friendAround == -1) {
            return CreateAt(1);
         } else {
            var redPos = FindAround("color", RED);
            if (redPos != -1) {
               var oppRed = OppositeTo(redPos);
               return MoveTo(oppRed);
            } else
               return MoveTo(0);
         }
      }
   } else
      return MarkMe(YELLOW);
}

return Validate(Main());

///////////////////////////////////////////////////////////////////////////////

function Validate(move) {
   var nothing = MoveTo(4);

   if (move.cell === undefined || move.cell < 0 || move.cell > 8)
      return nothing;
   if (move.color < 1 || move.color > 8)
      return nothing;
   if (move.type < 1 || move.type > 4)
      return nothing;

   if (move.color && move.type)
      return nothing;
   if (!move.color && !move.type && move.cell != 4 && view[move.cell].ant)
      return nothing;

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
   for (var i in view) {
      if (i != 4) {
         if (type == "friend" && view[i].ant && view[i].ant.friend)
            return i;
         else if (type == "color" && view[i].color == value)
            return i;
      }
   }

   return -1;
}

function NearPos(friendPos) {
   friendPos = parseInt(friendPos);
   var toRet = -1;

   if (friendPos == 3)
      toRet = 0;
   else if ([2, 5].includes(friendPos))
      toRet = friendPos + 3;
   else if (friendPos == 8)
      toRet = 7;
   else
      toRet = friendPos + 1;

   // console.log(friendPos + " - " + toRet);
   return toRet;
}
