import { getLocalStorage, alertMessage, removeAllAlerts } from './utils.mjs';

export default class CheckoutProcess {
  constructor(cartKey, dataSource) {
    this.cartKey = cartKey;
    this.dataSource = dataSource;
    this.cart = getLocalStorage(this.cartKey) || [];
  }

  init() {
    this.calculateSubtotal();
    this.calculateOrderTotal();

    const zip = document.querySelector('#zip');

    if (zip) {
      zip.addEventListener('blur', () => {
        this.calculateOrderTotal();
      });
    }

    const form = document.querySelector('form[name="checkout"]');

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.checkout(form);
      });
    }
  }

  calculateSubtotal() {
    const subtotal = this.cart.reduce(
      (total, item) => total + item.FinalPrice,
      0
    );

    document.querySelector('.subtotal').textContent = subtotal.toFixed(2);

    this.subtotal = subtotal;
  }

  calculateOrderTotal() {
    const tax = this.subtotal * 0.06;

    const shipping = this.cart.length > 0 ? 10 + (this.cart.length - 1) * 2 : 0;

    const orderTotal = this.subtotal + tax + shipping;

    document.querySelector('.tax').textContent = tax.toFixed(2);
    document.querySelector('.shipping').textContent = shipping.toFixed(2);
    document.querySelector('.order-total').textContent = orderTotal.toFixed(2);

    this.tax = tax;
    this.shipping = shipping;
    this.orderTotal = orderTotal;
  }

  packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1,
    }));
  }

  async checkout(form) {
    const formData = new FormData(form);
    const order = Object.fromEntries(formData);

    order.orderDate = new Date().toISOString();
    order.items = this.packageItems(this.cart);
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;

    try {
      const response = await this.dataSource.checkout(order);

      console.log('Order submitted:', response);

      localStorage.setItem(this.cartKey, JSON.stringify([]));

      window.location.assign('/checkout/success.html');

      return response;
    } catch (err) {
      console.error('Checkout failed:', err);

      removeAllAlerts();

      const messages =
        err.message && typeof err.message === 'object'
          ? Object.values(err.message)
          : [err.message || 'Unable to place your order.'];

      messages.forEach((message) => {
        alertMessage(message);
      });
    }
  }
}
