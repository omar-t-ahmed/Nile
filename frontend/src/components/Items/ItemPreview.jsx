import laptop from '../images/dell-laptop(1).webp'
import './ItemPreview.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import StarRating from '../Reviews/StarComponents/StarRating';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import { fetchReviews } from '../../store/reviews';

const ItemPreview = ({item}) => {
    const history = useHistory()
    const redirectToItemPage = (itemId) => {
        history.push(`/items/${itemId}`);
    };

    const dispatch = useDispatch();

    const reviews = useSelector((state) => state?.reviews ? Object.values(state.reviews) : [])
    const reviewCount = reviews.length
    let totalReviewScore = 0;

    reviews.map((review) => {
        totalReviewScore += review.starRating;
    })

    const average = reviewCount > 0 ? (totalReviewScore / reviewCount).toFixed(1) : "0.0";

    useEffect(() => {
        dispatch(fetchReviews(item?.id))
    },[dispatch, item])


    return (
        <div onClick={() => redirectToItemPage(item.id)} className='preview-box'>
            <div className='item-preview-image'>
                {/* <img className='laptop' src={laptop} alt='laptop'></img> */}
                <img className="image-preview" src={`${item?.photoUrl}`} alt="laptop"></img>
            </div>
            <ul className='item-name'>{item.name}</ul>
            <div className='rating-amt-preview'>
                    {average} <StarRating rating={average}/>
            </div>
            <ul className='item-price'><span className='dollar-sign'>$</span> {item.price}</ul>
        </div>
    )
}

export default ItemPreview