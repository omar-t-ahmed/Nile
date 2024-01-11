import { useSelector } from "react-redux/es/hooks/useSelector";
import { getItem, fetchItem } from "../../store/items";
import { fetchCartItems, deleteCartItem, toggleCartItem, updateCartItem } from "../../store/cart_items";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import './CartItemPreview.css';

const CartItemPreview = ({ cart_item }) => {
    const dispatch = useDispatch();
    const item = useSelector(getItem(cart_item?.itemId));
    const isChecked = useSelector((state) => state.cart_items[cart_item.id]?.isChecked);
    const [quantity, setQuantity] = useState(cart_item?.quantity);
    const [isUpdateVisible, setUpdateVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchItem(cart_item.itemId));
    }, [dispatch, cart_item.itemId]);

    const handleCheckboxChange = () => {
        dispatch(toggleCartItem(cart_item.id));
    };

    const handleDelete = () => {
        dispatch(deleteCartItem(cart_item.id)).then(() => dispatch(fetchCartItems()));
    };

    const handleChange = (e) => {
        setQuantity(e.target.value);
        const newQuantity = parseInt(e.target.value, 10);
        if (isNaN(newQuantity) || newQuantity < 1) {
            setQuantity(1);
        } else {
            setQuantity(newQuantity);
        }
        setUpdateVisible(true);
    };

    const handleUpdate = () => {
        const updatedCartItem = {
            id: cart_item.id,
            userId: cart_item.userId,
            itemId: cart_item.itemId,
            quantity: quantity,
        };

        dispatch(updateCartItem(updatedCartItem))
        setUpdateVisible(false);
    };

    return (
        <div className='item-preview-container'>
            <div>
                <input
                    type='checkbox'
                    className='cart-item-checkbox'
                    checked={isChecked || false}
                    onChange={handleCheckboxChange}
                />
            </div>
            <div className='left-section'>
                <div className='cart-item-image-container'>
                    <img className="cart-item-image" src={`${item?.photoUrl}`} alt=""></img>
                </div>
                {/* <img className="cart-image" src={laptop} alt="laptop" /> */}
            </div>
            <div className='center-section'>
                <div className='cart-item-name'>{item?.name}</div>
                <div className='cart-item-details'>
                    <div className='quantity-section'>
                        Qty:{' '}
                        <input
                            type='number'
                            value={quantity}
                            onChange={handleChange}
                            className='quantity-input'
                        />
                        {isUpdateVisible && (
                            <button className='update-qty' onClick={handleUpdate}>
                                Update
                            </button>
                        )}
                    </div>
                    <button onClick={handleDelete} className='delete-link'>
                        Delete
                    </button>
                </div>
            </div>
            <div className='right-section'>
                <div className="cart-item-price">{`$${item?.price}`}</div>
            </div>
        </div>
    );
};

export default CartItemPreview;