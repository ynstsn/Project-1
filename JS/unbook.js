function deleteTicket(id,mail){
    console.log('http://nathanael-spriet.fr:1111/ticket/'+id+'? mail='+mail);
    return new Promise((resolve) => {
        fetch('http://nathanael-spriet.fr:1111/ticket/'+id+'?mail='+mail, {
            method: 'DELETE',
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
                throw err;
            });
    })
}
function createTicketOngoing(ticketNumber,cityStart,cityEnd,stationStart,stationEnd,date,timeStart,timeStop){
    let parent = document.getElementById("ongoing_tickets_container");

    let articleTicket = document.createElement("article")
    articleTicket.classList.add("ticket")

    let h3Ticket = document.createElement("h3");
    h3Ticket.innerHTML = "Ticket #"+ticketNumber;
    articleTicket.appendChild(h3Ticket);

    let pCityStart = document.createElement("p");
    pCityStart.innerHTML = "Départ : "+cityStart;
    articleTicket.appendChild(pCityStart);

    let pCityEnd = document.createElement("p");
    pCityEnd.innerHTML = "Arrivée : "+cityEnd;
    articleTicket.appendChild(pCityEnd);

    let pStationStart = document.createElement("p");
    pStationStart.innerHTML = "Station de départ : "+stationStart;
    articleTicket.appendChild(pStationStart);

    let pStationEnd = document.createElement("p");
    pStationEnd.innerHTML = "Station d'arrivée : "+stationEnd;
    articleTicket.appendChild(pStationEnd);

    let pDate = document.createElement("p");
    pDate.innerHTML = "Date : "+date;
    articleTicket.appendChild(pDate);

    let pTimeStart = document.createElement("p");
    pTimeStart.innerHTML = "Heure de départ : "+timeStart;
    articleTicket.appendChild(pTimeStart);

    let pTimeStop = document.createElement("p");
    pTimeStop.innerHTML = "Heure d'arrivée : "+timeStop;
    articleTicket.appendChild(pTimeStop);


    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Annuler ticket"
    articleTicket.appendChild(deleteButton);



    parent.appendChild(articleTicket);

    deleteButton.addEventListener('click' , () => {
        let confirmation = confirm("Confirmez pour annuler le ticket")
        if(confirmation){
            deleteTicket(ticketNumber,userStorage.getItem("mail")).then(() => {
                userStorage.setItem("unbook","1");
                alert("Vous avez annulé le ticket");
                location.reload();
            })
        }

        
    });

}

window.addEventListener('load', () => {
    if(userStorage.getItem("unbook") === "1"){
        let liOngoing = document.querySelector("#ongoing_tickets_li");
        simulateClick(liOngoing);
        userStorage.setItem("unbook","0");
    }
    
});

function simulateClick(element) {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
  
    element.dispatchEvent(event);
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

function isDateBefore(date, secondDate) {
    dateArray = date.split("-").map(Number);
    secondDateArray = secondDate.split("-").map(Number); 

    if (dateArray[0] !== secondDateArray[0]) {
        return dateArray[0] < secondDateArray[0]; 
    }

    if (dateArray[1] !== secondDateArray[1]) {
        return dateArray[1] < secondDateArray[1];
    }

    if (dateArray[2] !== secondDateArray[2]) {
        return dateArray[2] < secondDateArray[2];  
    }

    return true;
}


function isTimeBefore(timeEnd,time){
    if (timeEnd === time ){
        return true;
    }
    let timeEndArray = timeEnd.split(':').map(Number);
    let timeArray = time.split(':').map(Number);
    
    if (timeEndArray[0] !== timeArray[0]) {
      return timeEndArray[0] < timeArray[0];
    } else {
      return timeEndArray[1] < timeArray[1];
    }
    
}


function getDateToday(){
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0'); 
    let day = String(today.getDate()).padStart(2, '0');
    return year+'-'+month+'-'+day;
}

function getTimeNow(){
    let today = new Date();
    let hours = String(today.getHours()).padStart(2, '0');
    let minutes = String(today.getMinutes()).padStart(2, '0');

    return hours+":"+minutes;
}

if(isLogged()){
    let id = parseInt(userStorage.getItem("id"));
    getHistory(id).then((result) => {
        let json = JSON.parse(result);
        json.forEach(element => {        
            if(isDateBefore(getDateToday(),element.schedule.date) ){
                if(getDateToday === element.schedule.date && !isTimeBefore(getTimeNow(),element.schedule.departureTime)){

                } else{
                    createTicketOngoing(element.id,element.schedule.travel.from.city,element.schedule.travel.to.city,element.schedule.travel.from.name,element.schedule.travel.to.name,element.schedule.date,element.schedule.departureTime,addMinutesToTime(element.schedule.departureTime,element.schedule.travel.duration))

                }
            }
            
        });
    });

    let liOngoing = document.querySelector("#ongoing_tickets_li");
    liOngoing.addEventListener("click", (e) => {
        e.preventDefault();
        let liSelected = document.querySelector(".section_selected");
        liSelected.classList.remove("section_selected");
        liOngoing.classList.add("section_selected");
        
        
        let allSection = [document.getElementById("purchase_history_container"),document.getElementById("personal_information_container"),document.getElementById("settings_container")]
        allSection.forEach((element) =>{
            element.classList.add("hidden");
        });
        
        let sectionOngoing = document.getElementById("ongoing_tickets_container");
        sectionOngoing.classList.remove("hidden");
        
    });
}


