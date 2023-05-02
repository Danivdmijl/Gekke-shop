const addToCartButtons = document.querySelectorAll('.product button');
const cartList = document.querySelector('#cart ul');
const cartTotal = document.querySelector('#cart p');
const checkoutButton = document.querySelector('#cart button');

let total = 0;

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = button.parentElement;
    const productName = product.querySelector('h3').textContent;
    const productPrice = product.querySelector('p').textContent;
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `<span>${productName}</span><span>${productPrice}</span><button>Remove</button>`;
    cartList.appendChild(cartItem);
    total += parseFloat(productPrice.slice(1));
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    checkoutButton.disabled = false;
  });
});

cartList.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    const cartItem = event.target.parentElement;
    const productPrice = cartItem.querySelector('span:last-of-type').textContent;
    total -= parseFloat(productPrice.slice(1));
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartItem.remove();
    if (cartList.children.length === 0) {
      checkoutButton.disabled = true;
    }
  }
});

checkoutButton.addEventListener('click', () => {
  alert(`Thank you for your purchase! Your total is $${total.toFixed(2)}.`);
  cartList.innerHTML = '';
  cartTotal.textContent = 'Total: $0.00';
  checkoutButton.disabled = true;
  total = 0;
});
