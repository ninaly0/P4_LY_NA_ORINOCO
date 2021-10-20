// fonction qui permet de reprendre le nombre de produit mis dans le panier
function numberOfProduct() {
  let products = JSON.parse(localStorage.getItem('products'));
  const countProduct = document.querySelector('.count-product');

  if (products === null) {
    countProduct.textContent = 0;
  } else {
    countProduct.textContent = products.length;
  }

  return countProduct;
}
