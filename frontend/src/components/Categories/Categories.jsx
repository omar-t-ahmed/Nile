import './Categories.css'

let categories = ['Electronics', 'Home and Kitchen', 'Toys and Games', 'Books']

const Categories = () => {

    return (
        <div className='all-categories'>
            {categories.map((category) => {
                return (
                <div className='category-clickable'>
                    <p className='category-name'>{category}</p>
                </div>
                )
            })}
        </div>
        )
}

export default Categories