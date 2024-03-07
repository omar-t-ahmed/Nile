import { useDispatch } from 'react-redux';
import { createCartItem } from '../../store/cart_items';
import './ItemShowCart.css'
import { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export const addDays = (currDate, days) => {
    return new Date(currDate.getTime() + days*24*60*60*1000);
}

const ItemShowCart = ({item}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.currentUser)

    const days = (item?.id) % 2 === 0 ? 2 : 3

    const givenDate = addDays(new Date(), days)

    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };

    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = dateFormatter.format(givenDate);
    
    const closestDate = addDays(new Date(), 1)

    const optionsShip = {
        month: 'long',
        day: 'numeric'
    };

    const dateFormatterShip = new Intl.DateTimeFormat('en-US', optionsShip);

    const closestShipping = dateFormatterShip.format(closestDate);

    const [quantity, setQuantity] = useState(1);

    const handleChange = (e) => {
        setQuantity(e.target.value);
    };

    const addCartItem = () => {
        if (user) {
        const cart_item = {
            userId: user.id,
            itemId: item.id,
            quantity: quantity
        }
        
        dispatch(createCartItem(cart_item))
            .then(history.push(`/items/${item?.id}/addedtocart`))

        } else {
            history.push('/login')
        }
    }

    const addCartItemRedirect = () => {
        if (user) {
        const cart_item = {
            userId: user.id,
            itemId: item.id,
            quantity: quantity
        }

        dispatch(createCartItem(cart_item))
            .then(history.push('/cart'))
            
        } else {
            history.push('/login')
        }
    }

    const RemainingTime = () => {
        const now = new Date()
        const targetTime = new Date(now)
        targetTime.setHours(22, 0, 0, 0)
    
        let remainingTime = targetTime - now;
    
        const hours = Math.floor(remainingTime / (1000 * 60 * 60))
        remainingTime %= 1000 * 60 * 60;
        const minutes = Math.floor(remainingTime / (1000 * 60))
    
        return `${hours} hrs ${minutes} mins`
    }

    return (
        <div className='item-show-cart-container'>
            <h3>${item?.price}</h3>
                <p>FREE delivery <span className='bold-text'>{formattedDate}</span> on orders shipped by Nile over $35.</p>
                <p>Or fastest delivery <span className='bold-text'>Tomorrow, {closestShipping}</span> Order within <span className='green-text'>{RemainingTime()}</span></p>
                <span className='in-stock'>In Stock</span>

                <div className='quantity'>
                    <select id='quantity' val={quantity} onChange={handleChange}>
                        {[...Array(10).keys()].map((val) => (
                        <option value={val + 1} key={val + 1}>
                                Qty: {val + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='center-buttons'>
                    <button className='add-to-cart' onClick={addCartItem}>Add to Cart</button>
                    <button className='buy-now' onClick={addCartItemRedirect}>Buy Now</button>
                </div>
        </div>
    )
}

export default ItemShowCart