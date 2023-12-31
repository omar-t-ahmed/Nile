import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItem, fetchItem } from '../../store/items.js';
import Navigation from '../Navigation/Navigation.jsx';
// import laptop from '../images/dell-laptop(1).webp';
import './ItemShow.css';
import ItemShowCart from '../ItemShowCart/ItemShowCart.jsx';
import Reviews from '../Reviews/Reviews.jsx';
import StarRating from '../Reviews/StarComponents/StarRating.jsx';
import { fetchReviews } from '../../store/reviews.js';

const ItemShow = () => {
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const item = useSelector(getItem(itemId));

    const reviews = useSelector((state) => state?.reviews ? Object.values(state.reviews) : [])
    const reviewCount = reviews.length
    let totalReviewScore = 0;

    reviews.map((review) => {
        totalReviewScore += review.starRating;
    })

    const average = reviewCount > 0 ? (totalReviewScore / reviewCount).toFixed(1) : "0.0";

    useEffect(() => {
        dispatch(fetchItem(itemId));
    }, [dispatch, itemId]);

    useEffect(() => {
        dispatch(fetchReviews(item?.id))
    },[dispatch, item])

    return (
        <>
            <Navigation />
            <div className="item-container">
                <div>
                    <div className="item-category-show">{item?.category}</div>
                    <div className='image-show-container'>
                        <img className="image-show" src={`${item?.photoUrl}`} alt="item-img"></img>
                    </div>
                </div>
                <div className="item-details">
                    <div className="item-name-show">
                        {item?.name}
                        <div className='rating-amt'>
                            <StarRating rating={average}/>
                        </div>
                        
                    </div>
                    <div className="item-price-show">${item?.price}</div>

                    <div className="item-body-show">
                        <p>About This Item:</p>
                        {item?.body?.split('.').map((attribute, index) => (
                            <li className='item-attribute' key={index}>{attribute}</li>
                        ))}
                    </div>
                </div>
                <ItemShowCart item={item}/>
            </div>
                <div className="item-description-show">
                    <h3>Product Description:</h3>
                    <p>{item?.description}</p>
                    </div>
                <div className="item-specifications-show">
                    <h3>Product Information:</h3>
                    <table className="specifications-table">
                        <tbody>
                            {item?.itemSpecifications?.split(';').map((specification, idx) => {
                                const [topic, attribute] = specification.split(':').map(s => s.trim());
                                return (
                                    <tr key={idx}>
                                        <td className="specification-topic">{topic}</td>
                                        <td className="specification-attribute">{attribute}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <Reviews item={item}/>
        </>
    );
};

export default ItemShow;