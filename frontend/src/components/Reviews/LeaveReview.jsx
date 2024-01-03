import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getItem, fetchItem } from '../../store/items.js';
import Navigation from "../Navigation/Navigation";
import { useEffect } from "react";
import { useState } from "react";
import { addReview } from "../../store/reviews.js";
import InteractiveStarRating from './StarComponents/InteractiveStarRating.jsx'
import './LeaveReview.css'

const LeaveReview = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const item = useSelector(getItem(itemId));
    const user = useSelector((state) => state.session.currentUser);
    const [review, setReview] = useState({
        star_rating: 1,
        header: "",
        body: "",
        item_id: parseInt(itemId),
        user_id: user.id
    });
    const [isEmpty, setIsEmpty] = useState(false)

    const handleReviewChange = (e) => {
        setReview({
            ...review,
            [e.target.name]:
                e.target.name === 'star_rating'
                    ? parseInt(e.target.value, 10)
                    : e.target.value,
        });
    };

    const handleAddReview = async () => {
        if (review.header === '' || review.body === '') {
            setIsEmpty(true)
            return
        }
        try {
            await dispatch(addReview(review));
            history.push(`/items/${itemId}`);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        dispatch(fetchItem(itemId));
    }, [dispatch, itemId]);

    // debugger

    return (
        <>
            <Navigation />
            <div className="leave-review-container">
                <h2>Create Review</h2>
                <div className='review-item-img-container' onClick={() => {history.push(`/items/${itemId}`)}}>
                    <img className="review-item-img" src={`${item?.photoUrl}`} alt="item-img" />
                    <p>{item?.name}</p>
                </div>
                <div className='add-review'>
                        <div className='input-container'>
                            <h3>Overall Rating</h3>
                        <InteractiveStarRating
                            initialRating={review.star_rating}
                            onChange={(newRating) => setReview({ ...review, star_rating: newRating })}
                        />
                        </div>
                        <div className='input-container'>
                            <h3>Add a headline</h3>
                            <input
                                className='review-headline-input'
                                value={review.header}
                                onChange={handleReviewChange}
                                placeholder="Whats most important to know?"
                                name="header"
                            />
                        </div>
                        <div className='input-container'>
                            <h3>Add a written review</h3>
                            <textarea
                                rows="8" cols="50"
                                className='review-body-input'
                                value={review.body}
                                onChange={handleReviewChange}
                                placeholder='What did you like or dislike? What did you use this product for?'
                                name="body"
                            />
                        </div>
                        <div>
                            {isEmpty ?
                                <p>Please fill in headline and body</p>
                                : 
                                null
                            }
                        </div>
                        <div className='add-review-button-container'>
                            <button className='add-review-button' onClick={handleAddReview}>Submit</button>
                        </div>
                    </div>
            </div>
        </>
    );
};

export default LeaveReview;