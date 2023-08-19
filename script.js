// Getting the HOME page heading and button elements
let homePageIPHeading = document.querySelector(".right-heading span");
let getStartedBtn = document.querySelector(".get-started")

// finding the User's IP Address
$.getJSON("https://api.ipify.org?format=json", function (data) {
    printIPHomePage(data.ip);
})

// Manupalating the IP Adress Heading of Home Page
function printIPHomePage(ip) {
    homePageIPHeading.innerHTML = `${ip}`;
    localStorage.setItem("ipAddress", ip)
}

// Adding functionality to Get Started
// And changing the url location
getStartedBtn.addEventListener("click", () => {
    let url = "details.html"
    window.location.href = url;
})