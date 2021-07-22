function insertCategory(card, category) {
    console.log('I got executed :(');
    fetch('/update-card-category', {
        method: 'POST',
        body: JSON.stringify({
            id: card.id,
            category: category
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(response.ok){
            fetchCards();
        }
    });
}

function updateDisplay(card){
    console.log(card);
    document.getElementById("question").innerHTML = card["front"];
}

let frontBackObj = [];

function switchFrontAndBack(){
    let display = document.getElementById("question");
    console.log(frontBackObj[0]["front"]);
    let frontOrBack = document.getElementById("front-back");
    if(display.innerHTML == frontBackObj[0]["front"]){
        display.innerHTML = frontBackObj[0]["back"];
        frontOrBack.innerHTML = "Back of the card";
    } else {
        display.innerHTML = frontBackObj[0]["front"];
        frontOrBack.innerHTML = "Front of the card";
    }
}

function fetchCards(category) {
    fetch('/cards')
        .then(response => response.json())
        .then(json => {
            updateDisplay(json);
            frontBackObj.push(json);
            if(!category) return;
            insertCategory(json, category);
        })
}

window.addEventListener('load', function() {	
    fetchCards();
});