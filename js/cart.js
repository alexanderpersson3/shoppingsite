let shoppingCart = document.getElementById("shopping-cart");

cart = JSON.parse(localStorage.getItem("data") || []);

const generateCartItems = () => {
  shoppingCart.innerHTML = "";
  cart
    .map((item) => {
      shoppingCart.innerHTML += `<div class="cart-item">
   <img width="100" src=${item.image} alt="" />
   <div class="details">
   <div class="title-price-x">
   <h4 class="title-price">
   <p>${item.title}</p>
   <p class="cart-item-price"> ${item.price}$</p>
   </h4>
   <i class="remove" onclick="removeItem(${item.id})">❌</i>
   </div>
   <div class="cart-buttons">
   <div class="buttons">
   <p>In Stock: (${item.instock})</p>
         <i class="minus" onclick="changeNumOfUnits('minus', ${item.id})">➖</i>
           <div class="quantity">${item.numberOfUnits}</div>
           <i class="plus" onclick="changeNumOfUnits('plus', ${item.id})">➕</i>
       </div>
       </div>
       <h3> ${item.numberOfUnits * item.price}$</h3>
   </div>
   </div>`;
    })
    .join("");
};
updateCart();

function changeNumOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && item.instock > numberOfUnits) {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });
  updateCart();
}

// function to update the cart.
function updateCart() {
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(cart));
  cartAmount.innerHTML = cart.length;
}
// remove product func
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}
