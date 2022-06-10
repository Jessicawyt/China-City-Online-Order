import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../features/cartSlice';

const Dish = ({ name, price }) => {
  const [qty, setQty] = useState(0);

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    for (var i = 0; i < cartItems.length; i++) {
      if (name === cartItems[i].name) {
        setQty(cartItems[i].qty);
      }
    }
    return () => {};
  }, []);

  const handleAddItem = () => {
    setQty((prev) => prev + 1);
    dispatch(addItem({ name, price, qty: 1 }));
  };

  const handleRemoveItem = () => {
    if (qty >= 1) {
      setQty((prev) => prev - 1);
      dispatch(removeItem({ name, price, qty: 1 }));
    }
  };

  return (
    <>
      <section className="dish-container">
        <p>{name}</p>
        <h4>{price}</h4>
        <div>
          <button onClick={handleRemoveItem}>-</button>
          {qty === 0 ? <span>0</span> : <span>{qty}</span>}
          <button onClick={handleAddItem}>+</button>
        </div>
      </section>
    </>
  );
};

export default Dish;
