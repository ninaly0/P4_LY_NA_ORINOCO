// Affichage de la liste des produits de l'API
function displayProducts() {

  // Récupération des informations dans l'API
  fetch("http://localhost:3500/api/cameras")
  .then(function(res){
    if(res.ok) {
      res.json().then(function(cameras) {

        // Parcours des cameras
        for (let i = 0; i < cameras.length; i++){

          // creation des cartes pour injecter dans le HTML
          var row = document.querySelector('.card-list-row');
          var col = document.createElement('div');
          col.classList.add('col-md-4', 'col-sm-6', 'col-12', 'mb-4');
          row.appendChild(col);

          var linkToProduct = document.createElement('a');
          linkToProduct.setAttribute('href', "product.html?id=" + cameras[i]._id);
          col.appendChild(linkToProduct);

          var card = document.createElement('div');
          card.classList.add('card', 'w3');
          linkToProduct.appendChild(card);

          var imageCard = document.createElement('img');
          imageCard.setAttribute('src', cameras[i].imageUrl);
          imageCard.classList.add('card-img-top');
          card.appendChild(imageCard);

          var cardBody = document.createElement('div');
          cardBody.classList.add('card-body');
          card.appendChild(cardBody);

          var cardBodyHeader = document.createElement('div')
          cardBodyHeader.classList.add('card-body-header', 'd-flex', 'justify-content-between');
          cardBody.appendChild(cardBodyHeader);

          var cardTitle = document.createElement('h5')
          cardTitle.classList.add('card-title');
          cardBodyHeader.appendChild(cardTitle);
          cardTitle.textContent = cameras[i].name;

          var cardPrice = document.createElement('span')
          cardPrice.classList.add('card-price');
          cardBodyHeader.appendChild(cardPrice);
          cardPrice.textContent = cameras[i].price + "€";

          var cardDescription = document.createElement('p')
          cardDescription.classList.add('card-text');
          cardBody.appendChild(cardDescription);
          cardDescription.textContent = cameras[i].description;
        };
      });
    }
  })
  .catch (function (err) {
    console.log("error" + err);
  });
}

displayProducts();

numberOfProduct();
