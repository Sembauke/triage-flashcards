// TODO: alter text of the flashcard
// TODO: put category in a seperate table
// TODO: be able to delete a card
// TODO: be able to change the category of a card
// TODO: be able to select a certain card category
// TODO: view a list of all cards?

function fetchCategories(){
    console.log("fetching categories");
    fetch('/category', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(category => {
        document.getElementById("categories").innerHTML = "";
        for(let i = 0; i < category.length; i++){
            console.log(category[i]);
            let button = document.createElement("button");
            button.id = category[i]["category_name"];
            button.innerHTML = category[i]["category_name"];
            button.className = "button";
            button.onclick = fetchCards(this.id);
            document.getElementById("categories").appendChild(button);
        }
    })
}

function addCategory(){
    let insertCategory = prompt("Enter the category name: ");
    if(insertCategory){
        fetch('/insert-category', {
            method: 'POST',
            body: JSON.stringify({
                category_name: insertCategory
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        fetchCategories();
    }
}

// Insert new category to the current held card 
function insertCategory(card, category) {
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
            fetchCards(category);
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
    fetchCategories();
});