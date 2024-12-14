// script.js
document.addEventListener('DOMContentLoaded', () => {
          const cart = [];
          const products = document.querySelectorAll('.product');
          const cartItems = document.querySelector('.cart-items');
          const cartTotal = document.getElementById('cart-total');
          const checkoutButton = document.querySelector('.checkout');
          const paymentMethods = document.querySelector('.payment-methods');
          const finalizePaymentButton = document.querySelector('.finalize-payment');
          const searchButton = document.getElementById('search-button');
          const searchInput = document.getElementById('search-input');

          products.forEach(product => {
                    product.querySelector('.add-to-cart').addEventListener('click', () => {
                              const id = product.getAttribute('data-id');
                              const name = product.getAttribute('data-name');
                              const price = parseFloat(product.getAttribute('data-price'));
                              const quantity = parseInt(product.querySelector('.quantity').value);

                              addToCart(id, name, price, quantity);
                    });

                    product.querySelector('.quantity').addEventListener('input', (event) => {
                              const price = parseFloat(product.getAttribute('data-price'));
                              const quantity = parseInt(event.target.value);
                              const totalPriceElement = product.querySelector('.total-price');
                              totalPriceElement.textContent = (price * quantity).toFixed(2);
                    });
          });

          function addToCart(id, name, price, quantity) {
                    const product = cart.find(item => item.id === id);

                    if (product) {
                              product.quantity += quantity;
                    } else {
                              cart.push({ id, name, price, quantity });
                    }

                    updateCart();
          }

          function updateCart() {
                    cartItems.innerHTML = '';
                    let total = 0;

                    cart.forEach(item => {
                              total += item.price * item.quantity;

                              const cartItem = document.createElement('div');
                              cartItem.className = 'cart-item';
                              cartItem.innerHTML = `
                <p>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
            `;

                              cartItems.appendChild(cartItem);
                    });

                    cartTotal.textContent = total.toFixed(2);
          }

          checkoutButton.addEventListener('click', () => {
                    document.querySelector('.cart').style.display = 'none';
                    paymentMethods.style.display = 'block';
          });

          finalizePaymentButton.addEventListener('click', () => {
                    alert(`Thank you for your purchase! Your total is $${cartTotal.textContent}`);
          });

          searchButton.addEventListener('click', () => {
                    const query = searchInput.value.toLowerCase();
                    products.forEach(product => {
                              const productName = product.getAttribute('data-name').toLowerCase();
                              if (productName.includes(query)) {
                                        product.style.display = 'block';
                              } else {
                                        product.style.display = 'none';
                              }
                    });
          });
});
