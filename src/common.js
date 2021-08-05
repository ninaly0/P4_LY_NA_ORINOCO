function getContentFromApi(){
  fetch("http://localhost:3500/api/cameras")
  .then(function(res){
    res.json().then(function(data) {
      for (let i = 0; i < data.length; i++){{
        var column = createListProduct(data[i]);
        var row = document.querySelector('.card-list-row');
        row.appendChild(column);
      }};
    });
  })
}

getContentFromApi();

function createListProduct(product) {
  var col = document.createElement('div');
  col.classList.add('col', 'mb-4');

  var linkToProduct = document.createElement('a');
  //linkToProduct.setAttribute('href', "product/" + product._id);
  linkToProduct.setAttribute('href', "product.html");
  col.appendChild(linkToProduct);

  var card = document.createElement('div');
  card.classList.add('card', 'w3');
  linkToProduct.appendChild(card);

  var imageCard = document.createElement('img');
  imageCard.setAttribute('src', product.imageUrl);
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
  cardTitle.textContent = product.name;

  var cardPrice = document.createElement('span')
  cardPrice.classList.add('card-price');
  cardBodyHeader.appendChild(cardPrice);
  cardPrice.textContent = product.price + "€";

  var cardDescription = document.createElement('p')
  cardDescription.classList.add('card-text');
  cardBody.appendChild(cardDescription);
  cardDescription.textContent = product.description;

  return col;
}

function getlenses(lensChoice) {
  var lensesSelect = document.querySelector('.lenses-select');
  var options = lensesSelect.querySelector('select option');
}

function getProductId() {

}
