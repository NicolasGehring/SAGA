import button from "./Components/button.js";
import { test } from "./SAGA/Saga.js";

//When the window is loaded we execute the function stat
window.addEventListener("load", start, false);

function start() {
  button({
    text: "Execute working saga",
    id: "loginButton",
    onclick: test,
    containerClass: "nextOperation"
  });
}
