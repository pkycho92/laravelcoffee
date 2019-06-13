<head>
    <link href="{{'index.css'}}" type="text/css" rel="stylesheet" />
</head>

<body>
    <div id="page">
        <div id="bar"></div>
        <header>
            <h1><img id="logo" src="resources/logo.png" width="300" height="75" /></h1>
        </header>
        <section id="main">
            <div id="container">
                <div id="loginDiv">
                    <form name="login" id="login" action="/admin" method="POST">
                        @csrf
                        <div id="formDiv">
                            <label for="addUsername" class="title">Usesrname</label>
                            <span id="validateUsername" class="error"></span>
                            <input class="input" type="text" id="addUsername" name="username" />
                            <br />
                            <label for="addPassword" class="title">Password</label>
                            <span id="validatePassword" class="error"></span>
                            <input class="input" type="text" id="addPassword" name="password" />
                            <br />
                            <button id="submit" name="submit" type="submit" class="submit">submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</body>
