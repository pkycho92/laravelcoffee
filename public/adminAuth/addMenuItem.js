(function () {
    let previewName = document.getElementById("previewName");
    let previewType = document.getElementById("previewType");
    let previewImage = document.getElementById("previewImageMI");
    let previewDesc = document.getElementById("previewDesc");
    let addName = document.getElementById("addName");
    let addType = document.getElementById("addType");
    let addImage = document.getElementById("addImage");
    let addDesc = document.getElementById("addDesc");
    let nameError = document.getElementById("validateName");
    let typeError = document.getElementById("validateType");
    let imageError = document.getElementById("validateImage");
    let descError = document.getElementById("validateDesc");
    let submit = document.getElementById("addForm");
    let menuItems = document.getElementById("menuItems");
    let menuItemType = document.getElementById("menuItemType");
    let menuItemsType = ["Drink", "Dessert", "Sandwich"];
    menuItemType.textContent = menuItemsType[0];
    let rightArrow = document.getElementById("right");
    let leftArrow = document.getElementById("left");

    rightArrow.addEventListener("click", (e) => {
        let pos = menuItemsType.indexOf(menuItemType.textContent);
        if (pos == 2) {
            pos = 0;
        } else {
            pos += 1;
        }
        menuItemType.textContent = menuItemsType[pos];
        getMenuItems();
    })

    leftArrow.addEventListener("click", (e) => {
        let pos = menuItemsType.indexOf(menuItemType.textContent);
        if (pos == 0) {
            pos = 2;
        } else {
            pos -= 1;
        }
        menuItemType.textContent = menuItemsType[pos];
        getMenuItems();
    })
    
    addName.addEventListener("input", (e) => {
        nameError.textContent = "";
        previewName.textContent = addName.value;
    });

    addType.addEventListener("change", (e) => {
        typeError.textContent = "";
        previewType.textContent = addType.value;
        menuItemType.textContent = addType.value;
        getMenuItems();
    })

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
            getMenuItems();
        };
        reader.onload = function (e) {
            body.name = addName.value;
            body.type = addType.value.toUpperCase();
            body.image = e.target.result;
            body.description = addDesc.value;
            body.position = document.getElementsByClassName('delete').length;
            xhr.open("POST", "/menuItems", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(body));
        };
        reader.readAsDataURL(addImage.files[0]);
    });

    function validate() {
        let fail = false;
        if (addType.value == "") {
            typeError.textContent = "Must choose a type";
            fail = true;
        }
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

    function getMenuItems(e) {
        let menuItems = document.getElementById("menuItems")
        let menuItemsHtml = "";
        let menuItemsJSON;
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            menuItemsJSON = (JSON.parse(xhr.responseText));
            for (let i = 0; i < menuItemsJSON.length; i++) {
                menuItemsHtml += "<div id='menuItem" + menuItemsJSON[i].id + "' class='menuItem'>";
                menuItemsHtml += "<img src='" + menuItemsJSON[i].image + "' class='menuItemImage' />";
                menuItemsHtml += "<div class='menuItemName'>" + menuItemsJSON[i].name + "</div>";
                menuItemsHtml += "<img class='dividerImage' src='../resources/divider.png' />";
                menuItemsHtml += "<div class='menuItemDesc'>" + menuItemsJSON[i].description + "</div>";
                menuItemsHtml += "<button id='menuItem" + menuItemsJSON[i].id + "' class='delete'>Delete</button>";
                menuItemsHtml += "</div>";
            }
            menuItems.innerHTML = menuItemsHtml;
            let deleteButtons = document.getElementsByClassName('delete');
            for (let i = 0; i < deleteButtons.length; i++) {
                deleteButtons[i].addEventListener("click", deleteMenuItem);
            }
            addListeners();
        };
        xhr.open("GET", "/menuItems/types/" + menuItemType.textContent.toUpperCase());
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    }

    function deleteMenuItem(e) {
        let id = e.target.getAttribute("id").slice(8);
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            getMenuItems();
        }
        xhr.open("DELETE", "/menuItems/" + id);
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
                let menuItemContainer = document.getElementById("menuItems");
                let menuItems = document.getElementsByClassName("menuItem");
                let firstMenuItem = menuItems[0];
                left = firstMenuItem.getBoundingClientRect().left;
                topp = firstMenuItem.getBoundingClientRect().top;
                firstX = e.clientX;
                firstY = e.clientY;
                let firstXPos = Math.floor((firstX - left) / 190);
                let firstYPos = Math.floor((firstY - topp) / 315);
                lastXPos = Math.floor((firstX - left) / 190);
                lastYPos = Math.floor((firstY - topp) / 315);
                position = lastYPos * 4 + lastXPos;
                first = firstYPos * 4 + firstXPos;
                menuItemContainer.addEventListener("mousemove", moved);
                e.preventDefault();
            }
        }

        function moved(e) {
            lastX = e.clientX;
            lastY = e.clientY;
            let menuItemContainer = document.getElementById("menuItems");
            let menuItems = document.getElementsByClassName("menuItem");
            if (e.buttons == 0) {
                menuItemContainer.removeEventListener("mousemove", moved);
                let firstOrder;
                let secondOrder;
                lastXPos = Math.floor((lastX - left ) / 190);
                lastYPos = Math.floor((lastY - topp) / 315);
                position = lastYPos * 4 + lastXPos;
                if (position >= menuItems.length) {
                    return false;
                }
                let firstId = menuItems[first].getAttribute("id");
                let secondId = menuItems[position].getAttribute("id");
                let firstObj = {};
                firstObj.position = position;
                let secondObj = {};
                secondObj.position = first;
                let xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    let xhr2 = new XMLHttpRequest();
                    xhr2.onload = getMenuItems;
                    xhr2.open("PATCH", "/menuItems/" + secondId.slice(8));
                    xhr2.setRequestHeader("Content-Type", "application/json");
                    xhr2.send(JSON.stringify(secondObj));
                }
                xhr.open("PATCH", "/menuItems/" + firstId.slice(8));
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
        let allMenuItems = document.getElementsByClassName("menuItem");
        for (let i = 0; i < allMenuItems.length; i++) {
            allMenuItems[i].addEventListener("mousedown", click);
        }
    }

    getMenuItems();
}());