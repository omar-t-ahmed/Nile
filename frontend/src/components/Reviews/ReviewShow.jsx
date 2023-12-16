import StarRating from "./StarComponents/StarRating"
import profile_blank from "../images/Default_pfp.svg.png"
import "./ReviewShow.css"

const ReviewShow = ({review}) => {

    return (
        <div className="review-container">
            <div className="review-stars">
                <img className="profile-img" src={profile_blank} alt="profile"></img>
                <StarRating rating={review?.starRating}/>
            </div>

            <h3>{review?.header}</h3>
            <p>{review?.body}</p>
        </div>
    )
}

export default ReviewShow