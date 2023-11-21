import { useSelector } from 'react-redux';
import { fetchItems } from '../../store/items';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { deleteAllCartItems } from '../../store/cart_items';
import './Checkout.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Checkout = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const cart_items = useSelector((state) => state?.cart_items ? Object.values(state.cart_items) : []);
    const checkedItems = cart_items.filter(item => item?.isChecked);
    const items = useSelector((state) => {return state?.items ? state.items : []})
    
    useEffect(() => {
        dispatch(fetchItems())
    }, [dispatch])

    const subtotal = checkedItems.reduce((acc, cart_item) => {
        const itemPrice = items[cart_item.itemId].price || 0
        return acc + cart_item.quantity * itemPrice;
    }, 0);

    const numItems = checkedItems.reduce((acc, cart_item) => {
        return acc + cart_item.quantity
    }, 0)

    const sendToShip = () => {
        dispatch(deleteAllCartItems(checkedItems))
        
        history.push('/cart/shipping')
    }

    return (
        <div className='checkout'>
        <h2>Subtotal ({numItems} items): ${subtotal.toFixed(2)}</h2>
        <button className='submit-button' onClick={sendToShip}>Proceed to Checkout</button>
        </div>
    );
};

export default Checkout;