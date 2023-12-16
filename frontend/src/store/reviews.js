import csrfFetch from "./csrf";

const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS";
const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
})

const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
})

const deleteReview = reviewId => ({
    type: DELETE_REVIEW,
    reviewId
})

export const fetchReviews = (itemId) => async dispatch => {
    const res = await csrfFetch('/api/reviews');

    if (res.ok) {
        const all_reviews = await res.json();

        const reviewsArray = Object.values(all_reviews);

        const reviews = reviewsArray.filter((review) => review.itemId === itemId);

        dispatch(receiveReviews(reviews));
    }
}

export const fetchReview = (reviewId) => async dispatch => {
    const res = await csrfFetch (`/api/reviews/${reviewId}`)
    if (res.ok) {
        const review = await res.json()
        dispatch(receiveReview(review))
    }
}

export const addReview = (review) => async dispatch => {
    const res = await csrfFetch('/api/reviews/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    })

    if (res.ok) {
        const review = await res.json()
        dispatch(receiveReview(review))
    }
}

export const updateReview = (updatedReview) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${updatedReview.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview),
    })

    if (res.ok) {
        const updatedReview = await res.json()
        dispatch(receiveReview(updatedReview))
    }
}

export const removeReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    })

    if (res.ok) {
        dispatch(deleteReview(reviewId))
    }
}

export const getReviewsAverage = (itemId) => {
    const reviews = fetchReviews(itemId)

    let totalReviewScore = reviews.reduce((total, review) =>{
        return total + review.star_rating
    },0)

    const reviewCount = reviews.length
    return reviewCount > 0 ? [reviewCount, (totalReviewScore / reviewCount).toFixed(1)] : [0, "0.0"]
}

const reviewsReducer = (state = { }, action) => {
    const newState = {...state}
    switch(action.type) {
        case RECEIVE_REVIEWS:
            let reviews = {}

            action.reviews.forEach((review) => {
                reviews[review.id] = review
            })
            return reviews

        case RECEIVE_REVIEW:
            return {...newState, [action.review._id] : action.review}
        case DELETE_REVIEW:
            delete newState[action.reviewId]
            return newState
        default:
            return state
    }
}

export default reviewsReducer