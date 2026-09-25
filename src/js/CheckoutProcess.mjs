import {alertMessage,getLocalStorage, removeAllAlerts, setLocalStorage} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: parseFloat(item.FinalPrice),
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSubTotal() {
    this.itemTotal = 0;
    this.list.forEach(item => {
        this.itemTotal += parseFloat(item.FinalPrice);
    })
  }

  calculateOrderTotal() {
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.shipping = 10;
    if (this.list.length > 1){
        this.shipping += (this.list.length - 1) * 2;
    }
    this.orderTotal = (parseFloat(this.tax) + this.itemTotal + this.shipping).toFixed(2);

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const cartTotal = document.getElementById("cartTotal");
    cartTotal.innerText = this.itemTotal.toFixed(2);
    
    const tax = document.getElementById("tax");
    tax.innerText = this.tax;

    const shipping = document.getElementById("shipping");
    shipping.innerText = this.shipping;

    const orderTotal = document.getElementById("orderTotal");
    orderTotal.innerText = this.orderTotal;


  }
  calculateItemSummary(){
    this.calculateItemSubTotal();
    this.calculateOrderTotal();
  }
  async checkout() {
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);
    //console.log(order);

    try {
      await services.checkout(payload);
      setLocalStorage(this.key, []);
      window.location.assign("/checkout/success.html");
    } catch (error) {
      removeAllAlerts();
      const messages = error.message && typeof error.message === "object"
        ? Object.values(error.message)
        : [error.message || "Unable to place your order."];
      messages.forEach((message) => alertMessage(message));
    }
  }
}