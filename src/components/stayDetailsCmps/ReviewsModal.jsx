import React from 'react'
import { MiniUserReview } from '../UI/MiniUserReview'

export function ReviewsModal({ payload }) {
    const { reviews } = payload


    return (
        <div className="reviews-modal">
            <h3>Reviews</h3>
            <div className="reviews-modal-list">
                {reviews.map((review, i) => (
                    <article key={i} className="review-item-container review-list-item">
                        <MiniUserReview review={review} isList={true}/>
                    </article>
                ))}
            </div>

        </div>
    )
}
