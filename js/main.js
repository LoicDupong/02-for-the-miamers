// 🍔 == Déclaration de variables
const inputName = document.getElementById('name');
const inputQuantity = document.getElementById('quantity');
const inputFood = document.getElementById('food');

const btnAdd = document.querySelector('.btn--add');

const wrapperResultsHTML = document.querySelector('.wrapper__results');

const ordersTab = [];

// 🍔 == Création d'une class pour les objets Order
class Order {
    constructor(name, quantity, food){
        this.name = name;
        this.quantity = quantity;
        this.food = food;
    }
}

// 🍔 == Function pour afficher une commande avec comme paramètre le nom de la personne qui doit apporter cette commande, la quantité et la nourriture en question, on push l'objet créé dans le tableau des commandes et la fonction qui met à jour la liste dans l'html est appelée
function displayFood(name, quantity, food) {
    ordersTab.push(new Order(name, quantity, food))
    updateList();
}
// 🍔 == Function pour supprimer une commande avec comme paramètre le dataset ID qui correspont à l'index de la cible pour la viser dans le tableau et la fonction qui met à jour la liste dans l'html est appelée
function deleteFood(target){
    ordersTab.splice(target, 1);
    updateList();
}

// 🍔 == Function qui sert à afficher "Votre liste est vide 🍔" si le tableau est vide, sinon met à jour le wrapper dans l'html en affichant chaque élément du tableau après les avoir parcouru un à un
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

// 🍔 == Event Listener pour ajouter une commande, on y appelle la fonction displayFood et utilise les paramètres en y utilisant les valeurs des inputs.
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

// 🍔 == Event Listener qui utilise la délégation pour cibler le dataset ID du parent pour l'utiliser dans le paramètre de la fonction deleteFood
wrapperResultsHTML.addEventListener('click', (e)=>{
    if (e.target.classList.contains('btn--delete')) {
        const targetID = e.target.parentElement.dataset.id;
        deleteFood(targetID);
    }
})