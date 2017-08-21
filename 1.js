/*
if is queen:
   if on white:
      mark red
   else:
      if friend around:
         move somewhere near friend
      else:
         if has food:
            produce friend somewhere
         else:
            move somewhere
else:
   if on white:
      mark yellow
   else:
      if queen around:
         move somwhere near queen
*/

function createAt(cell, type) {
   return {
      cell: cell,
      type: type,
   };
}

function markMe(color) {
   return {
      cell: 4,
      color: color,
   };
}

function moveTo(cell) {
   return {
      cell: cell,
   };
}

function friendAround() {
   for (var i in view)
      if (i != 4 && view[i].ant && view[i].ant.friend)
         return i;
   return -1;
}

function nearPos(friendPos) {
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

///////////////////////////////////////////////////////////////////////////////

var me = view[4].ant;

if (me.type == 5) {
   if (view[4].color == 1)
      return markMe(5);
   else {
      var friendPos = friendAround();
      if (friendPos != -1) {
         var newPos = nearPos(friendPos);
         return moveTo(newPos);
      } else {
         if (me.food)
            return createAt(1, 1);
         else
            return moveTo(1);
      }
   }
} else {
   if (view[4].color == 1) {
      return markMe(2);
   } else {
      var friendPos = friendAround();
      if (friendPos != -1) {
         var newPos = nearPos(friendPos);
         return moveTo(newPos)
      } else
         console.error("Queen is not around!");
   }
}
