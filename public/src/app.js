import button from "./Components/button.js";

//When the window is loaded we execute the function stat
window.addEventListener("load", start, false);

function workingSaga() {
  const url = "/working";
  document.location.href = url;
}
function start() {
  button({
    text: "Execute working saga",
    id: "loginButton",
    onclick: workingSaga,
    containerClass: "nextOperation"
  });
}
