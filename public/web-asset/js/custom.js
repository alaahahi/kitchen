function disableSelectCopy(e) {
   var pressedKey = String.fromCharCode(e.keyCode).toLowerCase();
      if (e.ctrlKey && (pressedKey == "c" || pressedKey == "x" || pressedKey == "a"|| pressedKey == "{")) {
       return false;
   }
   if (!e.ctrlKey &&  pressedKey == "{" ){
       return false;
   }
}
document.onselectstart = new Function ("return false")

if (window.sidebar) {
 document.onmousedown = disableselect
 document.onclick = reEnable
}
function disableselect(e) {
 return false
}

function reEnable() {
 return true
}
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = disableSelectCopy;
document.addEventListener("keydown", (objEvent) => {
   if (objEvent.ctrlKey || objEvent.metaKey) {
       if (objEvent.keyCode == 65 || objEvent.keyCode == 97 || objEvent.keyCode == 123 || objEvent.keyCode == 18) {
           return false;
       }
   }
});



function copy() {
   var copyText = document.getElementById("share");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  $('#mess_copy').show();
  setTimeout(function() { $("#mess_copy").hide(); }, 6000);
}
