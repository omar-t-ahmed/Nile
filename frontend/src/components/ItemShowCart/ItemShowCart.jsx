import './ItemShowCart.css'
import { useState } from 'react';

function addDays(currDate, days) {
    return new Date(currDate.getTime() + days*24*60*60*1000);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const days = getRandomInt(5)

const ItemShowCart = ({item}) => {

    const givenDate = addDays(new Date(), days)

    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };

    const dateFormatter = new Intl.DateTimeFormat('en-US', options);

    const formattedDate = dateFormatter.format(givenDate);

    const [quantity, setQuantity] = useState(1);

    const handleChange = (e) => {
        setQuantity(e.target.value);
    };

    return (
        <div className='item-show-cart-container'>
            <h3>${item?.price}</h3>
                <p>FREE delivery <span className='bold-text'>{formattedDate}</span> on orders shipped by Nile over $35.</p>
                <p>Or fastest delivery <span className='bold-text'>Tomorrow, November 15.</span> Order within <span className='green-text'>5 hrs 16 mins</span></p>
                <span className='in-stock'>In Stock</span>

                <div className='quantity'>
                    <select id='quantity' val={quantity} onChange={handleChange}>
                        {[...Array(10).keys()].map((val) => (
                        <option val={val + 1}>
                                Qty: {val + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='center-buttons'>
                    <button className='add-to-cart'>Add to Cart</button>
                    <button className='buy-now'>Buy Now</button>
                </div>
        </div>
    )
}

export default ItemShowCart