export default function linkBar() {
  let linkContainer = document.querySelector(".linkContainer");

  //GITHUB LINK
  var img = new Image();
  img.src = "../../assets/github.png";
  img.setAttribute("class", "icon");
  img.onclick = function() {
    window.open("https://github.com/NicolasGehring/SAGA");
  };
  linkContainer.append(img);
}
