/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function toogleNav() {
    console.log('toogling nav')
    var x = document.getElementById("nav-bar");
    if (x.className === "nav") {
        x.className += " responsive";
    } else {
        x.className = "nav";
    }
}