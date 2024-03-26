

let sumPrice = 0;


function getSchedule(scheduleId){
    return new Promise((resolve, reject) => {
        fetch('http://nathanael-spriet.fr:1111/schedules/info/'+scheduleId).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response
        }
        }).then(schedules => {
            
            resolve(schedules);
        }).catch(error => {
            console.log(error);
            error.text().then(errorMessage => {
            console.log('Request failed : ' + errorMessage);
            reject(error);
            });
        });
    });
}


function convertDate(foramteDate){
    let splitDate = foramteDate.split('-');

    return splitDate[2]+"/"+splitDate[1]+"/"+splitDate[0];
}


function addMinutesToTime(time,minutes){
    let [hours,minTime] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + minTime + minutes;
    let newHours = Math.floor(totalMinutes/60);
    let newMinutes = totalMinutes % 60;

    if (newHours < 10){
        newHours = '0' + newHours;
    }
    if (newMinutes < 10){
        newMinutes = '0' + newMinutes;
    }

    return newHours+":"+newMinutes;
}


function removeDuplicatesAndCount(array, value) {
    let quantity = 0;
    const newArray = [];
  
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        if (quantity === 0) {
          newArray.push(array[i]);
        }
        quantity++;
      } else {
        newArray.push(array[i]);
      }
    }
  
    array.length = 0; // Efface le contenu du tableau original
  
    for (let i = 0; i < newArray.length; i++) {
      array.push(newArray[i]);
    }
  
    return quantity;
  }


function createTicket(ticketId,cityStartName, cityEndName, startStation, endStation,date,startTime,endTime,tarif,quantity){
    if(quantity === undefined){
        quantity = 1;
    }

    let parent = document.getElementById('tickets_container');

    let container = document.createElement("article");
    container.classList.add("ticket_in_kart");

    //Delete button
    let sectionDelete = document.createElement("section");
    sectionDelete.classList.add("delete_button");

    let buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "X";

    sectionDelete.appendChild(buttonDelete);
    container.appendChild(sectionDelete);
    // Kart Ticket Body

    let sectionKartTicketBody = document.createElement("section");
    sectionKartTicketBody.classList.add("kart_ticket_body");

    let articleTicket = document.createElement("article");
    articleTicket.classList.add("ticket");

        // Header 
        let sectionHeader = document.createElement("section");
        sectionHeader.classList.add("ticket_header");

        let title = document.createElement("h2");
        title.textContent = "Ticket";

        let imgHeader = document.createElement("img");
        imgHeader.src = "../media/img/logo.png";
        
        sectionHeader.appendChild(title);
        sectionHeader.appendChild(imgHeader);

        articleTicket.appendChild(sectionHeader);


        // Body
        let sectionBody = document.createElement("section");
        sectionBody.classList.add("ticket_body");

        let sectionCityAndStation = document.createElement("section");
        sectionCityAndStation.id = "cities_and_trainstation";

            //Cities and Trainstations
                // Cities informations
                let sectionCitiesInformations = document.createElement("section");
                sectionCitiesInformations.id = "city_information";

                let pStartCity = document.createElement("p");
                pStartCity.classList.add("start_city");
                pStartCity.textContent = "Ville de départ: " + cityStartName;

                let pEndCity = document.createElement("p");
                pEndCity.classList.add("end_city");
                pEndCity.textContent = "Ville d'arrivée: " +cityEndName;  
                

                sectionCitiesInformations.appendChild(pStartCity);
                sectionCitiesInformations.appendChild(pEndCity);

                sectionCityAndStation.appendChild(sectionCitiesInformations);

                // Train Stations
                let sectionTrainStationsInformations = document.createElement("section");
                sectionTrainStationsInformations.id = "trainstation_information";

                let pStartStation = document.createElement("p");
                pStartStation.classList.add("start_trainstation");
                pStartStation.textContent = "Gare de départ: " + startStation;

                let pEndStation = document.createElement("p");
                pEndStation.classList.add("end_trainstation");
                pEndStation.textContent = "Gare d'arrivée: " + endStation;

                sectionTrainStationsInformations.appendChild(pStartStation);
                sectionTrainStationsInformations.appendChild(pEndStation);

                sectionCityAndStation.appendChild(sectionTrainStationsInformations);

            sectionBody.appendChild(sectionCityAndStation);

            // Other informations

                let sectionOtherInformations = document.createElement("section");
                sectionOtherInformations.classList.add("other_information");

                // Date and Time
                let sectionDateAndTime = document.createElement("section");
                sectionDateAndTime.id = "date_and_time";

                let pDate = document.createElement("p");
                pDate.classList.add("date");
                pDate.textContent = "Date: " + date;

                let pStartTime = document.createElement("p");
                pStartTime.classList.add("start_time");
                pStartTime.textContent  ="Horaire de départ: " + startTime;
                
                let pEndTime = document.createElement("p");
                pEndTime.classList.add("end_time");
                pEndTime.textContent = "Horaire d'arrivée: " +endTime;

                sectionDateAndTime.appendChild(pDate);
                sectionDateAndTime.appendChild(pStartTime);
                sectionDateAndTime.appendChild(pEndTime);

                sectionOtherInformations.append(sectionDateAndTime);

                //Trafif and Command
                let sectionTarifAndCommand = document.createElement("section");
                sectionTarifAndCommand.classList.add("tarif_and_command");

                let pTarif =document.createElement("p");
                pTarif.classList.add("tarif");
                pTarif.textContent = "Prix: "+ tarif + " €";

                let pYoungTarif = document.createElement("p");
                pYoungTarif.classList.add("young_tarif");
                pYoungTarif.textContent = "Tarif jeune: " +(tarif * 0.75).toFixed(2) + " €"; 


                sectionTarifAndCommand.appendChild(pTarif);
                sectionTarifAndCommand.appendChild(pYoungTarif);


                sectionOtherInformations.appendChild(sectionTarifAndCommand);
            sectionBody.appendChild(sectionOtherInformations);

            //Ticket price and quantity
            let sectionTicketPriceAndQuantity = document.createElement("section");
            sectionTicketPriceAndQuantity.classList.add("ticket_price_and_quantity");

                // Ticket Quantity
                let sectionQuantity = document.createElement("section");
                sectionQuantity.classList.add("ticket_quantity");

                let buttonMinus = document.createElement("button");
                buttonMinus.classList.add("minus");
                buttonMinus.innerHTML = "-";

                let pQuantity = document.createElement("p");
                pQuantity.classList.add("quantity");
                pQuantity.textContent = quantity;

                let buttonPlus = document.createElement("button");
                buttonPlus.classList.add("plus");
                buttonPlus.innerHTML = "+";

                sectionQuantity.appendChild(buttonMinus);
                sectionQuantity.appendChild(pQuantity);
                sectionQuantity.appendChild(buttonPlus);

                sectionTicketPriceAndQuantity.appendChild(sectionQuantity);

                //Ticket Price

                let sectionTicketPrice = document.createElement("section");
                sectionTicketPrice.classList.add("ticket_price");

                let pPrixLabel = document.createElement("p");
                pPrixLabel.textContent = "Prix: "; 

                let pPrix = document.createElement("p");
                pPrix.classList.add("price");
                pPrix.textContent = (quantity * tarif).toFixed(2) + " €";

                sectionTicketPrice.appendChild(pPrixLabel);
                sectionTicketPrice.appendChild(pPrix);

                sectionTicketPriceAndQuantity.appendChild(sectionTicketPrice);

    articleTicket.appendChild(sectionBody)
    articleTicket.appendChild(sectionTicketPriceAndQuantity);

    sectionKartTicketBody.appendChild(articleTicket)

    container.appendChild(sectionKartTicketBody)
    parent.appendChild(container)

    buttonDelete.addEventListener('click' ,(e) => {
        e.preventDefault();
        container.remove();
        let kart = userStorage.getItem("kart");
        if (kart) {
            let kartArray = JSON.parse(kart);
            for (let i = 0;i < quantity;i++){
                let index = kartArray.findIndex((element) => element === ticketId);
                if(index !== -1){
                    kartArray.splice(index, 1);
                }
            }
            userStorage.setItem("kart",JSON.stringify(kartArray));
            
        }

        sumPrice -= tarif * quantity;
        if(sumPrice < 0){
            sumPrice = 0;
        }
        location.reload();
        updateTotalCost();
    })

    buttonMinus.addEventListener('click',(e) => {
        e.preventDefault();
        if (quantity > 1){
            quantity -= 1;
            pQuantity.textContent = quantity;
            pPrix.textContent = (quantity * tarif).toFixed(2) + " €";
            sumPrice -= tarif;
            if(sumPrice < 0){
                sumPrice = 0;
            }
            let kart = userStorage.getItem("kart");

            if (kart) {
                let kartArray = JSON.parse(kart);
                let index = kartArray.findIndex((element) => element === ticketId);
                if(index !== -1){
                    kartArray.splice(index, 1);
                }
                userStorage.setItem("kart",JSON.stringify(kartArray));
            }
            location.reload();
            updateTotalCost();
        }
    })

    buttonPlus.addEventListener('click',(e) => {
        e.preventDefault();
        quantity += 1;
        pQuantity.textContent = quantity;
        pPrix.textContent = (quantity * tarif).toFixed(2) + " €";
        sumPrice += parseInt(tarif);
        let kart = userStorage.getItem("kart");
        if (kart) {
            let kartArray = JSON.parse(kart);
            kartArray.push(ticketId);
            userStorage.setItem("kart",JSON.stringify(kartArray));
        }
        location.reload();
        updateTotalCost();
    });

}




function displayTicket(ticketId,quantity){ 
 
    return new Promise((resolve) =>{
        getSchedule(ticketId).then(item =>{
            createTicket(ticketId,item.travel.from.city,item.travel.to.city,item.travel.from.name,item.travel.to.name,convertDate(item.date),item.departureTime,addMinutesToTime(item.departureTime,item.travel.duration),item.price,quantity); 
            sumPrice += parseFloat(item.price * quantity);
            resolve();
        });
    });

}

function updateTotalCost(){

    let pTotatCost  = document.querySelector("#price");
    console.log(sumPrice);
    pTotatCost.textContent = sumPrice.toFixed(2) + " €";
}


function displayKart(){
    const kart = userStorage.getItem("kart");
    if (!kart) {
      return;
    }
    let kartTickets = JSON.parse(kart);
    kartTickets.forEach(element => {
        let quantity = removeDuplicatesAndCount(kartTickets,element);
        displayTicket(element,quantity).then(()=>{
            updateTotalCost();
        })
    });
}
let kartList = JSON.parse(userStorage.getItem("kart"));
function checkIfKartIsEmpty(){
    if(kartList !== null && kartList.length !== 0){
        displayKart();
    } else{
        let parent = document.getElementById('tickets_container');
        let pKartEmpty = document.createElement("p")
        pKartEmpty.textContent = "Le panier est vide";
        pKartEmpty.setAttribute("id","pKartEmpty");
        parent.appendChild(pKartEmpty);
    
        let pPrice = document.getElementById("price");
        pPrice.textContent = "0.00 €";
    }
}

checkIfKartIsEmpty();


 




let  buyButton = document.querySelector(".buy button");
let kart = userStorage.getItem("kart");

buyButton.addEventListener("click", () => {
    kart = JSON.parse(userStorage.getItem("kart"));
    if(kart .length != 0){
        window.location.href = "../HTML/book.html"
    }
});