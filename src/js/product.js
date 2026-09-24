import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
const productId = getParam("products");
const category = getParam("category");

loadHeaderFooter();

const dataSource = new ProductData();

const product = new ProductDetails(productId, dataSource, category);
product.init();
