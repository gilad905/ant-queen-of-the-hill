(function Ready() {
   console.pause = function() {
      console.log("PAUSE");
      $('#pause').trigger('click');
   };

   console.setDelay = function(value) {
      console.log("SET DELAY");
      $('#delay').val(value);
      $('#delay').trigger('change');
   };

   $('#squares_per_side').val(25);
   $('#squares_per_side').trigger('change');

   // console.showQueen = function (playerID) {
   //    playerID = playerID || 0;
   //    for (var i = 0, ant; ant = popultaion[i]; i++) {
   //       if (i.type == 5 && i.player.id == playerID)
   //          console.showPoint(i.x, i.y);
   //    }
   // };
   //
   // console.showPoint = function(x, y) {
   //    var canvas = document.getElementById("display_canvas");
   //    var ctx = canvas.getContext("2d");
   //    x = (x / 2500 * canvas.width);
   //    y = y / 1000 * canvas.height;
   //
   //    ctx.beginPath();
   //    ctx.arc(x, y, 24, 0, 2 * Math.PI);
   //    ctx.strokeStyle = "black";
   //    ctx.lineWidth = 10;
   //    ctx.stroke();
   //
   //    ctx.beginPath();
   //    ctx.arc(x, y, 20, 0, 2 * Math.PI);
   //    ctx.strokeStyle = "white";
   //    ctx.lineWidth = 6;
   //    ctx.stroke();
   // };

   for (var i = 0, player; player = players[i]; i++)
      player.included = (player.id == 0);
   displayLeaderboard();

   var style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML =
      'img /*,' +
      '#game_counter,' +
      '#loaded_at,' +
      '#loaded_at + table,' +
      '#loaded_at + table + div,' +
      '#loaded_at + table + div + div */ {' +
      '   display: none !important;' +
      '}';

   document.getElementsByTagName('head')[0].appendChild(style);

   displayCanvas.width = document.body.clientWidth - 4;
   displayCanvas.height = displayCanvas.width * 500 / 1250;
   $('#new_challenger_text').width(Math.min(1250, displayCanvas.width - 20));
   displayArena();
})();
