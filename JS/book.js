function bookTicketsArray(schedulesList,mail,firstname,surname,number,street,city,postcode,id){
    if(id === undefined){
        return new Promise((resolve,reject) => {
            fetch('http://nathanael-spriet.fr:1111/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    info:{
                        address:{
                            number: parseInt(number),
                            street: street,
                            city: city,
                            postcode: parseInt(postcode)
                        },
                        surname: surname,
                        firstname: firstname,
                        mail:mail
                    },
                    schedules:schedulesList
                })
            }).then(response =>{
                if (response.ok) {
                    return response.json()
                } else {
                    throw response
                }
            }).then(tickets => {
                console.log(tickets)
                resolve();
            }).catch(error => {
                error.text().then(errorMessage => {
                    console.log('Request failed : ' + errorMessage);
                    reject();
                });
            });     
        });
    } else{
        return new Promise((resolve,reject) => {
            fetch('http://nathanael-spriet.fr:1111/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    info:{
                        address:{
                            number: parseInt(number),
                            street: street,
                            city: city,
                            postcode: parseInt(postcode)
                        },
                        surname: surname,
                        firstname: firstname,
                        mail:mail,
                        user:parseInt(id)
                    },
                    schedules:schedulesList
                })
            }).then(response =>{
                if (response.ok) {
                    return response.json()
                } else {
                    throw response
                }
            }).then(tickets => {
                console.log(tickets)
                resolve();
            }).catch(error => {
                error.text().then(errorMessage => {
                    console.log('Request failed : ' + errorMessage);
                    reject();
                });
            });     
        });
    }
   
           
}





let kart = userStorage.getItem("kart");

window.addEventListener("load", () => {

    kart = JSON.parse(userStorage.getItem("kart"));
    if(kart .length != 0){

        let id = userStorage.getItem("id");
        if (id){
            document.getElementById("book_mail").value = userStorage.getItem("mail");
            document.getElementById("book_firstname").value =userStorage.getItem("firstname");
            document.getElementById("book_surname").value =userStorage.getItem("surname");
    
    
            document.getElementById("book_number").value = userStorage.getItem("street_number");
            document.getElementById("book_street").value = userStorage.getItem("street");;
            document.getElementById("book_city").value = userStorage.getItem("city");
            document.getElementById("book_postcode").value = userStorage.getItem("postcode");
        }
    
    }


});

let bookButton = document.getElementById("book_button");
bookButton.addEventListener("click", (e) => {
    e.preventDefault();
    kart = userStorage.getItem("kart");
    if(kart){
        let kartArray = JSON.parse(kart);

        let mail = document.getElementById("book_mail").value;
        let firstname = document.getElementById("book_firstname").value;
        let surname = document.getElementById("book_surname").value;
        let numberStreet = parseInt(document.getElementById("book_number").value);
        let street = document.getElementById("book_street").value;
        let city = document.getElementById("book_city").value;
        let postcode = parseInt(document.getElementById("book_postcode").value);

        if(mail !== "" && firstname !=="" && surname != "",numberStreet !=="" && street !=="" && city !=="" && postcode !=""){
            if(isLogged()){
                let id = userStorage.getItem("id");
                console.log(kartArray);
                bookTicketsArray(kartArray,mail,firstname,surname,numberStreet,street,city,postcode,id).then(() => {
                    kartArray = [];
                    userStorage.setItem("kart",JSON.stringify(kartArray));
                    alert("Vous avez acheté vos tickets ! ")
                    location.reload();
                })
            } else{
                bookTicketsArray(kartArray,mail,firstname,surname,numberStreet,street,city,postcode).then(() => {
                    kartArray = [];
                    userStorage.setItem("kart",JSON.stringify(kartArray));
                    alert("Vous avez acheté vos tickets ! ")
                    window.location.href = "../HTML/kart_page.html"
                })
            }

        }
    }
});
