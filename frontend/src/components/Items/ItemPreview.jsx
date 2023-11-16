import laptop from '../images/dell-laptop(1).webp'
import './ItemPreview.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ItemPreview = ({item}) => {
    const history = useHistory()
    const redirectToItemPage = (itemId) => {
        history.push(`/items/${itemId}`);
    };

    return (
        <div onClick={() => redirectToItemPage(item.id)} className='preview-box'>
            <img className='laptop' src={laptop} alt='laptop'></img>
            <ul className='item-name'>{item.name}</ul>
            <ul className='item-price'>$ {item.price}</ul>
        </div>
    )
}

export default ItemPreview