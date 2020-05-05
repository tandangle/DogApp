function food() {
    var elem1 = document.getElementById("events");
    var elem2 = document.getElementById("events2container")
    var pos = 0;
    var id = setInterval(frame, .25);
    function frame() {
      if (pos == -2000) {
        clearInterval(id);
      } else {
        pos = pos - 10;
        elem1.style.left = pos + 'px';
      }
    }
    var pos2 = 2000;
    var id2 = setInterval(frame2, .25);
    function frame2() {
        if (pos2 == 0) {
            clearInterval(id2)
        } else {
            pos2 = pos2 - 10;
            elem2.style.left = pos2 +"px";
        } 
    }
}

document.getElementById("addFood").addEventListener("click", food);


function foodBack() {
    var elem1 = document.getElementById("events");
    var elem2 = document.getElementById("events2container");
    var pos = -2000;
    var id = setInterval(frame, .25);
    function frame() {
      if (pos == 0) {
        clearInterval(id);
      } else {
        pos = pos + 10;
        elem1.style.left = pos + 'px';
      }
    }
    var pos2 = 0;
    var id2 = setInterval(frame2, .25);
    function frame2() {
        if (pos2 == 2000) {
            clearInterval(id2)
        } else {
            pos2 = pos2 + 10;
            elem2.style.left = pos2 +"px";
        } 
    }
}

document.getElementById("foodArrow").addEventListener("click", foodBack);

function wetfood() {
  var elem1 = document.getElementById("events2container");
  var elem2 = document.getElementById("events_food_wet_container")
  var pos = 0;
  var id = setInterval(frame, .25);
  function frame() {
    if (pos == -2000) {
      clearInterval(id);
    } else {
      pos = pos - 10;
      elem1.style.left = pos + 'px';
    }
  }
  var pos2 = 2000;
  var id2 = setInterval(frame2, .25);
  function frame2() {
      if (pos2 == 0) {
          clearInterval(id2)
      } else {
          pos2 = pos2 - 10;
          elem2.style.left = pos2 +"px";
      } 
  }
}

document.getElementById("wetfood").addEventListener("click", wetfood);

function foodWetBack() {
  var elem1 = document.getElementById("events2container");
  var elem2 = document.getElementById("events_food_wet_container");
  var pos = -2000;
  var id = setInterval(frame, .25);
  function frame() {
    if (pos == 0) {
      clearInterval(id);
    } else {
      pos = pos + 10;
      elem1.style.left = pos + 'px';
    }
  }
  var pos2 = 0;
  var id2 = setInterval(frame2, .25);
  function frame2() {
      if (pos2 == 2000) {
          clearInterval(id2)
      } else {
          pos2 = pos2 + 10;
          elem2.style.left = pos2 +"px";
      } 
  }
}

document.getElementById("food_wet_arrow").addEventListener("click", foodWetBack);