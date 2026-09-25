import {loadHeaderFooter} from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();
const form = document.forms["checkout"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  order.checkout();
});