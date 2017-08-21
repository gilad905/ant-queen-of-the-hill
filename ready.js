(function Ready() {
   for (var i = 0, player; player = players[i]; i++)
      player.included = (player.id == 0);
   displayLeaderboard();

   var style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML = 'img { display: none; }';
   document.getElementsByTagName('head')[0].appendChild(style);

   displayCanvas.width = document.body.clientWidth - 4;
   displayCanvas.height = displayCanvas.width * 500 / 1250;
   $('#new_challenger_text').width(Math.min(1250, displayCanvas.width - 20));
   displayArena();
})();
