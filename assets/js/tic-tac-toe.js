$(document).ready(function() {
  var game = true;
  var user = "X";
  var comp = "O";
  var depth = 2;
  var myVar;
  var model_loc = '../assets/tf/v1/model.json';

/*
  $("#v1").on("click", function() {
    model_loc = 'assets/tf/v1/model.json';
    //console.log(model_loc);
  });
  $("#v2").on("click", function() {
    model_loc = 'assets/tf/v2/model.json';
    //console.log(model_loc);
  });
*/

  $.getGrid = function() {
    var grid = [];
    for (var i=1; i<=9; i++) {
      grid[i] = document.getElementById("btn"+i).innerHTML;
    }
    return grid;
  };
  $.setGrid = function(grid) {
    for (var i=1; i<=9; i++) {
      document.getElementById("btn"+i).innerHTML = grid[i];
    }
  };
  function reset() {
    game = true;
    for (var i=1; i<=9; i++) {
      document.getElementById("btn"+i).innerHTML = "";
    }
    document.getElementById("result").innerHTML = ""
  }
  $.reset = function() {
    game = true;
    for (var i=1; i<=9; i++) {
      document.getElementById("btn"+i).innerHTML = "";
    }
    document.getElementById("result").innerHTML = ""
  }
  $.checkState = function() {
    var grid = $.getGrid();
    grid.shift();

    var result = $.evaluate(grid);

    if (result[0]) {
      document.getElementById("result").innerHTML = result[1] + " wins!";
      game = false;
      myVar = window.setTimeout(reset, 2000);
      return true;
    } else if (result[1]=="full") {
      document.getElementById("result").innerHTML = "It's a draw!";
      game = false;
      myVar = window.setTimeout(reset, 2000);
      return true;
    } else {
      return false;
    }
  }
  $.evaluate = function(grid) {
    if (grid[0]==grid[1]&&grid[1]==grid[2]&&grid[2]==comp) {
      return [true, "comp"];
    } else if (grid[3]==grid[4]&&grid[4]==grid[5]&&grid[5]==comp) {
      return [true, "comp"];
    } else if (grid[6]==grid[7]&&grid[7]==grid[8]&&grid[8]==comp) {
      return [true, "comp"];
    } else if (grid[0]==grid[3]&&grid[3]==grid[6]&&grid[6]==comp) {
      return [true, "comp"];
    } else if (grid[1]==grid[4]&&grid[4]==grid[7]&&grid[7]==comp) {
      return [true, "comp"];
    } else if (grid[2]==grid[5]&&grid[5]==grid[8]&&grid[8]==comp) {
      return [true, "comp"];
    } else if (grid[0]==grid[4]&&grid[4]==grid[8]&&grid[8]==comp) {
      return [true, "comp"];
    } else if (grid[2]==grid[4]&&grid[4]==grid[6]&&grid[6]==comp) {
      return [true, "comp"];
    } else if (grid[0]==grid[1]&&grid[1]==grid[2]&&grid[2]==user) {
      return [true, "user"];
    } else if (grid[3]==grid[4]&&grid[4]==grid[5]&&grid[5]==user) {
      return [true, "user"];
    } else if (grid[6]==grid[7]&&grid[7]==grid[8]&&grid[8]==user) {
      return [true, "user"];
    } else if (grid[0]==grid[3]&&grid[3]==grid[6]&&grid[6]==user) {
      return [true, "user"];
    } else if (grid[1]==grid[4]&&grid[4]==grid[7]&&grid[7]==user) {
      return [true, "user"];
    } else if (grid[2]==grid[5]&&grid[5]==grid[8]&&grid[8]==user) {
      return [true, "user"];
    } else if (grid[0]==grid[4]&&grid[4]==grid[8]&&grid[8]==user) {
      return [true, "user"];
    } else if (grid[2]==grid[4]&&grid[4]==grid[6]&&grid[6]==user) {
      return [true, "user"];
    } else {
      if (grid[1]!=""&&grid[2]!=""&&grid[3]!=""&&grid[4]!=""&&grid[5]!=""&&grid[6]!=""&&grid[7]!=""&&grid[8]!=""&&grid[0]!="") {
        return [false, "full"];
      } else {
        return [false, ""];
      }
    }
  };
  $.compMove = async function(depth, grid) {
    const model = await tf.loadModel(model_loc)

    if (grid == null) {
      var tmpGrid = $.getGrid();
    }
    else {
      var tmpGrid = grid.slice();
    }

    var moves = [];
    var top_move = 0;
    var top_score = 1;

    //create a set of viable moves
    for (var i=1; i<=9; i++) {
      if (tmpGrid[i]=="") {
        var tmp = tmpGrid.slice();
        tmp[i] = comp;
        tmpArr = [];
        for (var j=1; j<=9; j++) {
          if (tmp[j]=="") {
            tmpArr.push(0);
          }
          else if (tmp[j]==user) {
            tmpArr.push(1);
          }
          else {
            tmpArr.push(-1);
          }
        }
        //get predictions from model
        const tmpTensor = tf.tensor3d([[tmpArr]]);
        const pred = model.predict(tmpTensor).dataSync();
        //console.log(tmpArr, pred);

        if (pred < top_score) {
          top_score = pred;
          top_move = i;
        }
      }
    }
    tmpGrid[top_move]=comp;

    $.setGrid(tmpGrid);
    $.checkState();
  };

  $("#reset").on("click", function() {
    $.reset();
  });
  $("#btn1").on("click", function() {
    if (game && document.getElementById("btn1").innerHTML.length != 1) {
      document.getElementById("btn1").innerHTML = user;
      if (!$.checkState()) {
        $.compMove(depth);
      }
      $.checkState();
    }
  });
  $("#btn2").on("click", function() {
    if (game && document.getElementById("btn2").innerHTML.length != 1) {
      document.getElementById("btn2").innerHTML = user;
      if (!$.checkState()) {
        $.compMove(depth);
      }
      $.checkState();
    }
  });
  $("#btn3").on("click", function() {
    if (game && document.getElementById("btn3").innerHTML.length != 1) {
      document.getElementById("btn3").innerHTML = user;
      if (!$.checkState()) {
        $.compMove(depth);
      }
      $.checkState();
    }
  });
  $("#btn4").on("click", function() {
    if (game && document.getElementById("btn4").innerHTML.length != 1) {
      document.getElementById("btn4").innerHTML = user;
      if (!$.checkState()) {
        $.compMove(depth);
      }
      $.checkState();
    }
  });
  $("#btn5").on("click", function() {
    if (game && document.getElementById("btn5").innerHTML.length != 1) {
      document.getElementById("btn5").innerHTML = user;
      if (!$.checkState()) {
        $.compMove(depth);
      }
      $.checkState();
    }
  });
  $("#btn6").on("click", function() {
    if (game && document.getElementById("btn6").innerHTML.length != 1) {
      document.getElementById("btn6").innerHTML = user;
      if (!$.checkState()) {
        $.compMove(depth);
      }
      $.checkState();
    }
  });
  $("#btn7").on("click", function() {
    if (game && document.getElementById("btn7").innerHTML.length != 1) {
      document.getElementById("btn7").innerHTML = user;
      if (!$.checkState()) {
        $.compMove(depth);
      }
      $.checkState();
    }
  });
  $("#btn8").on("click", function() {
    if (game && document.getElementById("btn8").innerHTML.length != 1) {
      document.getElementById("btn8").innerHTML = user;
      if (!$.checkState()) {
        $.compMove(depth);
      }
      $.checkState();
    }
  });
  $("#btn9").on("click", function() {
    if (game && document.getElementById("btn9").innerHTML.length != 1) {
      document.getElementById("btn9").innerHTML = user;
      if (!$.checkState()) {
        $.compMove(depth);
      }
      $.checkState();
    }
  });
});
