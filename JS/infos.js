let loadingTime = 800 //en MS
let actualPage = 0;

console.log("Script.js working !");

function loadInfo(pageNumber){

    let parent = document.getElementById("informations_container");

    for(let index = 0 + pageNumber; index < 3 + pageNumber; index++){

        let content = data[index];

        let container = document.createElement("article");
        container.classList.add("information_box_container");
    
        /* Création du titre */

        let titleDiv = document.createElement("div");
        titleDiv.classList.add("information_title_container");
    
        let title = document.createElement("h2");
        title.textContent = content.titre;

        titleDiv.appendChild(title);
        
        /* Création de l'image */

        let picDiv = document.createElement("div");
        picDiv.classList.add("information_picture_container");
        picDiv.classList.add("picture_container");

        let picture = document.createElement("img");
        picture.src = "media/img/placeholder.jfif";
        picture.alt = "No image available !";

        picDiv.appendChild(picture);

        /* Création du contenu */

        let contentContainer = document.createElement("div");
        contentContainer.classList.add("information_content_container")

            /* Création du lieu */

        let placeDiv = document.createElement("div");
        placeDiv.classList.add("information_place_container");

        let placeTitle = document.createElement("h3");
        placeTitle.textContent = "Lieu";

        let placeContent = document.createElement("p");
        placeContent.textContent = content.lieu;

        placeDiv.appendChild(placeTitle);
        placeDiv.appendChild(placeContent);

            /* Création des détails */

        let detailDiv = document.createElement("div");
        detailDiv.classList.add("information_detail_container");

        let detailTitle = document.createElement("h3");
        detailTitle.textContent = "Détails";

        let detailContent = document.createElement("p");
        detailContent.textContent = content.description;

        detailDiv.appendChild(detailTitle);
        detailDiv.appendChild(detailContent);

        /*------------------------------------*/

        container.appendChild(titleDiv);
        container.appendChild(picDiv);
        container.appendChild(placeDiv);
        container.appendChild(detailDiv);
        
        
        

        parent.insertBefore(container, parent.lastElementChild);

    }
}

function loadWithGif(pageNumber){

    let parent = document.getElementById("informations_container");

    for(let element of parent.querySelectorAll("article")){
        element.remove();
    }

    let img = new Image(100, 100);
    img.src = "media/gifs/load.gif";

    parent.insertBefore(img, parent.lastElementChild);

    new Promise((resolve) => {
        setTimeout(() =>{
            resolve();
        }, loadingTime);
    }).then(() => {
        parent.removeChild(img);
        loadInfo(pageNumber);
        actualPage = pageNumber;
    })


}

function navigateTo(newNumber){

    if(newNumber >= data.length - 2) { 
        loadWithGif(actualPage);
        return;
    }
    if(newNumber < 0){
        loadWithGif(actualPage);
        return;
    } 

    loadWithGif(newNumber);
}











/* -------------------------Zone aux events---------------------- */

document.getElementById("left_arrow_container").addEventListener("click", function() {navigateTo(actualPage - 1)});
document.getElementById("right_arrow_container").addEventListener("click", function() {navigateTo(actualPage + 1)});









/* ------------------------------------------------------------- */

loadWithGif(0);