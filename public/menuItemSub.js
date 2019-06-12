(function () {
    let container = document.getElementById("container");
    container.innerHTML = "<div class='articleHead'>Menu</div><div id='menuItemType'></div><divclass='arrows'><img id='left' src='resources/left.png' />&nbsp&nbsp&nbsp<img id = 'right' src = 'resources/right.png' /></div><div id='menuItems'></div>";
    let menuItemType = document.getElementById("menuItemType");
    let menuItems = document.getElementById("menuItems");
    let menuItemsHtml = "";
    let menuItemsJSON;
    let menuItemsType = ["Drink", "Dessert", "Sandwich"];
    let currentType = menuItemsType[0];
    menuItemType.textContent = currentType
    let rightArrow = document.getElementById("right");
    let leftArrow = document.getElementById("left");

    rightArrow.addEventListener("click", (e) => {
        let pos = menuItemsType.indexOf(menuItemType.textContent);
        if (pos == 2) {
            pos = 0;
        } else {
            pos += 1;
        }
        currentType = menuItemsType[pos];
        menuItemType.textContent = currentType;
        getMenuItems();
    })

    leftArrow.addEventListener("click", (e) => {
        let pos = menuItemsType.indexOf(menuItemType.textContent);
        if (pos == 0) {
            pos = 2;
        } else {
            pos -= 1;
        }
        currentType = menuItemsType[pos];
        menuItemType.textContent = currentType;
        getMenuItems();
    })

    function loadMenuItems() {
        menuItemsHtml = "";
        for (let i = 0; i < menuItemsJSON.length; i++) {
            menuItemsHtml += "<div id='menuItem" + menuItemsJSON[i].id + "' class='menuItem' data-position='menuItem" + menuItemsJSON[i].position + "'>";
            menuItemsHtml += "<div class='menuItemName'>" + menuItemsJSON[i].name + "</div>";
            menuItemsHtml += "<img src='" + menuItemsJSON[i].image + "' class='menuItemImage' /><br />";
            menuItemsHtml += "<img class='dividerImage' src='resources/divider.png' />";
            menuItemsHtml += "<div class='menuItemDesc'>" + menuItemsJSON[i].description + "</div>";
            menuItemsHtml += "</div>";
        }
        menuItems.innerHTML = menuItemsHtml;
    }

    function getMenuItems() {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            menuItemsJSON = (JSON.parse(xhr.responseText));
            loadMenuItems();
        }
        xhr.open("GET", "/menuItems/types/" + currentType.toUpperCase());
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    }

    getMenuItems();
}());