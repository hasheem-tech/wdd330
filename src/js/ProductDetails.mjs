import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails{
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init(){
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document.getElementById('addToCart').addEventListener('click', this.addProductToCart.bind(this));

    }
    addProductToCart() {
        const cart = getLocalStorage("so-cart") || []; // get cart array from local storage if non-existent, make a new empty array
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
}
    renderProductDetails(){
        productDetailsTemplate(this.product);
    }

}

function productDetailsTemplate(product){
    const brand_name = document.querySelector('h2')
    brand_name.textContent = product.Brand.Name;

    const product_name = document.querySelector('h3')
    product_name.textContent = product.NameWithoutBrand;

    const product_img = document.getElementById('productImage');

    product_img.src = product.Image;
    product_img.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;


}