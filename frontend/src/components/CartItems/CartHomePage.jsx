import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../../store/cart_items';
import CartItemPreview from './CartItemPreview'
import Navigation from '../Navigation/Navigation';

const CartHomePage = () => {
    const dispatch = useDispatch()
    const cart_items = useSelector((state) => state?.cart_items ? Object.values(state.cart_items) : []);
    console.log(cart_items)

    useEffect(() => {
        dispatch(fetchCartItems())
    }, [dispatch])

    return (
        <>
        <Navigation/>
        <div className='all-cart-items'>
            {cart_items.map((cart_item) => {
                return <CartItemPreview cart_item={cart_item} key={cart_item.id} />
            })}
            </div>
        </>
    )
}

export default CartHomePage