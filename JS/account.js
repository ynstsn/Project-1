function displayUserInformations(){

    if(!isLogged()) {
        console.log("Can't display info !");
        console.log("User is not connected !");
        return;
    }

    getUserInformation(userStorage.getItem('id'))
    .then((userInfo) => {
        let surname = document.querySelector('#last_name_container p');
        surname.textContent = userInfo.surname;

        let firstName = document.querySelector('#first_name_container p');
        firstName.textContent = userInfo.firstname;

        let adresse = document.querySelector('#adresse_container p');
        adresse.textContent = userInfo.address.number + ' ' + userInfo.address.street + ' ' + userInfo.address.postcode + ' ' + userInfo.address.city;

        let mail = document.querySelector('#email_container p');
        mail.textContent = userInfo.mail;

  });
    
}

let liInformations = document.querySelector("#personal_information_li");
liInformations.addEventListener("click", (e) => {
    e.preventDefault();
    let liSelected = document.querySelector(".section_selected");
    liSelected.classList.remove("section_selected");
    liInformations.classList.add("section_selected");
    
    
    let allSection = [document.getElementById("ongoing_tickets_container"),document.getElementById("purchase_history_container"),document.getElementById("settings_container")]
    allSection.forEach((element) =>{
        element.classList.add("hidden");
    });
    
    let sectionInformations = document.getElementById("personal_information_container");
    sectionInformations.classList.remove("hidden");

    displayUserInformations();
    
});

displayUserInformations();