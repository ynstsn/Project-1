function getSchedulesArray(cityStartId,cityEndId,stationFromId,stationToId,date,timeFrom){


    if(cityStartId === null){
        cityStartId = "";
    }

    if(cityEndId === null){
        cityEndId = "";
    }

    if(stationFromId === undefined){
        stationFromId = "";
    }

    if(stationToId === undefined){
        stationToId ="";
    }

    return new Promise((resolve, reject) => {
        fetch('http://nathanael-spriet.fr:1111/schedules?cityFrom='+cityStartId+'&cityTo='+cityEndId+'&stationFrom='+stationFromId+'&stationTo='+stationToId+'&date='+date+'&timeFrom='+timeFrom).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response
        }
        }).then(schedules => {
            resolve(schedules);
        }).catch(error => {
            error.text().then(errorMessage => {
            console.log('Request failed : ' + errorMessage);
            reject(error);
            });
        });
    });
}

function getCityId(cityName){
    return new Promise((resolve, reject) => {
        fetch('http://nathanael-spriet.fr:1111/cities').then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
            }).then(schedules => {
                schedules.forEach(schedule => {
                    if(schedule.name === cityName){
                        resolve(schedule.id)
                    }                    
                });
                resolve(undefined);
            }).catch(error => {
                error.text().then(errorMessage => {
                console.log('Request failed : ' + errorMessage);
                reject(undefined)
            });
            });
    });
}

function getStationId(stationName){
    return new Promise((resolve, reject) => {
        fetch('http://nathanael-spriet.fr:1111/stations').then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
            }).then(station => {
                station.forEach(station => {
                    if(station.name === stationName){
                        resolve(station.id)
                    }
                });
                resolve(undefined);
            }).catch(error => {
                error.text().then(errorMessage => {
                console.log('Request failed : ' + errorMessage);
                reject(undefined)
            });
            });
    });
}

function formateDate(year,month,day){
    if (month < 10){
        month = '0'+ month;
    }
    if(day < 10){
        day = '0' + day;
    }
    return year+'-'+month+'-'+day;
}

function convertDate(foramteDate){
    let splitDate = foramteDate.split('-');

    return splitDate[2]+"/"+splitDate[1]+"/"+splitDate[0];
}
function formateTime(hours,minutes){

    if (hours === undefined || minutes === undefined){
        return undefined
    }

    if (hours < 10){
        hours = '0' + hours
    }

    if(minutes < 10){
        minutes = '0' + minutes
    }

    return hours +':'+minutes
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

function createTicket(id,cityStartName, cityEndName, startStation, endStation,date,startTime,endTime,tarif){

    let parent = document.getElementById('tickets_container');

    let container = document.createElement("article");
    container.classList.add("ticket");

    // Header 
    let sectionHeader = document.createElement("section");
    sectionHeader.classList.add("ticket_header");

    let title = document.createElement("h2");
    title.textContent = "Ticket";

    let imgHeader = document.createElement("img");
    imgHeader.src = "../media/img/logo.png";
    
    sectionHeader.appendChild(title);
    sectionHeader.appendChild(imgHeader);

    container.appendChild(sectionHeader);

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

            let buttonAddToKart = document.createElement("button");
            buttonAddToKart.classList.add("add_to_kart");
            buttonAddToKart.textContent = "Ajouter au panier";

            sectionTarifAndCommand.appendChild(pTarif);
            sectionTarifAndCommand.appendChild(pYoungTarif);
            sectionTarifAndCommand.appendChild(buttonAddToKart);

            sectionOtherInformations.appendChild(sectionTarifAndCommand);
        sectionBody.appendChild(sectionOtherInformations);

    container.appendChild(sectionBody);

    parent.appendChild(container);

    buttonAddToKart.addEventListener("click",(e)=>{
        e.preventDefault();

        let kart = localStorage.getItem("kart");
        if(!kart){
            kart = [];
        } else{
            kart = JSON.parse(kart)
            console.log(kart);
        }
        kart.push(id);
        userStorage.setItem("kart", JSON.stringify(kart));
    })
}

function isTimeInferior(timeEnd,time){
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

function displayOneTicket(item,timeTo,timeEnd){
    if(timeEnd != ""){
        if (isTimeInferior(addMinutesToTime(item.departureTime,item.travel.duration),timeEnd)){
            if (timeTo != ""){
                if(isTimeInferior(item.departureTime,timeTo)){
                    createTicket(item.id,item.travel.from.city,item.travel.to.city,item.travel.from.name,item.travel.to.name,convertDate(item.date),item.departureTime,addMinutesToTime(item.departureTime,item.travel.duration),item.price);
                }
            }else{
                createTicket(item.id,item.travel.from.city,item.travel.to.city,item.travel.from.name,item.travel.to.name,convertDate(item.date),item.departureTime,addMinutesToTime(item.departureTime,item.travel.duration),item.price);
            }
        }
    } else{
        if(timeTo != ""){
            if(isTimeInferior(item.departureTime,timeTo)){
                createTicket(item.id,item.travel.from.city,item.travel.to.city,item.travel.from.name,item.travel.to.name,convertDate(item.date),item.departureTime,addMinutesToTime(item.departureTime,item.travel.duration),item.price);
            }
        } else{
            createTicket(item.id,item.travel.from.city,item.travel.to.city,item.travel.from.name,item.travel.to.name,convertDate(item.date),item.departureTime,addMinutesToTime(item.departureTime,item.travel.duration),item.price);

        }
    }
}

function displayTickets(cityStartName, cityEndName,stationFrom,stationTo,date,timeFrom,timeTo,timeEnd){
    getCityId(cityStartName).then(cityStartId => {
        getCityId(cityEndName).then(cityEndId => {
            getStationId(stationFrom).then(stationFromId => {
                getStationId(stationTo).then(stationToId => {
                    
                    getSchedulesArray(cityStartId,cityEndId,stationFromId,stationToId,date,timeFrom).then(array =>{
                        array.forEach(item => {
                            displayOneTicket(item,timeTo,timeEnd)
                        });
                    });
                });
            });
        });
    });
}

let buttonResearch = document.getElementById("research_button");
buttonResearch.addEventListener("click", (e) => {
    e.preventDefault();

    let ticketsList = document.querySelectorAll(".ticket");
    ticketsList.forEach((ticket)=> {
        ticket.remove();
    })

    let cityFrom = document.getElementById("city_from").value;
    let cityTo = document.getElementById("city_to").value;
    let stationFrom = document.getElementById("station_from").value;
    let stationTo = document.getElementById("station_to").value;
    let date = document.getElementById("date").value;
    let timeFrom = document.getElementById("time_from").value;
    let timeTo = document.getElementById("time_to").value;
    let timeEnd = document.getElementById("time_end").value;
    
    displayTickets(cityFrom,cityTo,stationFrom,stationTo,date,timeFrom,timeTo,timeEnd);
});



function getAllCitiesName(){
    
    return new Promise((resolve, reject) => {
        fetch('http://nathanael-spriet.fr:1111/cities').then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
            }).then(cities => {
                citiesName = [];
                cities.forEach((city) => {
                    citiesName.push(city.name);
                });
                resolve(citiesName);
            }).catch(error => {
                error.text().then(errorMessage => {
                console.log('Request failed : ' + errorMessage);
                reject(undefined)
            });
            });
    });
}

function getAllStationsName(){
    stationsNames = [];
    return new Promise((resolve, reject) => {
        fetch('http://nathanael-spriet.fr:1111/stations').then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
            }).then(stations => {
                stations.forEach(station => {
                    stationsNames.push(station.name);
                });
                resolve(stationsNames);
            }).catch(error => {
                error.text().then(errorMessage => {
                console.log('Request failed : ' + errorMessage);
                reject(undefined)
            });
        });
    });
}

let selectCityStart = document.getElementById("city_from");
let selectCityEnd = document.getElementById("city_to");
getAllCitiesName().then((citiesNames) => {

    let optStartNone = document.createElement("option");
    optStartNone.value = "";
    optStartNone.innerHTML = "";
    selectCityStart.appendChild(optStartNone);


    let optEndNone = document.createElement("option");
    optEndNone.value = "";
    optEndNone.innerHTML = "";
    selectCityEnd.appendChild(optEndNone);

    citiesNames.forEach((value) =>{
        let optStart = document.createElement("option");
        optStart.value = value;
        optStart.innerHTML = value;
        selectCityStart.appendChild(optStart);

        let optEnd = document.createElement("option");
        optEnd.value = value;
        optEnd.innerHTML = value;
        selectCityEnd.appendChild(optEnd);
    })
});

let selectStationStart = document.getElementById("station_from");
let selectStationEnd = document.getElementById("station_to");

getAllStationsName().then((stationsNames) => {
    let optStartNone = document.createElement("option");
    optStartNone.value = "";
    optStartNone.innerHTML = "";
    selectStationStart.appendChild(optStartNone);

    let optEndNone = document.createElement("option");
    optEndNone.value = "";
    optEndNone.innerHTML = "";
    selectStationEnd.appendChild(optEndNone);

    stationsNames.forEach((value) =>{
        let optStart = document.createElement("option");
        optStart.value = value;
        optStart.innerHTML = value;
        selectStationStart.appendChild(optStart);
        let optEnd = document.createElement("option");
        optEnd.value = value;
        optEnd.innerHTML = value;
        selectStationEnd.appendChild(optEnd);
    })
})


function getStationsAtCity(cityName){
    let stationsNames = [];
    return new Promise((resolve, reject) => {
        fetch('http://nathanael-spriet.fr:1111/stations').then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw response
            }
            }).then(stations => {
                stations.forEach(station => {
                    if(cityName === station.city){
                        stationsNames.push(station.name);
                    }
                });
                resolve(stationsNames);
            }).catch(error => {
                error.text().then(errorMessage => {
                console.log('Request failed : ' + errorMessage);
                reject(undefined)
            });
        });
    });
}



selectCityStart.addEventListener("change", () => {
    let city = selectCityStart.value;
    if(city !== ""){
        getStationsAtCity(city).then(stations => {
            selectStationStart.options.length = 0;
            let optStartNone = document.createElement("option");
            optStartNone.value = "";
            optStartNone.innerHTML = "";
            selectStationStart.appendChild(optStartNone);

            stations.forEach((value) =>{
                let optStart = document.createElement("option");
                optStart.value = value;
                optStart.innerHTML = value;
                selectStationStart.appendChild(optStart);
            });
        });
    } else{
        selectStationStart.options.length = 0;
        getAllStationsName().then((stationsNames) => {
            let optStartNone = document.createElement("option");
            optStartNone.value = "";
            optStartNone.innerHTML = "";
            selectStationStart.appendChild(optStartNone);
            stationsNames.forEach((value) =>{
                let optStart = document.createElement("option");
                optStart.value = value;
                optStart.innerHTML = value;
                selectStationStart.appendChild(optStart);
            })
        })
    }
});

selectCityEnd.addEventListener("change", () => {
    let city = selectCityEnd.value;
    if(city !== ""){
        getStationsAtCity(city).then(stations => {
            selectStationEnd.options.length = 0;
            let optEndNone = document.createElement("option");
            optEndNone.value = "";
            optEndNone.innerHTML = "";
            selectStationEnd.appendChild(optEndNone);
            stations.forEach((value) =>{
                let optEnd = document.createElement("option");
                optEnd.value = value;
                optEnd.innerHTML = value;
                selectStationEnd.appendChild(optEnd);
            });
        });
    } else{
            getAllStationsName().then((stationsNames) => {
                selectStationEnd.options.length = 0;
                let optEndNone = document.createElement("option");
                optEndNone.value = "";
                optEndNone.innerHTML = "";
                selectStationEnd.appendChild(optEndNone);
                stationsNames.forEach((value) =>{
                    let optEnd = document.createElement("option");
                    optEnd.value = value;
                    optEnd.innerHTML = value;
                    selectStationEnd.appendChild(optEnd);
                })
            })
    }
});

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

getAllCitiesName().then((cities) =>{
    for (let i = 0; i <8;i++){
        displayTickets(cities[i],cities[i+1],"","",getDateToday(),getTimeNow(),"","");
    }
})

