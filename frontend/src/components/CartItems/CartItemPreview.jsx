import { useSelector } from "react-redux/es/hooks/useSelector";
import { getItem, fetchItem } from "../../store/items";
import { fetchCartItems, deleteCartItem, toggleCartItem, createCartItem } from "../../store/cart_items";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import laptop from '../images/dell-laptop(1).webp';
import './CartItemPreview.css';

const CartItemPreview = ({ cart_item }) => {
    const dispatch = useDispatch();
    const item = useSelector(getItem(cart_item.itemId));
    const isChecked = useSelector(state => state.cart_items[cart_item.id]?.isChecked);
    const [quantity, setQuantity] = useState(cart_item.quantity);
    // const user = useSelector((state) => state.session.currentUser)

    // debugger
    useEffect(() => {
        dispatch(fetchItem(cart_item.itemId));
    }, [dispatch, cart_item.itemId]);

    const handleCheckboxChange = () => {
        dispatch(toggleCartItem(cart_item.id));
    };

    const handleDelete = () => {
        dispatch(deleteCartItem(cart_item.id))
            .then(() => dispatch(fetchCartItems()))
    };

    const handleChange = (e) => {
        setQuantity(e.target.value);
        // const cart_item = {
        //     userId: user.id,
        //     itemId: item.id,
        //     quantity: quantity
        // }
        
        // dispatch(createCartItem(cart_item))
    };

    return (
        <div className="item-preview-container">
        <input
            type="checkbox"
            className="cart-item-checkbox"
            checked={isChecked || false}
            onChange={handleCheckboxChange}
        />
        <div className="left-section">
            <img className="laptop-image" src={`${item?.photoUrl}`} alt="laptop"></img>
            {/* <img className="cart-image" src={laptop} alt="laptop" /> */}
        </div>
        <div className="center-section">
            <div className="cart-item-name">{item?.name}</div>
            <div className="cart-item-details">
                
            <div className="quantity-section">
                Qty: <input
                            type="number"
                            value={quantity}
                            onChange={handleChange}
                            className="quantity-input"
                        />
            </div>
            <button onClick={handleDelete} className="delete-link">Delete</button>
            </div>
        </div>
        <div className="right-section">
            <div className="cart-item-price">{`$${item?.price}`}</div>
        </div>
        </div>
    );
};

export default CartItemPreview;