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
    let articles = document.getElementById("articles");

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
            getArticles();
        };
        reader.onload = function (e) {
            body.name = addName.value;
            body.image = e.target.result;
            body.description = addDesc.value;
            body.position = document.getElementsByClassName('delete').length;
            xhr.open("POST", "/articles", true);
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

    function getArticles(e) {
        let articles = document.getElementById("articles")
        let articlesHtml = "";
        let articlesJSON;
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            articlesJSON = (JSON.parse(xhr.responseText));
            for (let i = 0; i < articlesJSON.length; i++) {
                articlesHtml += "<div id='article" + articlesJSON[i].id + "' class='article'>";
                articlesHtml += "<img src='" + articlesJSON[i].image + "' class='articleImage' />";
                articlesHtml += "<div class='articleName'>" + articlesJSON[i].name + "</div>";
                articlesHtml += "<img class='dividerImage' src='../resources/divider.png' />";
                articlesHtml += "<div class='articleDesc'>" + articlesJSON[i].description + "</div>";
                articlesHtml += "<button id='article" + articlesJSON[i].id + "' class='delete'>Delete</button>";
                articlesHtml += "</div>";
            }
            articles.innerHTML = articlesHtml;
            let deleteButtons = document.getElementsByClassName('delete');
            for (let i = 0; i < deleteButtons.length; i++) {
                deleteButtons[i].addEventListener("click", deleteAbout);
            }
            addListeners();
        };
        xhr.open("GET", "/articles");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    }

    function deleteAbout(e) {
        let id = e.target.getAttribute("id").slice(7);
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            getArticles();
        }
        xhr.open("DELETE", "/articles/" + id);
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
                let articleContainer = document.getElementById("articles");
                let articles = document.getElementsByClassName("article");
                let firstAbout = articles[0];
                left = firstAbout.getBoundingClientRect().left;
                topp = firstAbout.getBoundingClientRect().top;
                firstX = e.clientX;
                firstY = e.clientY;
                let firstXPos = Math.floor((firstX - left) / 265);
                let firstYPos = Math.floor((firstY - topp) / 315);
                lastXPos = Math.floor((firstX - left) / 265);
                lastYPos = Math.floor((firstY - topp) / 315);
                position = lastYPos * 3 + lastXPos;
                first = firstYPos * 3 + firstXPos;
                articleContainer.addEventListener("mousemove", moved);
                e.preventDefault();
            }
        }

        function moved(e) {
            lastX = e.clientX;
            lastY = e.clientY;
            let articleContainer = document.getElementById("articles");
            let articles = document.getElementsByClassName("article");
            if (e.buttons == 0) {
                articleContainer.removeEventListener("mousemove", moved);
                let firstOrder;
                let secondOrder;
                lastXPos = Math.floor((lastX - left) / 265);
                lastYPos = Math.floor((lastY - topp) / 315);
                position = lastYPos * 3 + lastXPos;
                if (position >= articles.length) {
                    return false;
                }
                let firstId = articles[first].getAttribute("id");
                let secondId = articles[position].getAttribute("id");
                let firstObj = {};
                firstObj.position = position;
                let secondObj = {};
                secondObj.position = first;
                let xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    let xhr2 = new XMLHttpRequest();
                    xhr2.onload = getArticles;
                    xhr2.open("PATCH", "/articles/" + secondId.slice(7));
                    xhr2.setRequestHeader("Content-Type", "application/json");
                    xhr2.send(JSON.stringify(secondObj));
                }
                xhr.open("PATCH", "/articles/" + firstId.slice(7));
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
        let allArticles = document.getElementsByClassName("article");
        for (let i = 0; i < allArticles.length; i++) {
            allArticles[i].addEventListener("mousedown", click);
        }
    }

    getArticles();
}());