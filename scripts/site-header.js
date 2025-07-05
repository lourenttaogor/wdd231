const navIcon = document.querySelector("#ham-btn");
const navBar = document.querySelector('#nav-bar');

navIcon.addEventListener("click", () => {
    navIcon.classList.toggle("show");
    navBar.classList.toggle('show'); 
})
