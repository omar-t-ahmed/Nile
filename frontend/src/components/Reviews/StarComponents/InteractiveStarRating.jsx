import React, { useState } from 'react';

const InteractiveStarRating = ({ onChange, initialRating }) => {
const [rating, setRating] = useState(initialRating);

const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
    onChange(clickedRating);
};

const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span
            key={i}
            className="star"
            style={{ color: 'orange', cursor: 'pointer' }}
            onClick={() => handleStarClick(i)}
            >
            {i <= rating ? '&#9734' :'&#9733'}
            </span>
        );
        }
        return stars;
    };
    return <div className="star-rating">{renderStars()}</div>;
};

export default InteractiveStarRating;