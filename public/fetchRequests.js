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
            let button = document.createElement("button");
            button.id = category[i]["category_name"];
            button.innerHTML = category[i]["category_name"];
            button.className = "button";
            button.onclick = function(){
                fetchCards(this.id)
            }
            button.setAttribute('data-category', button.id);
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
            fetchCards();
        }
    });
}

function updateDisplay(card){
    console.log(card);
    document.getElementById("question").innerHTML = card["front"];
    // let category_display = document.getElementById("category_display").innerHTML;
    // if(card["category"] != null){
    //     category_display = "Category: " + card["category"];
    // }
    // category_display = "Category: " + card["category"] + " (choose category) ";
}

let frontBackObj = [];

function switchFrontAndBack(){
    let display = document.getElementById("question");
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
            frontBackObj = [];
            frontBackObj.push(json);
            if(!category) return;
            insertCategory(json, category);
        })
}

function deleteCard(){
   if(confirm('Are you sure you want to delete this card?')){
       fetch('/cards/'+frontBackObj[0]["id"], {
           method: 'DELETE',
           headers: {
               'Content-Type': 'application/json'
           }
       })
       .then(response => {
           if(response.ok){
               fetchCards();
           }
       })
   }
}

function alterTextCard(side){
    let alterText = prompt("Enter the new text: ");
    if(side ==='front'){
        if(alterText){
            if(confirm('is this the text you want to update?')){
                frontBackObj[0]["front"] = alterText;
                fetch('/cards-text/'+frontBackObj[0]["id"], {
                    method: 'PUT',
                    body: JSON.stringify({
                        front: alterText,
                        back: frontBackObj[0]["back"]
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if(response.ok){
                        fetchCards();
                    }
                });
            } 
        }

    } else if(side === 'back') {
        if(alterText){
            if(confirm('is this the text you want to update?')){
                frontBackObj[0]["back"] = alterText;
                fetch('/cards-text/'+frontBackObj[0]["id"], {
                    method: 'PUT',
                    body: JSON.stringify({
                        front: frontBackObj[0]["front"],
                        back: alterText
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if(response.ok){
                        fetchCards();
                    }
                });
            } 
        }
    } else {
        throw Error('Invalid side');
    }
}

window.addEventListener('load', function() {	
    fetchCards();
    fetchCategories();
});