import { renderOrdersHeader } from "./ordersHeader.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getOrder, getProduct, loadProductsFetch } from "../data/products.js";

const url = new URL(window.location.href);
const productId = url.searchParams.get('productId');
const orderId = url.searchParams.get('orderId');

renderOrdersHeader();
renderTrackingPage();

async function renderTrackingPage () {
  await loadProductsFetch();

  let deliveryDate;
  let productName;
  let productImage;
  let productQuantity;
  let deliveryTime;

  getOrder(orderId).products.forEach((product) => {
    if (product.productId === productId) {
      deliveryDate = dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D');
      deliveryTime = dayjs(product.estimatedDeliveryTime);
      productName = getProduct(productId).name;
      productImage = getProduct(productId).image;
      productQuantity = product.quantity;
    }
  });

  const order = getOrder(orderId);

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  let percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
  const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';
  

  const trackingPageHTML = `

    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        ${deliveredMessage} ${deliveryDate}
      </div>

      <div class="product-info">
        ${productName}
      </div>

      <div class="product-info">
        Quantity: ${productQuantity}
      </div>

      <img class="product-image" src="${productImage}">

      <div class="progress-labels-container">
        <div class="progress-label ${ percentProgress < 50 ? 'current-status' : '' }">
          Preparing
        </div>
        <div class="progress-label ${ (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : '' }">
          Shipped
        </div>
        <div class="progress-label ${ percentProgress >= 100 ? 'current-status' : '' }">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${percentProgress}%"></div>
      </div>
    </div>
  `;

  document.querySelector('.js-tracking-page').innerHTML = trackingPageHTML;
}


