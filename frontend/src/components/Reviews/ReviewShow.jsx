import StarRating from "./StarComponents/StarRating"
import profile_blank from "../images/Default_pfp.svg.png"
import "./ReviewShow.css"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { findUser } from "../../store/session"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { removeReview } from "../../store/reviews"


const ReviewShow = ({review}) => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.session.currentUser)

    useEffect(() => {
        const fetchUser = async () => {
        if (review?.userId) {
            const fetchedUser = await findUser(review.userId);
            setUser(fetchedUser);
        }
        };

        fetchUser();
    }, [review]);

    


    return (
        <div className="review-container">
            <div className="review-stars">
                <img className="profile-img" src={profile_blank} alt="profile"></img>
                <p>{user?.user.name}</p>
            </div>
                <StarRating rating={review?.starRating}/>
            <h3>{review?.header}</h3>
            <p>{review?.body}</p>
            {review?.userId === currentUser?.id ?
                <div className="delete-review-button-container">
                    <button className='delete-review-button' onClick={() => dispatch(removeReview(review?.id))}>delete</button>
                </div>
                :
                null
            }
        </div>
    )
}

export default ReviewShow