import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
const productId = getParam("products");
const category = getParam("category");

loadHeaderFooter();

const dataSource = new ExternalServices();

const product = new ProductDetails(productId, dataSource, category);
product.init();
