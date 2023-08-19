// Function to clear the HTML
function clearHtml(ele) {
    ele.innerHTML = "";
}

// Getting the Ip Address from the Local storage 
// that we passed while on HOME page and removing it
let ipAddress = localStorage.getItem('ipAddress');
localStorage.removeItem("ipAddress");


// Function that gets data from Ip Adress
async function getIpInfo(ipAddress) {
    try {
        let url = `https://ipinfo.io/${ipAddress}?token=f0f149a8a42af3`
        let result = await fetch(url);
        let response = await result.json();
        // console.log(response);
        getPostOfficeInfo(response);
    }
    catch (error) {
        console.log(error);
    }
}

getIpInfo(ipAddress);


// Function that gets Post Office Info with PinCode
async function getPostOfficeInfo(details) {
    let pincode = details.postal;
    let url = `https://api.postalpincode.in/pincode/${pincode}`;
    let result = await fetch(url);
    let response = await result.json();
    createUi(details, response);
    createCards(response[0].PostOffice)
}

// Getting the Main Div and Body element to Append the HTML
let maindiv = document.querySelector(".main");
let body = document.getElementsByTagName("body")[0];


// Creating UI with CreateUi function
// It takes data coming from getPostOfficeInfo and getIpInfo
function createUi(details, pincodeinfo) {
    let locString = details.loc;
    let arr = locString.split(",");
    let dateAndTime = new Date().toLocaleString("en-US", { timeZone: `${details.timezone}` });
    let postOfficeArr = pincodeinfo[0].PostOffice;
    let containerInnerhtml = `<section class="location-details">
                                        <div class="location-details-top">
                                        IP Address: <span>${details.ip}</span>
                                        </div>
                                        <div class="location-details-bottom">
                                        <div class="two-div">
                                            <p class="latitude-div">Lat: <span>${arr[0]}</span></p>
                                            <p class="longitude-div">Long: <span>${arr[1]}</span></p>
                                        </div>
                                        <div class="two-div">
                                            <p class="city-div">City: <span>${details.city}</span></p>
                                            <p class="region-div">Region: <span>${details.region}</span></p>
                                        </div>
                                        <div class="two-div">
                                            <p class="organisation-div">
                                            Orgnations: <span>${(details.region)?.slice(0, 5)}</span>
                                            </p>
                                            <p class="hostname-div">Hostname: <span>${details.readme}</span></p>
                                        </div>
                                        </div>
                                    </section>
                                    <section class="location-map">
                                        <div class="location-map-heading">Your Current Location</div>
                                        <div class="location-map-area">
                                        <iframe
                                            src="https://maps.google.com/maps?q=${locString}&z=15&output=embed"
                                            frameborder="0"
                                            style="border: 0"
                                        ></iframe>
                                        </div>
                                    </section>
                                    <section class="more-info">
                                        <div class="more-info-heading">More Information About You</div>
                                        <div class="more-info-list">
                                        <div class="more-info-div time-zone">
                                            Time-Zone: <span>${details.timeZone}</span>
                                        </div>
                                        <div class="more-info-div Date-and-Time">
                                            Date and Time: <span>${dateAndTime}</span>
                                        </div>
                                        <div class="more-info-div Pincode">
                                            Pincode: <span>${details.postal}</span>
                                        </div>
                                        <div class="more-info-div message">
                                            Message: <span>${pincodeinfo[0].Message}</span>
                                        </div>
                                        </div>
                                    </section>
                                    <section class="post-office-grid">
                                        <div class="heading-post-office-grid">Post Offices Near You</div>
                                        <div class="search-input">
                                        <input type="text" placeholder="search by name" required class="cards-searchbar"/>
                                        <img src="./assets/Vector.svg" alt="search icon" class="icon-btn"/>
                                        </div>
                                        <div class="grid">
                                        </div>
                                    </section>`

    clearHtml(maindiv);
    let containerDiv = document.createElement("div");
    containerDiv.classList.add("container");
    containerDiv.innerHTML = containerInnerhtml;
    maindiv.appendChild(containerDiv);
    body.appendChild(maindiv)
}

// Function to create Grid of Cards
function createCards(postOfficeInfo) {
    let grid = document.querySelector(".grid");
    clearHtml(grid);
    postOfficeInfo.map((singlePostOffice) => {
        let singleCard = document.createElement("div");
        singleCard.classList.add("single-card")
        let singleCardHtml = `<div class="card-text name">Name: <span>${singlePostOffice.Name}</span></div>
        <div class="card-text branch-type">
        Branch Type: <span>${singlePostOffice.BranchType}</span>
        </div>
        <div class="card-text delivery-status">
        Delivery Status: <span>${singlePostOffice.DeliveryStatus}</span>
        </div>
        <div class="card-text district">
        District: <span>${singlePostOffice.District}</span>
        </div>
        <div class="card-text division">Division: <span>${singlePostOffice.Division}</span></div>`
        singleCard.innerHTML = singleCardHtml;
        grid.appendChild(singleCard);
    })

    enableSearchBar(postOfficeInfo);
}

// Function that handles Search Bar Functionality
function enableSearchBar(postOfficeArr) {
    let searIconBtn = document.querySelector(".icon-btn");

    searIconBtn.addEventListener("click", () => {
        let searBarInput = document.querySelector(".cards-searchbar").value;
        let filteredArr = postOfficeArr.filter((postOffice) => {
            let postOfficeName = postOffice.Name;
            console.log(postOfficeName)
            return postOfficeName.includes(searBarInput);
        })
        createCards(filteredArr);
    })
}






















// createUi(ipAddress)


/* <div class="single-card">
<div class="card-text name">Name: <span>Radhanagari</span></div>
<div class="card-text branch-type">
Branch Type: <span>Local</span>
</div>
<div class="card-text delivery-status">
Delivery Status: <span>Pending</span>
</div>
<div class="card-text district">
District: <span>Kolhapur</span>
</div>
<div class="card-text division">Division: <span>Pune</span></div>
</div>
<div class="single-card">
<div class="card-text name">Name: <span>Radhanagari</span></div>
<div class="card-text branch-type">
Branch Type: <span>Local</span>
</div>
<div class="card-text delivery-status">
Delivery Status: <span>Pending</span>
</div>
<div class="card-text district">
District: <span>Kolhapur</span>
</div>
<div class="card-text division">Division: <span>Pune</span></div>
</div>
<div class="single-card">
<div class="card-text name">Name: <span>Radhanagari</span></div>
<div class="card-text branch-type">
Branch Type: <span>Local</span>
</div>
<div class="card-text delivery-status">
Delivery Status: <span>Pending</span>
</div>
<div class="card-text district">
District: <span>Kolhapur</span>
</div>
<div class="card-text division">Division: <span>Pune</span></div>
</div>
<div class="single-card">
<div class="card-text name">Name: <span>Radhanagari</span></div>
<div class="card-text branch-type">
Branch Type: <span>Local</span>
</div>
<div class="card-text delivery-status">
Delivery Status: <span>Pending</span>
</div>
<div class="card-text district">
District: <span>Kolhapur</span>
</div>
<div class="card-text division">Division: <span>Pune</span></div>
</div> */