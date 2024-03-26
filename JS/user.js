const userStorage = sessionStorage;


function isLogged(){
    return userStorage.getItem('id') != null;
}

function getUserInformation(userId){

    return new Promise((resolve) => {
        fetch('http://nathanael-spriet.fr:1111/users/info/' + userId, {
            method: 'GET',
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw response;
                }
            })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                console.log("Request failed" + err);
                return null;
            });
    })
        .then((user) => {
            return JSON.parse(user);
        })
        .catch(() => {
            console.log("Erreur détectée !");
            return null;
        })


}

function initUser(userId){
    if(userStorage.getItem('id') === userId) return;
    getUserInformation(userId).then((userInfo) => {
        if(userInfo == null) {
            console.log("Erreur !");
            return;
        }

        userStorage.clear();

        userStorage.setItem('id', userId);
        userStorage.setItem('surname', userInfo.surname);
        userStorage.setItem('firstname', userInfo.firstname);
        userStorage.setItem('full_adress', userInfo.address);
        userStorage.setItem('street_number', userInfo.address.number);
        userStorage.setItem('street', userInfo.address.street);
        userStorage.setItem('postcode', userInfo.address.postcode);
        userStorage.setItem('city', userInfo.address.city);
        userStorage.setItem('mail', userInfo.mail);
        userStorage.setItem('JSONInfo', userInfo);

        window.location.href = "../index.html";
    });
}

function logInUser(mail, pwd){

    if(isLogged()) {
        console.log("User already connected !");
        return;
    }

    let resultCode = 200;

    if(mail !== pwd){
        return 403;
    }

    fetch('http://nathanael-spriet.fr:1111/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mail: mail,
            password: pwd
        })
    })
        .then((response) => {
            if(response.ok) return response.text();
            else resultCode = 400;
        })
        .then((userId) => {
            console.log("UserID = " + userId);
            if(userId === undefined) {
                resultCode = 400;
                return;
            }
            initUser(userId);
        })
        .catch((abort) => {
            resultCode = 404;
        })

    return resultCode;

}

function logOutUser(){
    if(!isLogged()) return;

    let resultCode = 200;

    fetch('http://nathanael-spriet.fr:1111/logout', {
       method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           id: userStorage.getItem('id')
        })
    })
        .then((response) => {
            if(!response.ok) resultCode = 400;
            else userStorage.clear();
        })

        .catch(() => {
            resultCode = 404;
        })

    return resultCode;
}


let isMenuShowed = false;

function showContextMenu(showing, forced){

    isMenuShowed = showing;

    if(isLogged() || forced){

        let connectedMenu = document.getElementById("choice_if_connected");

        if(connectedMenu == null) return;

        if(showing){
            connectedMenu.classList.remove("hidden");
        }else{
            connectedMenu.classList.add("hidden");
        }

    }else if(!isLogged() || forced){

        let disconnectedMenu = document.getElementById("choice_if_not_connected");

        if(disconnectedMenu == null) return;

        if(showing){
            disconnectedMenu.classList.remove("hidden");
        }else{
            disconnectedMenu.classList.add("hidden");
        }

    }
}


/* EVENTS */

//Menu contextuel header
for (let child of document.getElementById("account_container").children) {
    child.addEventListener("mouseenter", () => {
        showContextMenu(true, false);
    });
    child.addEventListener("mouseleave", () => {
        showContextMenu(false, false);
    });
}

//Bouton déco
document.getElementById("logout").addEventListener("click", (e) => {

    new Promise((resolve) => {
        logOutUser();
        //Wait for logout to take effect
        setTimeout(() => {
            resolve()
            }, 500);
    }).then(() => {
        showContextMenu(false, true);
        showRealName();
    })


});

document.getElementById("logout").style.cursor = "pointer";

function showRealName(){

    if(!isLogged()){
        document.getElementById("user_complete_name").textContent = " ";
    }else{
        document.getElementById("user_complete_name").textContent = userStorage.getItem('firstname') + " " + userStorage.getItem('surname');
    }
}

showRealName();
