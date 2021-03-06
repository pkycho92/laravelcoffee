<head>
    <link href="index.css" type="text/css" rel="stylesheet" />
    <link href="adminIndex.css" type="text/css" rel="stylesheet" />
</head>

<body>
    <div id="page">
        <div id="bar"></div>
        <header>
            <h1><img id="logo" src="resources/logo.png" width="300" height="75" /></h1>
            <div id="navbar">
                <img id="settings" src="resources/settings.png" width="15" height="15" />
                <br />
                <hr />
                <div id="dropMenu">
                    <ul>
                        <li id="homeLink">Home</li><br />
                        <li id="menuLink">Menu</li><br />
                        <li id="aboutLink">About Us</li><br />
                        <li id="logoutLink">Logout</li><br />
                    </ul>
                </div>
            </div>
        </header>
        <section id="main">
            <div id="container">
                <div id="preview">
                    <img id="previewImage" />
                    <div id="previewName"></div>
                    <img class="dividerImage" src="resources/divider.png" />
                    <div id="previewDesc">
                    </div>
                </div>
                <div id="addContainer">
                    <form id="addForm">
                        <div id="formDiv">
                            <span id="validateName" class="error"></span>
                            <label for="addName" class="title">Name</label>
                            <input class="input" type="text" id="addName" name="addName" />
                            <br />
                            <span id="validateImage" class="error"></span>
                            <label for="addImage" class="title">Image</label>
                            <input class="input" type="file" id="addImage" name="addImage" />
                            <br />
                            <span id="validateDesc" class="error"></span>
                            <label for="addDesc" class="title">Description</label>
                            <textarea class="input" id="addDesc" name="addDesc"></textarea>
                            <br />
                            <button id="submit" name="submit" type="submit" class="submit">submit</button>
                        </div>
                    </form>
                </div>
                <hr />
                <div id="articlesContainer">
                    <div id="articles">
                    </div>
                </div>
            </div>
        </section>
    </div>
</body>
<script src="addArticle.js"></script>
<script src="admin.js"></script>