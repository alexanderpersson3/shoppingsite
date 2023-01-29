const shop = document.querySelector("#shop");
const shoppingCart = document.querySelector("#shopping-cart");
const btnCatagorys = document.querySelectorAll(".btnCatagorys");
const quantity = document.querySelectorAll(".quantity");
let cartAmount = document.querySelector(".cartAmount");
let cart = JSON.parse(localStorage.getItem("data")) || [];

cartAmount.innerHTML = cart.length;

const generateShop = () => {
  let products = "";
  shopData.forEach((item) => {
    products += `
            <div id="product-id-${item.id}" class="item">
             <img width="220" src="${item.image}" alt="">
              <div class="details">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="price-quantity">
                  <h2>${item.price}$</h2>
                  <div class="unit">
                    <div class="addToCart" onclick="addToCart(${item.id})"></div>
                  </div>
                </div>
              </div>
            </div>`;
  });
  shop.innerHTML = products;
};
generateShop();

function addToCart(id) {
  const cartItem = cart.find((item) => item.id === id);

  if (cartItem) {
    cartItem.numberOfUnits++;
    alert("Product quantity updated in Cart");
  } else {
    const item = shopData.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
    alert("Product added to Cart");
  }
  cartAmount.innerHTML = cart.length;
  setLocalStorage();
}

btnCatagorys.forEach((btn) => {
  btn.addEventListener("click", () => {
    const items = btn.getAttribute("data-category");
    const filteredItems = filterItems(items);
    const itemsHTML = filteredItems
      .map((item) => {
        return `
          <div id="product-id-${item.id}" class="item">
               <img width="220" src="${item.image}" alt="">
                <div class="details">
                  <h3>${item.title}</h3>
                  <p>${item.description}</p>
                  <div class="price-quantity">
                    <h2>${item.price}$</h2>
                    <div class="unit">
                      <div class="addToCart" onclick="addToCart(${item.id})"></div>
                    </div>
                  </div>
                </div>
              </div>
          `;
      })
      .join("");
    shop.innerHTML = itemsHTML;
  });
});

const filterItems = (category) => {
  return shopData.filter((item) => item.category === category);
};
