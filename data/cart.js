export const cart = [];

export function addToCart(productId) {
  let matchingItem = '';

    let quantityString = document.querySelector(`.js-quantity-selector-${productId}`).value;

    let quantity = Number(quantityString);


    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
      productId,
      quantity
    });
    }
}