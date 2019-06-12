(function () {
    let previewName = document.getElementById("previewName");
    let previewImage = document.getElementById("previewImage");
    let previewDesc = document.getElementById("previewDesc");
    let addName = document.getElementById("addName");
    let addImage = document.getElementById("addImage");
    let addDesc = document.getElementById("addDesc");
    let nameError = document.getElementById("validateName");
    let imageError = document.getElementById("validateImage");
    let descError = document.getElementById("validateDesc");
    let submit = document.getElementById("addForm");
    let abouts = document.getElementById("abouts");

    addName.addEventListener("input", (e) => {
        nameError.textContent = "";
        previewName.textContent = addName.value;
    });

    addImage.addEventListener("change", (e) => {
        imageError.textContent = "";
        let reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(addImage.files[0]);
    });

    addDesc.addEventListener("input", (e) => {
        descError.textContent = "";
        previewDesc.textContent = addDesc.value;
    });

    submit.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validate()) {
            return;
        }
        let body = {};
        let reader = new FileReader();
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            getAbouts();
        };
        reader.onload = function (e) {
            body.name = addName.value;
            body.image = e.target.result;
            body.description = addDesc.value;
            body.position = document.getElementsByClassName('delete').length;
            xhr.open("POST", "/abouts", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(body));
        };
        reader.readAsDataURL(addImage.files[0]);
    });

    function validate() {
        let fail = false;
        if (addName.value == 0) {
            nameError.textContent = "Name must be greater than 0";
            fail = true;
        }
        if (addImage.files.length == 0) {
            imageError.textContent = "Must choose an image";
            fail = true;
        }
        if (addDesc.value == 0) {
            descError.textContent = "Desc must be greater than 0";
            fail = true;
        }
        return fail;

    }

    function getAbouts(e) {
        let abouts = document.getElementById("abouts")
        let aboutsHtml = "";
        let aboutsJSON;
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            aboutsJSON = (JSON.parse(xhr.responseText));
            for (let i = 0; i < aboutsJSON.length; i++) {
                aboutsHtml += "<div id='about" + aboutsJSON[i].id + "' class='about'>";
                aboutsHtml += "<img src='" + aboutsJSON[i].image + "' class='aboutImage' />";
                aboutsHtml += "<div class='aboutName'>" + aboutsJSON[i].name + "</div>";
                aboutsHtml += "<img class='dividerImage' src='../resources/divider.png' />";
                aboutsHtml += "<div class='aboutDesc'>" + aboutsJSON[i].description + "</div>";
                aboutsHtml += "<button id='about" + aboutsJSON[i].id + "' class='delete'>Delete</button>";
                aboutsHtml += "</div>";
            }
            abouts.innerHTML = aboutsHtml;
            let deleteButtons = document.getElementsByClassName('delete');
            for (let i = 0; i < deleteButtons.length; i++) {
                deleteButtons[i].addEventListener("click", deleteAbout);
            }
            addListeners();
        };
        xhr.open("GET", "/abouts");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    }

    function deleteAbout(e) {
        let id = e.target.getAttribute("id").slice(5);
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            getAbouts();
        }
        xhr.open("DELETE", "/abouts/" + id);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    }

    let exp = (function () {
        let exp = {};
        let first;
        let topp;
        let left;
        let lastXPos;
        let lastYPos;
        let position;
        let lastX;
        let lastY;

        function click(e) {
            if (e.button == 0) {
                let aboutContainer = document.getElementById("abouts");
                let abouts = document.getElementsByClassName("about");
                let firstAbout = abouts[0];
                left = firstAbout.getBoundingClientRect().left;
                topp = firstAbout.getBoundingClientRect().top;
                firstX = e.clientX;
                firstY = e.clientY;
                let firstXPos = Math.floor((firstX - left) / 270);
                let firstYPos = Math.floor((firstY - topp) / 315);
                lastXPos = Math.floor((firstX - left) / 270);
                lastYPos = Math.floor((firstY - topp) / 315);
                position = lastYPos * 3 + lastXPos;
                first = firstYPos * 3 + firstXPos;
                aboutContainer.addEventListener("mousemove", moved);
                e.preventDefault();
            }
        }

        function moved(e) {
            lastX = e.clientX;
            lastY = e.clientY;
            let aboutContainer = document.getElementById("abouts");
            let abouts = document.getElementsByClassName("about");
            if (e.buttons == 0) {
                aboutContainer.removeEventListener("mousemove", moved);
                let firstOrder;
                let secondOrder;
                lastXPos = Math.floor((lastX - left) / 270);
                lastYPos = Math.floor((lastY - topp) / 315);
                position = lastYPos * 3 + lastXPos;
                if (position >= abouts.length) {
                    return false;
                }
                let firstId = abouts[first].getAttribute("id");
                let secondId = abouts[position].getAttribute("id");
                let firstObj = {};
                firstObj.position = position;
                let secondObj = {};
                secondObj.position = first;
                let xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    let xhr2 = new XMLHttpRequest();
                    xhr2.onload = getAbouts;
                    xhr2.open("PATCH", "/abouts/" + secondId.slice(5));
                    xhr2.setRequestHeader("Content-Type", "application/json");
                    xhr2.send(JSON.stringify(secondObj));
                }
                xhr.open("PATCH", "/abouts/" + firstId.slice(5));
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(firstObj));
            }
        }
        exp.click = click;
        exp.moved = moved;
        return exp;
    }());

    let click = exp.click;
    let moved = exp.moved;

    function addListeners() {
        let allAbouts = document.getElementsByClassName("about");
        for (let i = 0; i < allAbouts.length; i++) {
            allAbouts[i].addEventListener("mousedown", click);
        }
    }

    getAbouts();
}());