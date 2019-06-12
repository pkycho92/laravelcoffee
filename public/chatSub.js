(function () {
    let container = document.getElementById("container");
    container.innerHTML = "";
    let chatContainer = document.createElement("div");
    let chatDiv = document.createElement("div");
    chatDiv.setAttribute("id", "chatDiv");
    let chatDivHtml = "<div id='chatForm action=''><table id='chatTable'>";
    chatDivHtml += "<tr><td id='chatArea' class='chatName'>Chat Log<br/><textarea id='chatLog' readonly='true'></textarea></td><td id='chatUsers' class='chatName'>Users<br/><textarea id='users' readonly='true'></textarea></td></tr></table>";
    chatDivHtml += "<div id='chatInput'><input id='textField' name='name' type='text'/><input id='join' value='join' type='button'/><br />";
    chatDivHtml += "<input id='send' value='send' type='button'/><p/><div id='error'></div></div></div>";
    chatDiv.innerHTML = chatDivHtml;
    chatContainer.appendChild(chatDiv);
    container.appendChild(chatContainer);
    let chatForm = document.getElementById("chatForm");
    let chatArea = document.getElementById("chatArea");
    let chatLog = document.getElementById("chatLog");
    let users = document.getElementById("users");
    let textField = document.getElementById("textField");
    let join = document.getElementById("join");
    let send = document.getElementById("send");
    let error = document.getElementById("error");
    let isJoined = false;
    let username;

    join.addEventListener("click", (e) => {
        if(textField.value == "") {
            error.textContent = "Username must be greater than 0";
            return false;
        }
        error.textContent = "";
        joined();
        isJoined = true;
    })

    send.addEventListener("click", (e) => {
        sendMessage();
    });

    textField.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            sendMessage();
            textField.value = "";
        }
    })

    let wsUri = "ws://34.205.184.226/chat"
    let websocket = new WebSocket(wsUri);



    websocket.onmessage = function (e) {
        onMessage(e);
    };

    function joined() {
        username = textField.value;
        websocket.send(username + " joined");
    }

    function sendMessage() {
        if (isJoined) {
            websocket.send(username + ": " + textField.value);
        } else {
            error.textContent = "Must join first";
        }
    }

    function onMessage(e) {
        if (e.data.indexOf("joined") !== -1) {
            users.innerHTML += e.data.substring(0, e.data.indexOf(" joined")) + "\n";
        } else {
            chatLog.innerHTML += e.data + "\n";
        }
    }
}());