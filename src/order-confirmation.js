let id = location.search.split('=')[1];
let refOrder = document.querySelector('.ref-order');

let products = JSON.parse(localStorage.getItem('products'));

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

// fonction pour afficher les informations de la commande
function showOrder() {

  let totalPriceOrder = document.querySelector('.total-price-order');
  // Injection du prix de la commande
  totalPriceOrder.textContent = totalOrder() + "€";

  // Injection de l'id de la commande
  refOrder.textContent = id

  //Vider le localStorage
  localStorage.clear();
}

showOrder();
