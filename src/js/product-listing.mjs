import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter()
const dataSource = new ExternalServices();


const category = getParam("category");

const element = document.querySelector(".product-list");


if (element) {
  const productList = new ProductList(category, dataSource, element);

  productList.init();
  document.querySelector("#sort").addEventListener("change", () => {
    productList.init();
  });
}