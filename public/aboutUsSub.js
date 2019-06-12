(function () {
    let container = document.getElementById("container");
    let currentAbout = document.createElement("div");
    container.innerHTML = "";
    container.appendChild(currentAbout);
    let abouts = document.createElement('div');
    abouts.setAttribute("id", "abouts");
    let firstAbout = "";
    let aboutsHtml = "";
    let buttonsHtml = "";
    let aboutsJSON;
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("divider");
    let currentPos = 0;
    let timeout = null;

    function loadFirst() {
        firstAbout += "<div id='about" + aboutsJSON[0].id + "' class='about' data-position='about" + aboutsJSON[0].position + "'>";
        firstAbout += "<img id='aboutUsImage' src='" + aboutsJSON[0].image + "' class='storeImage' />";
        firstAbout += "<div class='articleHead'>" + aboutsJSON[0].name + "</div>";
        firstAbout += "<img class='dividerImage' src='resources/divider.png' />";
        firstAbout += "<div class='articleBody'>" + aboutsJSON[0].description + "</div>";
        firstAbout += "</div>";
        currentAbout.innerHTML = firstAbout;
    }

    function loadAbouts() {
        for (let i = 0; i < aboutsJSON.length; i++) {
            aboutsHtml += "<div id='about" + aboutsJSON[i].id + "' class='about hidden' data-position='about" + aboutsJSON[i].position + "'>";
            aboutsHtml += "<img src='" + aboutsJSON[i].image + "' class='storeImage' />";
            aboutsHtml += "<div class='articleHead'>" + aboutsJSON[i].name + "</div>";
            aboutsHtml += "<img class='dividerImage' src='resources/divider.png' />";
            aboutsHtml += "<div class='articleBody'>" + aboutsJSON[i].description + "</div>";
            aboutsHtml += "</div>";
        }
        abouts.innerHTML = aboutsHtml;
    }

    function loadButtons() {
        for (let i = 0; i < aboutsJSON.length; i++) {
            buttonsHtml += "<span id='button" + i + "'>. </span>";
        }
        buttonContainer.innerHTML = buttonsHtml;
        buttonContainer.childNodes[0].classList.add('activeButton');
        container.appendChild(buttonContainer);
    }

    function getNext(e, target) {
        clearTimeout(timeout);
        let newCurrent = "";
        let image;
        if (e) {
            image = e.target;
        } else {
            image = target;
        }
        let aboutDiv = image.parentNode;
        currentPos = aboutDiv.dataset.position.slice(5);
        let nextPos = Number(currentPos) + 1;
        if (nextPos == abouts.childNodes.length) {
            nextPos = 0;
        }
        newCurrent += "<div id='about" + aboutsJSON[nextPos].id + "' class='about' data-position='about" + aboutsJSON[nextPos].position + "'>";
        newCurrent += "<img id='aboutUsImage' src='" + aboutsJSON[nextPos].image + "' class='storeImage' />";
        newCurrent += "<div class='articleHead'>" + aboutsJSON[nextPos].name + "</div>";
        newCurrent += "<img class='dividerImage' src='resources/divider.png' />";
        newCurrent += "<div class='articleBody'>" + aboutsJSON[nextPos].description + "</div>";
        newCurrent += "</div>";
        currentAbout.innerHTML = newCurrent;

        buttonContainer.getElementsByClassName("activeButton")[0].classList.remove("activeButton");
        buttonContainer.childNodes[nextPos].classList.add("activeButton");
        currentAbout.getElementsByClassName("storeImage")[0].addEventListener("click", getNext);
        timeout = setTimeout(function () {
            getNext(null, abouts.childNodes[nextPos].getElementsByClassName("storeImage")[0]);
        }, 10000);
    }

    (function () {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            aboutsJSON = (JSON.parse(xhr.responseText));
            loadFirst();
            document.getElementById("aboutUsImage").addEventListener("click", getNext);
            loadAbouts();
            loadButtons();
            abouts.childNodes.forEach((el) => {
                el.getElementsByClassName("storeImage")[0].addEventListener("click", getNext);
            });
            timeout = setTimeout(function () {
                getNext(null, abouts.childNodes[0].getElementsByClassName("storeImage")[0]);
            }, 10000);
        };
        xhr.open("GET", "/abouts");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    }());
}());