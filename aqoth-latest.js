function aqothLatest() {
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
   go on to find another queen

   ----------------------------------------------------

   start:
   glide around until finding food, make 1 worker
   continue gliding until finding any color
   gravitate towards color's mass center:
       when worker finds color:
           signal the queen where to go
   */

   return Validate(me.type == QUEEN ? forQueen() : forWorker());

   const WORKER = 1;
   const QUEEN = 5;

   const WHITE = 1;
   const YELLOW = 2;
   const RED = 5;

   var myCell = view[4];
   var me = myCell.ant;

   function forQueen() {
      var worker = FindAround("friend");

      if (worker != -1) {
         var workerMark = FindRichestCellMark(worker);
         return MoveTo(workerMark ? workerMark : RightOf(worker));
      } else {
         if (me.food)
            return CreateAt(3);
         else {
            var foodPos = FindAround("food");
            return foodPos != -1 ? MoveTo(foodPos) : RedTrail();
         }
      }
   }

   function forWorker() {
      var queen = FindAround("friend");
      if (queen == -1)
         return MoveTo(4);
      else {
         return;
         var color = FindAround("color");
         if (color != -1) {
            var richestCell = FindRichestCell();
            MarkRichestCell(richestCell, queen);
            return MoveTo(richestCell);
         } else
            return MoveTo(LeftOf(queen));
      }
   }

   ///////////////////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////////////////

   // function MarkRichestCell(cell, queen) {
   //    if (SeeEachOther(cell, queen))
   // }
   //
   // function FindRichestCellMark(worker) {
   //
   // }

   function FindRichestCell() {
      var rowSums = [0, 0, 0];
      var colSums = [0, 0, 0];
      for (var x = 0; x < 3; x++) {
         for (var y = 0; y < 3; y++) {
            var aCell = y * 3 + x;
            if (view[aCell].color != 1) {
               rowSums[x]++;
               colSums[y]++;
            }
         }
      }
      var richestRow = rowSums.indexOf(Math.max(...rowSums));
      var richestCol = colSums.indexOf(Math.max(...colSums));
      var richestCell = richestCol * 3 + richestRow;
      return richestCell;
   }

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
      if (pos == 5 || pos == 8)
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
         console.error("INVALID");
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

   function FindAroundAll(type, value) {
      var all = [];
      for (var i = 0, cell; cell = view[i]; i++) {
         if (i != 4 && CellMatchesDesc(cell, type, value))
            all.push(i);
      }
      return all;
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
         (type == "color" && (value ? cell.color == value : cell.color != WHITE)) ||
         (type == "food" && cell.food)
      )
         return true;

      return false;
   }
}
