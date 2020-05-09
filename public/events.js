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


document.getElementById("wet_now").addEventListener("click", function(){
  document.getElementById("form_wet_now").submit()
});

function dryfood() {
  var elem1 = document.getElementById("events2container");
  var elem2 = document.getElementById("events_food_dry_container")
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

document.getElementById("dryfood").addEventListener("click", dryfood);

function foodDryBack() {
  var elem1 = document.getElementById("events2container");
  var elem2 = document.getElementById("events_food_dry_container");
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

document.getElementById("food_dry_arrow").addEventListener("click", foodDryBack);


document.getElementById("dry_now").addEventListener("click", function(){
  document.getElementById("form_dry_now").submit()
});



function potty() {
  var elem1 = document.getElementById("events");
  var elem2 = document.getElementById("events_potty_container")
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

document.getElementById("addWalk").addEventListener("click", potty);

function walkback() {
  var elem1 = document.getElementById("events");
  var elem2 = document.getElementById("events_potty_container");
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

document.getElementById("events_potty_arrow").addEventListener("click", walkback);

function pee() {
  var elem1 = document.getElementById("events_potty_container");
  var elem2 = document.getElementById("events_potty_container_pee")
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

document.getElementById("pee").addEventListener("click", pee);

function peeBack() {
  var elem1 = document.getElementById("events_potty_container");
  var elem2 = document.getElementById("events_potty_container_pee");
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

document.getElementById("events_potty_pee_arrow").addEventListener("click", peeBack);

document.getElementById("pee_now").addEventListener("click", function(){
  document.getElementById("form_pee_now").submit()
});