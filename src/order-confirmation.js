// Afficher le montant de la commande
// Afficher l'orderId

// recupération de l'id pour le numéro de commande
let id = location.search.split('=')[1];
let refOrder = document.querySelector('.ref-order');
refOrder.textContent = id

let products = JSON.parse(localStorage.getItem('products'));

// fonction pour reprendre le total de la commande
function totalOrder() {
  let sumTotal = 0;

  if (products === null) {
    return;
  }

  for (let i = 0; i < products.length; i++) {
    sumTotal += products[i].price;
  }
  return sumTotal;
}

// récupération et injection du prix total
let totalPriceOrder = document.querySelector('.total-price-order');
totalPriceOrder.textContent = totalOrder() + "€";

//Vider le localStorage
localStorage.clear();
