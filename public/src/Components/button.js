export default function button(input) {
  const { text, id, onclick, containerClass } = input;
  let subTitleContainer = document.querySelector(`.${containerClass}`);

  var button = document.createElement("button");
  button.innerHTML = text;
  button.onclick = onclick;
  button.setAttribute("id", id);
  button.setAttribute("class", "button");
  subTitleContainer.appendChild(button);
}
