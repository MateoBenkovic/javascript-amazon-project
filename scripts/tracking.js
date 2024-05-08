import { renderOrdersHeader } from "./ordersHeader.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getOrder, getProduct, loadProductsFetch } from "../data/products.js";

const url = new URL(window.location.href);
const productId = url.searchParams.get('productId');
const orderId = url.searchParams.get('orderId');

renderOrdersHeader();
renderTrackingPage();
await loadProductsFetch();
console.log(getOrder(orderId));
console.log(getProduct(productId));

const orderTime = dayjs().set('month', 5).set('date', 7);
const currentTime = dayjs().subtract(orderTime);
const deliveryTime = dayjs().set('month', 5).set('date', 14)

console.log(

  (currentTime)

);

async function renderTrackingPage () {
  await loadProductsFetch();
  let deliveryDate;
  let productName;
  let productImage;
  let productQuantity;
  getOrder(orderId).products.forEach((product) => {
    if (product.productId === productId) {
      deliveryDate = dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D');
      productName = getProduct(productId).name;
      productImage = getProduct(productId).image;
      productQuantity = product.quantity;
    }
  });


  const trackingPageHTML = `

    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${deliveryDate}
      </div>

      <div class="product-info">
        ${productName}
      </div>

      <div class="product-info">
        Quantity: ${productQuantity}
      </div>

      <img class="product-image" src="${productImage}">

      <div class="progress-labels-container">
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-label current-status">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    </div>
  `;

  document.querySelector('.js-tracking-page').innerHTML = trackingPageHTML;
}


