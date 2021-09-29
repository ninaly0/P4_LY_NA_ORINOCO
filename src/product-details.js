// Ajout des produits dans le localStorage
function saveLocalProduct(product) {
  let products = [];
  if (localStorage.getItem("products") !== null) {
    products = JSON.parse(localStorage.getItem("products"));
  }

  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
}

//Prepare les produits dans le localStorage
function prepareProductToLS(product) {

  const addToCartBtn = document.querySelector('.add-to-cart');
  const productInCartNb = {
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.imageUrl
  }

  addToCartBtn.addEventListener('click', function(){
    saveLocalProduct(productInCartNb);
  });
}


async function getContentFromApi(){
  // récupération de l'Id
  let params = (new URL(document.location)).searchParams;
  let id = params.get('id');

  // Injection de l'id récupéré dans l'url
  fetch("http://localhost:3500/api/cameras/" + id)
  .then(function(res){
    res.json().then(function(data) {
      if (!data || !data._id) {
        return;
      }

      document.querySelector('.app-card').classList.remove('d-none');
      document.querySelector('.app-loader').classList.add('d-none');

      // Injection des infos du produit cliqué
      let prodTitle = document.querySelector('#product-details .product-informations h2');
      prodTitle.textContent = data.name;
      let prodDescription = document.querySelector('#product-details .product-informations p.description');
      prodDescription.textContent = data.description;
      let prodPrice = document.querySelector('#product-details .product-informations p.price');
      prodPrice.textContent = data.price + ' €';
      let selectEl = document.querySelector('.lenses-select select');
      for (var i = 0; i < data.lenses.length; i++) {
        let option = document.createElement('option');
        option.textContent = data.lenses[i];
        selectEl.appendChild(option);
      }
      let productImg = document.querySelector('.app-card img');
      productImg.setAttribute('src', data.imageUrl)

      prepareProductToLS(data);
    });
  })
}

getContentFromApi();
