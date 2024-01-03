import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItem, fetchItem } from '../../store/items.js';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min.js';
import greenCheck from '../images/Eo_circle_green_checkmark.svg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';
import './AddedToCart.css'
import Navigation from '../Navigation/Navigation.jsx';

const AddedToCart = () => {
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const item = useSelector(getItem(itemId));
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchItem(itemId));
    }, [dispatch, itemId]);

    const RedirectCart = () => {
        history.push('/cart')
    }

    return (
        <>
        <Navigation/>
        <div className='added-to-cart-background'>
            <div className='added-to-cart-container'>
                <div className='added-to-cart-item'>
                    <img className="image-show-added-to-cart" src={`${item?.photoUrl}`} alt="item-img"></img>
                    <h2><img className='green-check' src={greenCheck} alt='green check'></img>Added to Cart</h2>
                </div>
            <div className='go-to-cart-button-container'>
                <button className='go-to-cart-button' onClick={RedirectCart}>Go To Cart</button>
            </div>
            </div>
        </div>
        </>
    )
}

export default AddedToCart