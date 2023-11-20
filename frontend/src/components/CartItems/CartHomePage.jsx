import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../../store/cart_items';
import Checkout from './Checkout';
import CartItemPreview from './CartItemPreview';
import Navigation from '../Navigation/Navigation';
import './CartHomePage.css';

const CartHomePage = () => {
  const dispatch = useDispatch();
  const cart_items = useSelector((state) => state?.cart_items ? Object.values(state.cart_items) : []);

  useEffect(() => {
    debugger
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <div className='cart-items-homepage'>
      <Navigation />
      <div className='cart-content'>
        <div className='all-cart-items'>
          {cart_items?.length > 0 ? <h2>Shopping Cart</h2> : <h2>Your Nile Cart is empty.</h2>}
          {cart_items?.map((cart_item) => {
            return <CartItemPreview cart_item={cart_item} key={cart_item.id} />;
          })}
        </div>
        <div className='checkout-container'>
          <Checkout />
        </div>
      </div>
    </div>
  );
};

export default CartHomePage;