import { useSelector } from "react-redux/es/hooks/useSelector"
import { getItem, fetchItem } from "../../store/items"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const CartItemPreview = ({cart_item}) => {
    const dispatch = useDispatch()
    const item = useSelector(getItem(cart_item.id))
    console.log(item)

    useEffect(() => {
        dispatch(fetchItem(cart_item.id));
    }, [dispatch, cart_item.id]);

    return (
        <li>
            <ul>
                Name: {item?.name}
            </ul>
            <ul>
                Price: {item?.price}
            </ul>
            <ul>
                Quantity: {cart_item.quantity}
            </ul>
        </li>
    )
}

export default CartItemPreview