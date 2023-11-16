import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, fetchItems } from '../../store/items.js';
import ItemPreview from './ItemPreview';
import './ItemIndex.css'

const ItemIndex = () => {
    const dispatch = useDispatch()
    const items = useSelector(getItems)
    
    useEffect(() => {
        dispatch(fetchItems())
    }, [dispatch])
    
    return (
        <>
            <div className='all-items'>
            {items.map((item) => {
                return <ItemPreview item={item} key={item.id}/>
            })}
            </div>
        </>
    )
}

export default ItemIndex