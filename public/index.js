(function () {
    function initMap() {
        let roots = { lat: 30, lng: -100 };
        let map = new google.maps.Map(
            map, {
                zoom: 17,
                center: roots,
            }
        );
        let marker = new google.maps.Marker({ position: { lat: 34.272117, lng: -118.484339 }, map: map });
    }
    //Settings Menu
    let settings = document.getElementById("settings");
    let dropMenu = document.getElementById("dropMenu");
    let container = document.getElementById("container");
    let homeLink = document.getElementById("homeLink");
    let menuLink = document.getElementById("menuLink");
    let aboutLink = document.getElementById("aboutLink");
    let contactLink = document.getElementById("contactLink");
    let chatLink = document.getElementById("chatLink");
    let logo = document.getElementById("logo");

    settings.addEventListener("click", () => {
        dropMenu.classList.toggle("show");
    });

    function change(script) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            let text = xhr.responseText;
            eval(text);
        }
        xhr.open("GET", script, true);
        xhr.send();
    }

    homeLink.addEventListener("click", () => change("indexSub.js"));
    menuLink.addEventListener("click", () => change("menuItemSub.js"));
    aboutLink.addEventListener("click", () => change("aboutUsSub.js"));
    contactLink.addEventListener("click", () => change("contactUsSub.js"));
    chatLink.addEventListener("click", () => change("chatSub.js"));
    logo.addEventListener("click", () => change("indexSub.js"));

    
    change("indexSub.js");
    
}());