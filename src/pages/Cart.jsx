import { useSelector } from 'react-redux';

const Cart = () => {
  const { itemCount, cartItems } = useSelector((state) => state.cart);

  // Calculate the total
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].price * cartItems[i].qty;
  }
  console.log(cartItems);

  return (
    <div className="cart-page">
      <section className="cart-header">
        <h3>My Cart</h3>
      </section>
      <div className="cart-main">
        <section className="cart-list">
          {cartItems.length > 0 &&
            cartItems.map((i) => (
              <div className="cart-list-item" key={i.name}>
                {<span>{i.name}</span>}
                {<span>x</span>}
                {<span>{i.qty}</span>}
              </div>
            ))}
        </section>
        <section className="cart-bottom">
          <p className="cart-item-count">{itemCount} Items</p>
          <div className="cart-total">
            <p>Total</p>
            <p>{total}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;
