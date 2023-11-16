import laptop from '../images/dell-laptop(1).webp'
import './ItemPreview.css'

const ItemPreview = ({item}) => {
    return (
        <div className='preview-box'>
            <img className='laptop' src={laptop} alt='laptop'></img>
            <li className='item-name'>{item.name}</li>
            <li className='item-price'>$ {item.price}</li>
        </div>
    )
}

export default ItemPreview