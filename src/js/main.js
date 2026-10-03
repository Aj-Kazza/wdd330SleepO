import { getLocalStorage, loadHeaderFooter } from './utils.mjs';
import Alert from './Alert';

loadHeaderFooter();

function updateCartCount() {
  const cartItems = getLocalStorage('so-cart') || [];
  const cartCount = document.querySelector('.cart-count');

  if (cartCount) {
    cartCount.textContent = cartItems.length;
  }
}

const alert = new Alert();
alert.init();

updateCartCount();
