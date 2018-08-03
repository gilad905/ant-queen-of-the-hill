window.onload = function() {
   addStyles();
   addSolutionCode();

   addTableTogglers();
   addMapDashboardToggler();
   addGameDashboardToggler();
   addNewChalToggler();
   addChalTestToggler();

   setTimeout(function() {
      fitCanvasClick();
      markPlayers();
      tweakMap();
   }, 1000);
};

var resizeTimer;
window.onresize = function() {
   clearTimeout(resizeTimer);
   resizeTimer = setTimeout(fitCanvasClick, 500);
}

function tweakMap() {
   document.getElementById("mapEdit").click();
}

function markPlayers() {
   document.getElementById("check_all").click();
   var eIncluded = document.querySelector("#leaderboard_body tr:first-child td:nth-child(7) input");
   eIncluded.click();
   var eShowMap = document.querySelector("#leaderboard_body tr:first-child td:nth-child(8) input");
   eShowMap.click();
}

function fitCanvasClick() {
   var eButton = document.getElementById("fit_canvas");
   eButton.click();
}

function addStyles() {
   var eStyle = document.createElement("STYLE");
   eStyle.innerText = "\
      .toggler-button {\
          font-weight: bold;\
          color: blue;\
      }";
   document.head.appendChild(eStyle);
}

function createToggler(eToToggle, startsOpen) {
   // startsOpen = true;
   if (!Array.isArray(eToToggle))
      eToToggle = [eToToggle];
   var eToggler = document.createElement("INPUT");
   eToggler.type = "checkbox";
   if (startsOpen)
      eToggler.checked = true;
   else
      eToToggle.forEach(elem => elem.style.display = "none");
   eToggler.onchange = function() {
      eToToggle.forEach(elem => {
         var toDisplay = "none";
         if (eToggler.checked) {
            toDisplay = "block";
            if (elem.tagName == "THEAD")
               toDisplay = "table-header-group";
            else if (elem.tagName == "TBODY")
               toDisplay = "table-row-group";
         }
         elem.style.display = toDisplay;
      });
   };
   return eToggler;
}

function addChalTestToggler() {
   var eHeading = document.getElementById("new_challenger_debug_heading");
   var eDiv = eHeading.parentElement;
   eDiv.before(eHeading)
   var eBr = document.createElement("BR");
   eDiv.after(eBr);
   var eButton = createToggler(eDiv);
   eHeading.classList += "toggler-button";
   eHeading.after(eButton);
}

function addNewChalToggler() {
   var eHeading = document.getElementById("new_challenger_heading");
   var eDiv = eHeading.parentElement;
   eDiv.before(eHeading)
   var eBr = document.createElement("BR");
   eDiv.after(eBr);
   var eButton = createToggler(eDiv);
   eHeading.classList += "toggler-button";
   eHeading.after(eButton);
}


function addTableTogglers() {
   var eTables = document.getElementsByTagName("TABLE");
   for (var i = 0; i < eTables.length; i++) {
      var eTable = eTables[i];
      var eButton = createToggler([eTable.tBodies[0], eTable.tHead]);
      eTable.caption.appendChild(eButton);
      eTable.caption.classList += "toggler-button";
   }
}

function addMapDashboardToggler() {
   var eElem = document.querySelector("body > *:nth-child(4)");

   var eDashboard = document.createElement("DIV");
   eDashboard.classList = "dashboard";

   var eLabel = document.createElement("LABEL");
   eLabel.innerText = "Map Dashboard";
   eLabel.classList += "toggler-button";

   var eButton = createToggler(eDashboard, true);

   eElem.before(eLabel);
   eLabel.after(eButton);

   for (var i = 0; i < 9; i++) {
      var eNext = eElem.nextSibling;
      eDashboard.appendChild(eElem);
      eElem = eNext;
   }
   eButton.after(eDashboard);
}

function addGameDashboardToggler() {
   var eTable = document.getElementsByTagName("TABLE")[1];

   var eDashboard = document.createElement("DIV");
   eDashboard.classList = "dashboard";

   var eLabel = document.createElement("LABEL");
   eLabel.innerText = "Game Dashboard";
   eLabel.classList += "toggler-button";

   var eButton = createToggler(eDashboard, true);

   eTable.after(eLabel);
   eLabel.after(eButton);

   var eElem = eButton.nextSibling;
   for (var i = 0; i < 26; i++) {
      var eNext = eElem.nextSibling;
      eDashboard.appendChild(eElem);
      eElem = eNext;
   }
   eButton.after(eDashboard);
}

function addSolutionCode() {
   var eTextarea = document.getElementById("new_challenger_text");
   var code = aqothLatest.toString();
   code = code.substring(code.indexOf('{') + 1);
   code = code.substring(0, code.lastIndexOf('}') - 1);
   eTextarea.innerText = code;
}
