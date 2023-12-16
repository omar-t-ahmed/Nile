import { useDispatch } from "react-redux";
import { fetchReviews } from "../../store/reviews";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import ReviewShow from "./ReviewShow"

const Reviews = ({item}) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => state?.reviews ? Object.values(state.reviews) : [])

    useEffect(() => {
        dispatch(fetchReviews(item?.id))
    },[dispatch, item])

    return (
        <>
            <div className="add-review-container">
                <h3>Leave a Review</h3>
            </div>
            <div className="all-reviews-container">
                {reviews.map((review) => (<ReviewShow review={review} key={review.id}/>))}
            </div>
        </>
    );
}

export default Reviews