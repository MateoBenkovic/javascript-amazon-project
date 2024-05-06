import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from './utils/money.js';
import { getProduct, products, loadProductsFetch } from "../data/products.js";
import { cart, saveToStorage } from "../data/cart.js";
import { renderOrdersHeader } from "./ordersHeader.js";

await loadProductsFetch();

function renderOrders() {
  let ordersHTML = '';

  orders.forEach((order) => {
    ordersHTML += `
    <div class="order-container">
          
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${dayjs(order.orderTime).format('MMMM D')}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${formatCurrency(order.totalCostCents)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${order.id}</div>
      </div>
    </div>
    <div class="order-details-grid">
    `;
    
      order.products.forEach((item) => {
        
        ordersHTML += `
        
      <div class="product-image-container">
        <img src="${getProduct(item.productId).image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${getProduct(item.productId).name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${dayjs(item.estimatedDeliveryTime).format('MMMM D')}
        </div>
        <div class="product-quantity">
          Quantity: ${item.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message js-buy-again" 
          data-product-id="${item.productId}">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    
    `;
  });
  ordersHTML += `
    </div>
  </div>
  `;
  });

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      let matchingItem;

      if (cart) {
        cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      }
      
  
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
        productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
      }
  
      saveToStorage();
      renderOrdersHeader();
    });
});

}
  
renderOrdersHeader();
renderOrders();




