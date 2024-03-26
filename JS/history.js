function getHistory(id){
    return new Promise((resolve) => {
        fetch('http://nathanael-spriet.fr:1111/users/history/'+id, {
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
                throw err;
            });
    })
}
function createTicket(ticketNumber,cityStart,cityEnd,stationStart,stationEnd,date,timeStart,timeStop){
    let parent = document.getElementById("purchase_history_container");

    let articleTicket = document.createElement("article")
    articleTicket.classList.add("ticket_in_history")

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

    parent.appendChild(articleTicket);

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

if(isLogged()){
    let id = parseInt(userStorage.getItem("id"));
    getHistory(id).then((result) => {
        let json = JSON.parse(result);
        
        json.forEach(element => {
            createTicket(element.id,element.schedule.travel.from.city,element.schedule.travel.to.city,element.schedule.travel.from.name,element.schedule.travel.to.name,element.schedule.date,element.schedule.departureTime,addMinutesToTime(element.schedule.departureTime,element.schedule.travel.duration))
        
        });
    });

    let liHistory = document.querySelector("#purchase_history_li");
        liHistory.addEventListener("click", (e) => {
        e.preventDefault();
        let liSelected = document.querySelector(".section_selected");
        liSelected.classList.remove("section_selected");
        liHistory.classList.add("section_selected");
        
        
        let allSection = [document.getElementById("ongoing_tickets_container"),document.getElementById("personal_information_container"),document.getElementById("settings_container")]
        allSection.forEach((element) =>{
            element.classList.add("hidden");
        });
        
        let sectionHistory = document.getElementById("purchase_history_container");
        sectionHistory.classList.remove("hidden");

        
    });
}


