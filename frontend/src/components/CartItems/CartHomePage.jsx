import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../../store/cart_items';
import Checkout from './Checkout';
import CartItemPreview from './CartItemPreview';
import Navigation from '../Navigation/Navigation';
import './CartHomePage.css';
import { selectAllCartItems } from "../../store/cart_items";

const CartHomePage = () => {
  const dispatch = useDispatch();
  const cart_items = useSelector((state) => state?.cart_items ? Object.values(state.cart_items) : []);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleSelectAll = () => {
    const cartItemIds = cart_items.map((item) => item.id);
    dispatch(selectAllCartItems(cartItemIds));
  }

  const selectAllButtonText = cart_items.every((item) => item.isChecked) ? 'Deselect all items' : 'Select all items';

  return (
    cart_items?.length <= 1 ? (
    <div className='cart-items-homepage-1'>
      <Navigation />
      <div className='cart-content'>
        <div className='all-cart-items'>
          {cart_items?.length > 0 ? 
          <div className='cart-header'>
            <h2 className='shopping-cart-text'>Shopping Cart</h2>
              <button className='select-all' onClick={handleSelectAll}>{selectAllButtonText}</button>
          </div> : 
          <h2>Your Nile Cart is empty.</h2>
          }
          {cart_items?.map((cart_item) => {
            return <CartItemPreview cart_item={cart_item} key={cart_item.id} />;
          })}
        </div>
        <div className='checkout-container'>
          <Checkout />
        </div>
      </div>
    </div>) :
    (
      <div className='cart-items-homepage-2'>
      <Navigation />
      <div className='cart-content'>
        <div className='all-cart-items'>
          {cart_items?.length > 0 ? 
          <div className='cart-header'>
            <h2 className='shopping-cart-text'>Shopping Cart</h2>
              <button className='select-all' onClick={handleSelectAll}>{selectAllButtonText}</button>
          </div> : 
          <h2>Your Nile Cart is empty.</h2>
          }
          {cart_items?.map((cart_item) => {
            return <CartItemPreview cart_item={cart_item} key={cart_item.id} />;
          })}
        </div>
        <div className='checkout-container'>
          <Checkout />
        </div>
      </div>
    </div>)
    );
};

export default CartHomePage;