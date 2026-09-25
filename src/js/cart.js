import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

async function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");

  if (!productList) {
    return;
  }

  if (!cartItems || cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const uniqueItems = cartItems.filter(
    (item, index, self) =>
      index === self.findIndex((cartItem) => cartItem.Id === item.Id),
  );

  const htmlItems = uniqueItems.map((item) => {
    const quantity = cartItems.filter(
      (cartItem) => cartItem.Id === item.Id,
    ).length;

    return cartItemTemplate(item, quantity);
  });

  productList.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item, quantity) {
  return `
    <li class="cart-card divider">

      <a href="#" class="cart-card__image">
        <img
          src="${item.Images.PrimarySmall}"
          alt="${item.Name}"
        />
      </a>

      <a href="#">
        <h2 class="card__name">
          ${item.Name}
        </h2>
      </a>

      <p class="cart-card__color">
        ${item.Colors[0].ColorName}
      </p>

      <p class="cart-card__quantity">
        qty: ${quantity}
      </p>

      <p class="cart-card__price">
        $${item.FinalPrice}
      </p>

    </li>
  `;
}

async function init() {
  await loadHeaderFooter();
  renderCartContents();
}

init();
