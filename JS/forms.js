/* Event Listeners */

document.getElementById("connexion_form").addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(document.getElementById("connexion_form"));

    let username = formData.get("id");
    let password = formData.get("password");

    let result = logInUser(username, password);

    let errMsg = document.getElementsByClassName("error_message").item(0)

    if(result === 404){
        errMsg.textContent = "Aucun compte n'est enregistré avec ce mail !";
        errMsg.classList.remove("hidden");
    }else if(result === 403){
        errMsg.textContent = "Le mot de passe ou le mail est incorrect !";
        errMsg.classList.remove("hidden");

    }else if(result === 400){
        errMsg.textContent = "Un problème a eu lieu avec votre connexion !";
        errMsg.classList.remove("hidden");
    }else if(result === 200){
        errMsg.textContent = "";
        errMsg.classList.add("hidden");
    }
});

