document.body.style.overflow = "hidden";
//the key strokes for the up and down keys
remove();
var array = [];
var count = 0;
let slotSize = 400;

let items = Array.from(document.querySelectorAll('.middle > .icons'));
if (items.length == 0) throw "error empty";
if (items.count < 3) throw "Needs at least three items!";
let idx = Math.floor(items.length / 2);

items.forEach((it, i) => {
    it.style.transform = 'translateY(' + (slotSize * (i - idx)) + 'px)';
});

function next() {
    let nidx = idx + 1;
    idx = nidx % items.length;
    items.forEach((it, i) => {
        let offset = i - nidx;
        if (offset < -Math.floor((items.length / 2))) {
            offset += items.length;
        }
        if (offset > 0) {
            it.classList.add('warp');
        } else {
            it.classList.remove('warp');
        }
        it.style.transform = 'translateY(' + (slotSize * offset) + 'px)';
        array.push(offset);
    });
    return array;
}
function prev() {
    let nidx = idx - 1;
    idx = (items.length + nidx) % items.length;
    items.forEach((it, i) => {
        let offset = i - nidx;
        if (offset > Math.floor((items.length / 2))) {
            offset -= items.length;
        }
        if (offset < 0) {
            it.classList.add('warp');
        } else {
            it.classList.remove('warp');
        }
        it.style.transform = 'translateY(' + (slotSize * offset) + 'px)';
        array.push(offset);
    });
    return array;
}

function remove() {
    if (count == 1) {} else {
        $('#blankID').fadeOut("slow", function() {
            $('#aboutID').fadeIn("slow", function() {
              console.log("changed");
            });
        });
        $("#blankID").remove();
        count++;
    }
}

function isOnScreen(arr) {
    if (arr[0] == -2) {
        return true;
    } else {
        return false;
    }
}

document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if ($("#aboutTextID").css('display') === 'none' && $("#applyButtonID").css('display') === 'none') {
        if (e.keyCode == "40") {
            //this is down
            //this will open it up
            open();
            let a = prev();
            if (isOnScreen(a)) {
                close();
            }
            array = [];
        } else if (e.keyCode == "38") {
            open();
            let a = next();
            if (isOnScreen(a)) {
                close();
            }
            array = [];
        }
    }
}

//Scroll detection occurs here, without the scrollbar
$("html").on("mousewheel", function(e) {
    open();
    let delta = e.originalEvent.wheelDelta;
    if ($("#aboutTextID").css('display') === 'none' && $("#applyButtonID").css('display') === 'none') {
        if (delta < 0) {
            //This is for the scrolling down
            // animation opens up the brakets
            let a = prev();
            if (isOnScreen(a)) {
                close();
            }
            array = [];
        }
        if (delta > 0) {
            let a = next();
            if (isOnScreen(a)) {
                close();
            }
            array = [];
        }
    }
});

//this is for detecting clicks  for the divs in the middle div
// 1 = the 2nd image , 2 = the  3rd image
$(".middle div").click(function() {
  console.log(($(this).index()));
    if ($(this).index() == '1') {
        $('#theMiddle').fadeOut("slow", function() {
            $('#applyButtonID').fadeIn("slow", function() {});
            $("#backButtonID").fadeIn("slow", function() {
            });
            //Define the event handler here after the btn has been created
            $("#backButtonID").click(function() {

                $('#applyButtonID').fadeOut("slow", function() {
                    $("#backButtonID").fadeOut("slow", function() {
                        $('#theMiddle').fadeIn("slow", function() {});
                    });
                });
            });
        });
    }


    if ($(this).index() == '3') {
        $('#theMiddle').fadeOut("slow", function() {
            $('#aboutTextID').fadeIn("slow", function() {});
            $("#backButtonID").fadeIn("slow", function() {});
            //Define the event handler here after the btn has been created
            $("#backButtonID").click(function() {
                $('#aboutTextID').fadeOut("slow", function() {
                    $("#backButtonID").fadeOut("slow", function() {
                        $('#theMiddle').fadeIn("slow", function() {});
                    });
                });
            });
        });
    }
    if ($(this).index() == '4') {
      $('#theMiddle').fadeOut("slow", function() {
          $('#memeDownloadID').fadeIn("slow", function() {});
          $("#backButtonID").fadeIn("slow", function() {});
          $('#WherestheDownload').fadeIn("slow",function(){});
          //Define the event handler here after the btn has been created
          $("#backButtonID").click(function() {
              $('#memeDownloadID').fadeOut("slow", function() {
                  $("#backButtonID").fadeOut("slow", function() {
                    $("#WherestheDownload").fadeOut("slow", function() {
                      $('#theMiddle').fadeIn("slow", function() {

                      });
                  });
                  });
              });
          });
      });
    }
});

function open() {
    anime({
        targets: "div.right",
        translateX: {
            value: 200,
            duration: 500
        }
    });
    anime({
        targets: "div.left",
        translateX: {
            value: -200,
            duration: 500
        }
    });
}
function close() {
    anime({
        targets: "div.right",
        translateX: {
            value: 0,
            duration: 500
        }
    });
    anime({
        targets: "div.left",
        translateX: {
            value: 0,
            duration: 500
        }
    });
}
