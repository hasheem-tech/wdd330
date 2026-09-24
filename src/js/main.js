import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

if (element) {
  const productList = new ProductList("Tents", dataSource, element);

  productList.init();
  document.querySelector("#sort").addEventListener("change", () => {
    productList.init();
  });
}

// Load the header and footer
// The cart count will be updated after the header is loaded.
loadHeaderFooter();
