$(document).ready(function() {
  var strict = false;
  var power = false;
  var seq = [];
  var userSeq = [];
  var num = 0;
  var cap = 1;
  var winLimit = 20;
  
  function resetColor() {
    $("#btn1").addClass("green");
    $("#btn2").addClass("red");
    $("#btn3").addClass("yellow");
    $("#btn4").addClass("blue");
    $("#btn1").removeClass("greenOn");
    $("#btn2").removeClass("redOn");
    $("#btn3").removeClass("yellowOn");
    $("#btn4").removeClass("blueOn");
  }
  
  function resetVars() {
    seq = [];
    userSeq = [];
    num = 0;
    cap = 1;
    window.clearInterval(seqPlayer);
    window.clearInterval(resetTimer);
  }
  
  $("#strictCircle").on("click", function() {
    if (strict) {
      $("#strictCircle").removeClass("yellow");
      $("#strictCircle").addClass("grey");
      strict = false;
    } else {
      $("#strictCircle").addClass("yellow");
      $("#strictCircle").removeClass("grey");
      strict = true;
    }
  });
  
  function playSeq() {
    resetColor();
    if (num < cap) {
      if (seq[num]==1) {
        $("#btn1").addClass("greenOn");
      } else if (seq[num]==2) {
        $("#btn2").addClass("redOn");
      } else if (seq[num]==3) {
        $("#btn3").addClass("yellowOn");
      } else if (seq[num]==4) {
        $("#btn4").addClass("blueOn");
      }
      $.playSound(seq[num]); 
    }
    //console.log(userSeq, num, cap);
    num++;
    if (num > cap) {
      num = 0;
      window.clearInterval(seqPlayer);
    }; 
    resetTimer = window.setTimeout(resetColor,800);
  };
  
  var seqPlayer = window.setInterval("playSeq", 1000);
  window.clearInterval(seqPlayer);
  var resetTimer = window.setTimeout(resetColor,800)
  window.clearInterval(resetTimer);
  
  $.generateSeq = function(length)  {
    var seq = [];
    
    for (var i=0; i<length; i++) {
      var tmp = Math.floor(Math.random() * 4+1);
      seq.push(tmp);
    } 
    //document.getElementById("string").innerHTML = seq;
    return seq;
  };
  
  $.start = function() {
    //document.getElementById("log").innerHTML = "";
    
    resetVars();
    seq = $.generateSeq(winLimit);
    $.round();
  }
  $("#startBtn").on("click", function() {
    $.start();
  });
  
  $.playSound = function (num) {
    var audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound"+num+".mp3");
    audio.loop = false;
    audio.play();
  };
  
  $.round = function () {
    document.getElementById("count").innerHTML = cap;
    if (seq.length > 0) {
      seqPlayer = window.setInterval(playSeq, 1000);
    } else {
      resetTimer = window.setTimeout(resetColor,800)
    }
  }; 
  
  $.checkInput = function (btnPress) {
    //console.log(btnPress, userSeq.length);
    window.clearInterval(seqPlayer);
    if (btnPress == seq[userSeq.length]) {
      userSeq.push(btnPress);
      //document.getElementById("log").innerHTML = ""
      if (userSeq.length == cap) {
        userSeq = [];
        if (cap==winLimit) {
          resetVars();
          resetColor();
          alert("victory!");
        } else {
          cap++;
          $.round();
        }
      }
    } else {
      userSeq = [];
      window.clearInterval(seqPlayer);
      if (strict) {
        resetVars();
        seq = $.generateSeq(winLimit);
      }
      $.round();
    }
     
  };
  
  $("#btn1").on("click", function() {
    $.playSound(1);
    //document.getElementById("log").innerHTML += "1, "
    $("#btn1").addClass("greenOn");
    $.checkInput(1);
  });
  $("#btn2").on("click", function() {
    $.playSound(2);
    //document.getElementById("log").innerHTML += "2, ";
    $("#btn2").addClass("redOn");
    $.checkInput(2);
  });
  $("#btn3").on("click", function() {
    $.playSound(3); 
    //document.getElementById("log").innerHTML += "3, ";
    $("#btn3").addClass("yellowOn");
    $.checkInput(3);
  });
  $("#btn4").on("click", function() {
    $.playSound(4);
    //document.getElementById("log").innerHTML += "4, ";
    $("#btn4").addClass("blueOn");
    $.checkInput(4);
  });
  $("#btn4").onmouseup = function(){
    //resetColor();
  };
  $("#btn4").onmousedown = function(){
    //$("#btn4").addClass("blueOn");
  };
});