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

    const reviews = item?.reviews
    const reviewCount = item?.reviews?.length
    let totalReviewScore = 0;

    reviews?.map((review) => {
        totalReviewScore += review.star_rating;
    })

    const average = reviewCount > 0 ? (totalReviewScore / reviewCount).toFixed(1) : "0.0";

    const divPrice = item?.price?.toString().split('.')


    return (
        <div onClick={() => redirectToItemPage(item.id)} className='preview-box'>
            <div className='item-preview-image'>
                {/* <img className='laptop' src={laptop} alt='laptop'></img> */}
                <img className="image-preview" src={`${item?.photoUrl}`} alt="laptop"></img>
            </div>
            <ul className='item-name'>{item.name}</ul>
            <div className='rating-amt-preview'>
                    <StarRating rating={average}/> {reviewCount}
            </div>
            <ul className='item-price'><span className='dollar-sign'>$</span> {divPrice[0]}<span className='decimal-price'>{divPrice[1]}</span></ul>
        </div>
    )
}

export default ItemPreview