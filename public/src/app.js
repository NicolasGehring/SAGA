import button from "./Components/button.js";
import linkBar from "./Components/link.js";

//When the window is loaded we execute the function stat
window.addEventListener("load", start, false);

function workingSaga() {
  const url = "/working";
  document.location.href = url;
}

function failingSaga() {
  const url = "/failing";
  document.location.href = url;
}
function start() {
  button({
    text: "Execute working saga",
    id: "workingSaga",
    onclick: workingSaga,
    containerClass: "buttons"
  });

  button({
    text: "Execute failing saga",
    id: "failingSaga",
    onclick: failingSaga,
    containerClass: "buttons"
  });
  //Ads the github logo
  linkBar();
}
