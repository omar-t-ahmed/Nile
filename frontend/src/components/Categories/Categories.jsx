import './Categories.css'
import { updateCategory } from '../../store/items'
import { useDispatch } from 'react-redux'

let categories = ['Electronics', 'Home and Kitchen', 'Toys and Games', 'Books']
// categories
const Categories = () => {
    const dispatch = useDispatch()
    
    return (
        <div className='all-categories'>
            {categories.map((category) => {
                return (
                <div onClick={() => {dispatch(updateCategory(category))}} className='category-clickable'>
                    <p className='category-name'>{category}</p>
                </div>
                )
            })}
        </div>
        )
}

export default Categories