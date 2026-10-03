import { getLocalStorage, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert';

loadHeaderFooter();

function updateCartCount() {
  const cartItems = getLocalStorage('so-cart') || [];
  const cartCount = document.querySelector('.cart-count');

  if (cartCount) {
    cartCount.textContent = cartItems.length;
  }
}

const dataSource = new ProductData('tents');

const listElement = document.querySelector('.product-list');
const productList = new ProductList('tents', dataSource, listElement);

productList.init();

const alert = new Alert();
alert.init();

updateCartCount();
