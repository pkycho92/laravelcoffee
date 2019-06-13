    //Settings Menu
    let main = document.getElementById("main");
    let settings = document.getElementById("settings");
    let dropMenu = document.getElementById("dropMenu");
    let homeLink = document.getElementById("homeLink");
    let aboutLink = document.getElementById("aboutLink");
    let menuLink = document.getElementById("menuLink");
    let logo = document.getElementById("logo");
    let logout = document.getElementById("logoutLink")

    logout.addEventListener("click", (e) => {
        window.location.href = '../logout';
    })
    settings.addEventListener("click", (e) => {
        dropMenu.classList.toggle("show");
    });

    function change(html, script) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            main.innerHTML = xhr.responseText

            let xhr2 = new XMLHttpRequest();
            xhr2.onload = function () {
                let scriptFile = xhr2.responseText;
                eval(scriptFile);
            }
            xhr2.open("GET", script, true);
            xhr2.send();
        }
        xhr.open("GET", html, true);
        xhr.send();
    }

    homeLink.addEventListener("click", () => change("addArticle.html", "addArticle.js"));
    aboutLink.addEventListener("click", () => change("addAbout.html", "addAbout.js"));
    menuLink.addEventListener("click", () => change("addMenuItem.html", "addMenuItem.js"));
    logo.addEventListener("click", () => change("addArticle.html", "addArticle.js"));
    
    