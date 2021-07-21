function insertCategory(card, category) {
    console.log(card[0].id);
    fetch('/update-card-category', {
        method: 'POST',
        body: JSON.stringify({
            id: card[0].id,
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
    document.getElementById("question").innerHTML = card[0].front;
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