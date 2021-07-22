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
function fetchCards(category) {
    fetch('/cards')
        .then(response => response.json())
        .then(json => {
            updateDisplay(json);
            if(!category) return;
            insertCategory(json, category);
        })
}

window.addEventListener('load', function() {	
    fetchCards();
});