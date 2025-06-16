const inputName = document.getElementById('name');
const inputQuantity = document.getElementById('quantity');
const inputFood = document.getElementById('food');

const btnAdd = document.querySelector('.btn--add');

const wrapperResultsHTML = document.querySelector('.wrapper__results');

const ordersTab = [];

class Order {
    constructor(name, quantity, food){
        this.name = name;
        this.quantity = quantity;
        this.food = food;
    }
}

function displayFood(name, quantity, food) {
    ordersTab.push(new Order(name, quantity, food))
    updateList();
}

function deleteFood(target){
    ordersTab.splice(target, 1);
    updateList();
}

function updateList() {
    if (ordersTab.length == 0) {
        wrapperResultsHTML.innerHTML = "Votre liste est vide 🍔";
    } else {
        wrapperResultsHTML.innerHTML = "";
        ordersTab.forEach((order, index) =>{
        wrapperResultsHTML.innerHTML += `
            <div class="order__single" data-id="${index}">
                <div class="order__details">
                    <div class="order__name">${order.name}</div>
                    <div class="order__quantity">${order.quantity}x</div>
                    <div class="order__food">${order.food}</div>
                </div>
                <div class="btn btn--delete">❌</div>
            </div>
        `
        })
    }
    
}
updateList();

btnAdd.addEventListener('click', (e)=>{
    e.preventDefault();
    if (inputFood.value) {
        displayFood(inputName.value, inputQuantity.value, inputFood.value);
        console.log(ordersTab);
        inputFood.value = "";
        inputFood.select();
    } else{
        alert("Veuillez remplir tous les champs.")
    }
})


wrapperResultsHTML.addEventListener('click', (e)=>{
    if (e.target.classList.contains('btn--delete')) {
        const targetID = e.target.parentElement.dataset.id;
        deleteFood(targetID);
    }
})