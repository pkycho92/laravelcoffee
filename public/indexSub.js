(function () {
    let container = document.getElementById("container");
    let currentArticle = document.createElement("div");
    container.innerHTML = "";
    container.appendChild(currentArticle);
    let articles = document.createElement('div');
    articles.setAttribute("id", "articles");
    let firstArticle = "";
    let articlesHtml = "";
    let buttonsHtml = "";
    let articlesJSON;
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("divider");
    let currentPos = 0;
    let timeout = null;

    function loadFirst() {
        firstArticle += "<div id='article" + articlesJSON[0].id + "' class='article' data-position='article" + articlesJSON[0].position + "'>";
        firstArticle += "<img id='articleUsImage' src='" + articlesJSON[0].image + "' class='storeImage' />";
        firstArticle += "<div class='articleHead'>" + articlesJSON[0].name + "</div>";
        firstArticle += "<img class='dividerImage' src='resources/divider.png' />";
        firstArticle += "<div class='articleBody'>" + articlesJSON[0].description + "</div>";
        firstArticle += "</div>";
        currentArticle.innerHTML = firstArticle;
    }

    function loadArticles() {
        for (let i = 0; i < articlesJSON.length; i++) {
            articlesHtml += "<div id='article" + articlesJSON[i].id + "' class='article hidden' data-position='article" + articlesJSON[i].position + "'>";
            articlesHtml += "<img src='" + articlesJSON[i].image + "' class='storeImage' />";
            articlesHtml += "<div class='articleHead'>" + articlesJSON[i].name + "</div>";
            articlesHtml += "<img class='dividerImage' src='resources/divider.png' />";
            articlesHtml += "<div class='articleBody'>" + articlesJSON[i].description + "</div>";
            articlesHtml += "</div>";
        }
        articles.innerHTML = articlesHtml;
    }

    function loadButtons() {
        for (let i = 0; i < articlesJSON.length; i++) {
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
        let articleDiv = image.parentNode;
        currentPos = articleDiv.dataset.position.slice(7);
        let nextPos = Number(currentPos) + 1;

        if (nextPos == articles.childNodes.length) {
            nextPos = 0;
        }
        newCurrent += "<div id='article" + articlesJSON[nextPos].id + "' class='article' data-position='article" + articlesJSON[nextPos].position + "'>";
        newCurrent += "<img id='articleUsImage' src='" + articlesJSON[nextPos].image + "' class='storeImage' />";
        newCurrent += "<div class='articleHead'>" + articlesJSON[nextPos].name + "</div>";
        newCurrent += "<img class='dividerImage' src='resources/divider.png' />";
        newCurrent += "<div class='articleBody'>" + articlesJSON[nextPos].description + "</div>";
        newCurrent += "</div>";
        currentArticle.innerHTML = newCurrent;

        buttonContainer.getElementsByClassName("activeButton")[0].classList.remove("activeButton");
        buttonContainer.childNodes[nextPos].classList.add("activeButton");
        currentArticle.getElementsByClassName("storeImage")[0].addEventListener("click", getNext);
        timeout = setTimeout(function () {
            getNext(null, articles.childNodes[nextPos].getElementsByClassName("storeImage")[0]);
        }, 10000);
    }

    (function () {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            articlesJSON = (JSON.parse(xhr.responseText));
            loadFirst();
            document.getElementById("articleUsImage").addEventListener("click", getNext);
            loadArticles();
            loadButtons();
            articles.childNodes.forEach((el) => {
                el.getElementsByClassName("storeImage")[0].addEventListener("click", getNext);
            });
            timeout = setTimeout(function () {
                getNext(null, articles.childNodes[0].getElementsByClassName("storeImage")[0]);
            }, 10000);
        };
        xhr.open("GET", "/articles");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    }());
}());