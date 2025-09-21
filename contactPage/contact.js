function loadCart() {
      const cartContainer = document.getElementById('cartContainer');
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

      if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="empty">Your cart is empty.</div>';
        return;
      }

      let total = 0;
      let cartHTML = '';

      cart.forEach((item, index) => {
      

        cartHTML += `
          <div class="cart-item">
            <div>
              <div class="cart-title">${item.title}</div>
              
            </div>
            <button onclick="removeItem(${index})">Remove</button>
          </div>
        `;
      });

     
      cartHTML += `
        <div class="actions">
          <button class="clear" onclick="clearCart()">Clear Cart</button>
        </div>
      `;

      cartContainer.innerHTML = cartHTML;
    }

function removeItem(index) {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    sessionStorage.removeItem('cart');
    loadCart();
}

function checkout() {
    alert('Checkout functionality not implemented.\nBut your cart total is stored!');
    // In real-world: redirect to payment page or backend API
}

document.addEventListener('DOMContentLoaded', loadCart);

document.addEventListener("DOMContentLoaded", function () {
    flatpickr("#travelDate", {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d"
    });
});
