function aqothLatest() {
   const WORKER = 1;
   const QUEEN = 5;

   const WHITE = 1;
   const YELLOW = 2;
   const RED = 5;

   const COLOR_MAP = ["", "white", "yellow", "pink", "cyan", "red", "green", "blue", "black"];

   const FRIEND = 1;
   const FOOD = 2;
   const COLOR = 3;

   var myCell = view[4];
   var me = myCell.ant;

   return Validate(me.type == QUEEN ? forQueen() : forWorker());

   function forQueen() {
      if (myCell.color != RED)
         return MarkMe(RED);
      else if (me.food && find(FRIEND) == -1)
         return CreateAt(3);
      else {
         var foodPos = Find(FOOD);
         if (foodPos != -1)
            return MoveTo(foodPos);
         else
            return RedTrail();
      }
   }

   function forWorker() {
      var queen = Find(FRIEND);
      if (queen == -1)
         return Stand();
      else {
         // var color = Find(COLOR);
         // if (color != -1) {
         //    var richestCell = FindRichestCell();
         //    // MarkRichestCell(richestCell, queen);
         //    return MoveTo(richestCell);
         // } else
         return MoveTo(LeftOf(queen));
      }
   }

   ///////////////////////////////////////////////////////////////////////////////

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
         console.error("INVALID: " + JSON.stringify(move));
         printView();
         // console.pause();
         return Stand();
      }

      return move;
   }

   function RedTrail() {
      var redPos = Find(COLOR, RED);
      if (redPos != -1) {
         var oppRed = OppositeTo(redPos);
         return MoveTo(oppRed);
      } else
         return MoveTo(2);
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

   function Stand() {
      return MoveTo(4);
   }

   ///////////////////////////////////////////////////////////////////////////////

   function Find(type, value) {
      for (var i = 0, cell; cell = view[i]; i++) {
         if (i != 4 && CellMatchesDesc(cell, type, value))
            return i;
      }
      return -1;
   }

   function FindAll(type, value) {
      var all = [];
      for (var i = 0, cell; cell = view[i]; i++) {
         if (i != 4 && CellMatchesDesc(cell, type, value))
            all.push(i);
      }
      return all;
   }

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

   function CellMatchesDesc(cell, type, value) {
      if (
         (type == FRIEND && cell.ant && cell.ant.friend) ||
         (type == COLOR && (value ? cell.color == value : cell.color != WHITE)) ||
         (type == FOOD && cell.food)
      )
         return true;

      return false;
   }

   ///////////////////////////////////////////////////////////////////////////////

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

   function OppositeTo(cell) {
      return 8 - cell;
   }

   ///////////////////////////////////////////////////////////////////////////////

   function printView() {
      var chars = "";
      var styles = [];
      for (var i = 0; i < 9; i++) {
         if ([3, 6].includes(i))
            chars += "\n";
         var cell = view[i];
         var char = (cell.ant ? (cell.ant.type == QUEEN ? "Q" : "A") : cell.food ? "⃟" : " ");
         char = ((cell.ant && cell.ant.friend) ? char.toLowerCase() : char);
         chars += "%c" + char;
         styles.push("background-color: " + COLOR_MAP[cell.color]);
      }
      styles.unshift(chars);
      console.log.apply(null, styles);
   }
}
