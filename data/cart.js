export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')); 

if (!cart) {
  cart = [];
}

}


export function addToCart(productId) {
  let matchingItem = '';
    
    let quantityString = document.querySelector(`.js-quantity-selector-${productId}`).value;

    let quantity = Number(quantityString);
    
    if (cart) {
      cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
      });
    }
    

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
    }

    saveToStorage();
  }

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

export function removeFromCart (productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  if (!cart) {
    return cartQuantity;
  } else {
    cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  }); 
  return cartQuantity;
  }
  
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      cartItem.quantity = newQuantity;
    }
  }); saveToStorage();
}

export function updateDeliveryOption (productId, deliveryOptionId) {
  let matchingItem = '';
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'http://supersimplebackend.dev/cart');
  xhr.send();

}

export async function loadCartFetch() {
  const response = await fetch('http://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
  return text;
}