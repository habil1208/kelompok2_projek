var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 5000);
}

function showPage() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}
/****/

/** FUNCTION NAV-TOGGLE **/

const toggleMenu = () => {
  document.body.classList.toggle("open");
};
