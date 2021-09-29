//Creation d'un nouvel objet user
let newUser = {
  firstName : "",
  lastName : "",
  address : "",
  city : "",
  email : ""
}

// récupérer les données de localstorage
let products = [];
// S'il y a qqch dans le localStorage
if (localStorage.getItem("products") !== null) {
  products = JSON.parse(localStorage.getItem("products"));
} else {
  const table = document.querySelector('.table');
  table.style.display = "none";
  const emptyCart = document.querySelector('.empty-cart');
  emptyCart.classList.remove('d-none');
  const form = document.querySelector('form');
  form.style.display = "none";
}


// fonction qui permet de recuperer le dernier element du localstorage et regrouper les memes cameras
function addToCart(){
  const showCart = {};
  for(let a = 0; a < products.length; a++) {
    let product = products[a];
    if(!showCart[product.id]) {
        showCart[product.id] = {
          product: product,
          quantity: 0
        };
    }
    showCart[product.id].quantity++;
  }
  return showCart;
}

function displayProductsToCart() {

  // fonction qui calcule le total du panier
  // ce qu'on va récupérer dans la page de confirmation
  function totalCart() {
    let sum = 0;
    for (let t = 0; t < entries.length; t++) {
      sum += (entries[t].quantity * entries[t].product.price)
    }
    return sum
  }

  const show = addToCart();
  let entries = Object.values(show);

  for (var e = 0; e < entries.length; e++){
    let product;
    let price;
    let qty;
    let totalPrice;

    // Creation du tableau qui affiche les produits du panier
    const cartDetails = document.querySelector('#cart-details');
    const tr = document.createElement("tr");
    cartDetails.appendChild(tr);

    const tdImage = document.createElement("td");
    tr.appendChild(tdImage);

    const figure = document.createElement("figure");
    figure.classList.add('figure');
    tdImage.appendChild(figure);

    const image = document.createElement('img');
    image.classList.add('figure-img', 'img-thumbnail', 'rounded');
    figure.appendChild(image);

    const tdName = document.createElement('td');
    tr.appendChild(tdName);

    const tdPrice = document.createElement('td');
    tr.appendChild(tdPrice);


    const tdQty = document.createElement('td');
    tr.appendChild(tdQty);

    let tdTotalPrice = document.createElement('td');
    tr.appendChild(tdTotalPrice);

    product = entries[e].product;
    price = product.price;
    qty = entries[e].quantity;
    totalPrice = price * qty

    let tdTotalCartPrice = document.querySelector('td.totalCartPrice');

    // Injection des informations dans les bons éléments
    image.setAttribute('src', product.image);
    tdName.textContent = product.name;
    tdPrice.textContent = price + " €";
    tdQty.textContent = qty;
    tdTotalPrice.textContent = totalPrice + "€";
    tdTotalCartPrice.textContent = totalCart() + "€";
  }
}

displayProductsToCart();


// Formulaire
let lastname = document.querySelector('.lastname');
let firstname = document.querySelector('.firstname');
let address = document.querySelector('.address');
let city = document.querySelector('.city');
let email = document.querySelector('.email');

function lastnameValid() {
  if (lastname.value.length > 0) {
    newUser.lastName = lastname.value;
  } else {
    alert("Le champ nom doit être rempli");
    return false;
  }
}
function firstnameValid() {
  if (firstname.value.length > 0) {
    newUser.firstName = firstname.value;
  } else {
    alert("Le champ prénom doit être rempli");
    return false;
  }
}
function addressValid() {
  if (address.value.length > 0) {
    newUser.address = address.value;
  } else {
    alert("Le champ adresse doit être rempli");
    return false;
  }
}
function cityValid() {
  if (city.value.length > 0) {
    newUser.city = city.value;
  } else {
    alert("Le champ ville doit être rempli");
    return false;
  }
}

function emailValid() {
  let emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (emailReg.test(email.value)) {
    newUser.email = email.value;
  } else {
    alert("Veuillez renseigner le champs email du formulaire");
    return false;
  }
}

const submitFormBtn = document.querySelector(".btn-submit");
submitFormBtn.addEventListener('click', formValidation);

// creation objet contact et tableau produit
function formValidation() {

  addToCart();

  // Verifie la validité du champ saisis
  lastnameValid();
  firstnameValid();
  addressValid();
  cityValid();
  emailValid();

  // creation du tableau qui va contenir les id des cameras
  let productsId = [];
  // S'il y a qqch dans le localStorage
  if (localStorage.getItem("products") !== null) {
    products = JSON.parse(localStorage.getItem("products"));

    for(let i = 0; i < products.length; i++){
      productsId.push(products[i].id)
    }
  }

  let objectToSend = {
    products: productsId,
    contact: newUser
  }

  // Envoi au serveur
  fetch("http://localhost:3500/api/cameras/order", {
    method: "POST",
    body: JSON.stringify(objectToSend),
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(function(res){
    res.json().then(function(json) {
      let orderId = json.orderId;
      if ( lastnameValid() === false || firstnameValid() === false || addressValid() === false || cityValid() === false) {
        return;
      }
      document.location.href = 'orderConfirmation.html?id=' + orderId;
    })
  })
  .catch(error => {
    alert(error);
  })

}