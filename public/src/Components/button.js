export default function button(input) {
  const { text, id, onclick, containerClass } = input;
  let subTitleContainer = document.querySelector(`.${containerClass}`);

  var loginButton = document.createElement("button");
  loginButton.innerHTML = text;
  loginButton.onclick = onclick;
  loginButton.setAttribute("id", id);
  subTitleContainer.appendChild(loginButton);
}
