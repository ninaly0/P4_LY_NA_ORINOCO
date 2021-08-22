function getContentFromApi(){
  let params = (new URL(document.location)).searchParams;
  let id = params.get('id');


  fetch("http://localhost:3500/api/cameras/" + id)
  .then(function(res){
    res.json().then(function(data) {
      if (!data || !data._id) {
        return;
      }

      document.querySelector('.app-card').classList.remove('d-none');
      document.querySelector('.app-loader').classList.add('d-none');

      let prodTitle = document.querySelector('.product-details .product-informations h2');
      prodTitle.textContent = data.name;
      let prodDescription = document.querySelector('.product-details .product-informations p.description');
      prodDescription.textContent = data.description;
      let prodPrice = document.querySelector('.product-details .product-informations p.price');
      prodPrice.textContent = data.price + ' €';
      let selectEl = document.querySelector('.lenses-select select');
      for (var i = 0; i < data.lenses.length; i++) {
        let option = document.createElement('option');
        option.textContent = data.lenses[i];
        console.log(option)
        selectEl.appendChild(option);
      }

      let productImg = document.querySelector('.app-card img');
      productImg.setAttribute('src', data.imageUrl)
    });
  })
}

getContentFromApi();
