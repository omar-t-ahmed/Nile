import { useDispatch } from "react-redux";
import { fetchReviews } from "../../store/reviews";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import ReviewShow from "./ReviewShow"
import './Reviews.css'
import StarRating from "./StarComponents/StarRating";
import { useState } from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from "react-router-dom/cjs/react-router-dom";

const Reviews = ({item}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => state?.reviews ? Object.values(state.reviews) : [])
    const reviewCount = reviews.length
    let totalReviewScore = 0;
    const { itemId } = useParams();

    const amtRatings = [0,0,0,0,0]

    reviews.map((review) => {
        totalReviewScore += review.starRating;
        amtRatings[review.starRating - 1] += 1
    })

    const average = reviewCount > 0 ? (totalReviewScore / reviewCount).toFixed(1) : "0.0";

    const allRatings = reviewCount > 0 ? amtRatings.map((rating) => (rating / reviewCount * 100).toFixed(0)) : [0, 0, 0, 0, 0];

    useEffect(() => {
        dispatch(fetchReviews(item?.id))
    },[dispatch, item])


    const handleNewReview = () => {
        history.push(`/items/${itemId}/review`)
    }

    return (
        <div className="reviews">
            <div className="add-review-container">
                <h3>Customer Reviews</h3>
                <div className="all-review-stars"> <StarRating rating={average} /> {average} out of 5 </div>
                <div className="all-review-amt">{reviewCount} global ratings</div>
                <div className="all-review-breakdown">
                            <div className="ratings-chart-column">
                                <p className='star-amt-graph'>5 star</p>
                                <div className="ratings-chart-column-graph">
                                    <div className={allRatings[4] > 0 ? 'ratings-chart-column-graph-results' : 'ratings-chart-column-graph-results-none'} style={{ width: allRatings[4] * 2 + 'px' }}></div>
                                </div>
                                    <p className="ratings-chart-column-percent">{allRatings[4]}%</p>
                            </div>
                            <div className="ratings-chart-column">
                                <p className='star-amt-graph'>4 star</p>
                                <div className="ratings-chart-column-graph">
                                    <div className={allRatings[3] > 0 ? 'ratings-chart-column-graph-results' : 'ratings-chart-column-graph-results-none'} style={{ width: allRatings[3] * 2 + 'px' }}></div>
                                </div>
                                    <p className="ratings-chart-column-percent">{allRatings[3]}%</p>
                            </div>
                            <div className="ratings-chart-column">
                                <p className='star-amt-graph'>3 star</p>
                                <div className="ratings-chart-column-graph">
                                    <div className={allRatings[2] > 0 ? 'ratings-chart-column-graph-results' : 'ratings-chart-column-graph-results-none'} style={{ width: allRatings[2] * 2 + 'px' }}></div>
                                </div>
                                    <p className="ratings-chart-column-percent">{allRatings[2]}%</p>
                            </div>
                            <div className="ratings-chart-column">
                                <p className='star-amt-graph'>2 star</p>
                                <div className="ratings-chart-column-graph">
                                    <div className={allRatings[1] > 0 ? 'ratings-chart-column-graph-results' : 'ratings-chart-column-graph-results-none'} style={{ width: allRatings[1] * 2 + 'px' }}></div>
                                </div>
                                    <p className="ratings-chart-column-percent">{allRatings[1]}%</p>
                            </div>
                            <div className="ratings-chart-column">
                                <p className='star-amt-graph'>1 star</p>
                                <div className="ratings-chart-column-graph">
                                    <div className={allRatings[0] > 0 ? 'ratings-chart-column-graph-results' : 'ratings-chart-column-graph-results-none'} style={{ width: allRatings[0] * 2 + 'px' }}></div>
                                </div>
                                    <p className="ratings-chart-column-percent"> {allRatings[0]}%</p>
                            </div>
                            <div className="leave-review-container">
                                <h3>Review this product</h3>
                                <p>Share your thoughts with other customers</p>
                                <button className='redirect-review-new' onClick={handleNewReview}>Write a customer review</button>
                            </div>
                </div>

            </div>
            <div className="all-reviews-container">
                {reviews.map((review) => (<ReviewShow review={review} key={review.id}/>))}
            </div>
        </div>
    );
}

export default Reviews