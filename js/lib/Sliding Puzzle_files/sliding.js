
define(function (){

  var sliding = function () {

    var context = document.getElementById('puzzle').getContext('2d');

    var img = new Image();
    //img.src = 'http://www.brucealderman.info/Images/dimetrodon.jpg';
    img.src = './img/img_20150318_150947.jpg';
    //img.src = 'http://localhost/2015-05-1311.13.23.jpg';
    img.addEventListener('load', drawTiles, false);

    var boardSize = document.getElementById('puzzle').width;
    //var tileCount = document.getElementById('scale').value;
    var tileCount = 4;

    var tileSize = boardSize / tileCount;

    var clickLoc = new Object;
    clickLoc.x = 0;
    clickLoc.y = 0;

    var emptyLoc = new Object;
    emptyLoc.x = 0;
    emptyLoc.y = 0;

    var solved = false;

    var boardParts;
    setBoard();

    // document.getElementById('scale').onchange = function() {
    //   tileCount = this.value;
    //   tileSize = boardSize / tileCount;
    //   setBoard();
    //   drawTiles();
    // };

    function getClickPosition(e) {
      var parentPosition = getPosition(e.currentTarget);
      var xPosition = e.clientX - parentPosition.x;
      var yPosition = e.clientY - parentPosition.y;
      console.log(xPosition+' - '+yPosition)

    }
     
    function getPosition(element) {
        var xPosition = 0;
        var yPosition = 0;
          
        while (element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }
        return { x: xPosition, y: yPosition };
    }

    // document.getElementById('puzzle').onclick = function(e) {
    //   clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
    //   clickLoc.y = Math.floor((e.pageY - this.offsetTop ) / tileSize);
    //   //console.log(distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y))
    //   console.log('eje X: '+e.pageX +' - '+this.offsetLeft)
    //   console.log('eje Y: '+e.pageY +' - '+e.screenY +' - '+e.offsetY+' - '+this.offsetTop)
    //   console.log(clickLoc)
    //   console.log(emptyLoc)

    //   //getClickPosition(e)

    //   if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
    //     slideTile(emptyLoc, clickLoc);
    //     drawTiles();
    //   }
    //   if (solved) {
    //     setTimeout(function() {alert("You solved it!");}, 500);
    //   }
    // };

    document.getElementById('puzzle').onclick = function(e) {
      clickLoc.x = Math.floor(e.offsetX / tileSize);
      clickLoc.y = Math.floor(e.offsetY / tileSize);
      if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
        slideTile(emptyLoc, clickLoc);
        drawTiles();
      }
      if (solved) {
        setTimeout(function() {alert("You solved it!");}, 500);
      }

    }

    function setBoard() {
      boardParts = new Array(tileCount);
      for (var i = 0; i < tileCount; ++i) {
        boardParts[i] = new Array(tileCount);
        for (var j = 0; j < tileCount; ++j) {
          boardParts[i][j] = new Object;
          boardParts[i][j].x = (tileCount - 1) - i;
          boardParts[i][j].y = (tileCount - 1) - j;
        }
      }
      emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
      emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
      solved = false;
    }

    function drawTiles() {
      context.clearRect ( 0 , 0 , boardSize , boardSize );
      for (var i = 0; i < tileCount; ++i) {
        for (var j = 0; j < tileCount; ++j) {
          var x = boardParts[i][j].x;
          var y = boardParts[i][j].y;
          if(i != emptyLoc.x || j != emptyLoc.y || solved == true) {
            context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
                i * tileSize, j * tileSize, tileSize, tileSize);
          }
        }
      }
    }

    function distance(x1, y1, x2, y2) {
      console.log(x1+'-'+y1+' + '+x2+'-'+y2)
      return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    function slideTile(toLoc, fromLoc) {
      if (!solved) {
        boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
        boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
        boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
        boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
        toLoc.x = fromLoc.x;
        toLoc.y = fromLoc.y;
        checkSolved();
      }
    }

    function checkSolved() {
      var flag = true;
      for (var i = 0; i < tileCount; ++i) {
        for (var j = 0; j < tileCount; ++j) {
          if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
            flag = false;
          }
        }
      }
      solved = flag;
    }
  }
  return sliding

})