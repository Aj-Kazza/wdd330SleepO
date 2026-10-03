import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from './utils.mjs';

loadHeaderFooter();

function updateCartCount() {
  const cartItems = getLocalStorage('so-cart') || [];
  const cartCount = document.querySelector('.cart-count');

  if (cartCount) {
    cartCount.textContent = cartItems.length;
  }
}

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  document.querySelectorAll('.cart-card__remove').forEach((button) => {
    button.addEventListener('click', removeFromCart);
  });

  const cartFooter = document.querySelector('.cart-footer');

  if (cartItems.length > 0) {
    cartFooter.classList.remove('hide');

    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.FinalPrice),
      0
    );

    cartFooter.querySelector(
      '.cart-total'
    ).innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
    cartFooter.classList.add('hide');
  }
}

function removeFromCart(e) {
  const id = e.target.dataset.id;

  const cartItems = getLocalStorage('so-cart') || [];

  const updatedCart = cartItems.filter(
    (item) => String(item.Id) !== String(id)
  );

  setLocalStorage('so-cart', updatedCart);

  renderCartContents();
  updateCartCount();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="cart-card__remove" data-id="${item.Id}">X</span>

  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"

      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
updateCartCount();
