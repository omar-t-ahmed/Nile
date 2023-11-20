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
            <div className='item-preview-image'>
                {/* <img className='laptop' src={laptop} alt='laptop'></img> */}
                <img className="image-preview" src={`${item?.photoUrl}`} alt="laptop"></img>
            </div>
            <ul className='item-name'>{item.name}</ul>
            <ul className='item-price'><sup className='dollar-sign'>$</sup> {item.price}</ul>
        </div>
    )
}

export default ItemPreview