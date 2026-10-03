import { loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const dataSource = new ExternalServices();

const checkout = new CheckoutProcess('so-cart', dataSource);

checkout.init();
