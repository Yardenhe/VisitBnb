import { stayService } from "../../services/stay.service";
import { onToggleModal } from "../../store/actions/app.actions";
import { MiniUserReview } from "../UI/MiniUserReview";

export function StayReviews({ reviews }) {
  let hasMoreReviews
  let reviewsToShow = reviews

  const totalReviews = reviews.length

  // limit to 6 reviews
  if (totalReviews > 6) {
    reviewsToShow = reviews.slice(0, 6)
    hasMoreReviews = true
  }

  // show more reviews 

  return (
    <>
      {/* TODO: stats cmp  */}
      <h3>Reviews</h3>

      <div className="review-stats">
        {/* <h3 className="review-stats-header">Average Rating</h3> */}
        <div className="reviews-average-container">
          <div className="rate-flag-container">
            <img src="https://a0.muscache.com/pictures/ec500a26-609d-440f-b5d0-9e5f92afd478.jpg" alt="" />
          </div>
          <h4 className="review-stats-rating">
            {stayService.calculateAverageRating(reviews)}
          </h4>
          <div className="rate-flag-container">
            <img src="https://a0.muscache.com/pictures/65bb2a6c-0bdf-42fc-8e1c-38cec04b2fa5.jpg" alt="" />
          </div>

        </div>
      </div>
      <div className="review-list-short">
        {reviewsToShow.map((review, i) => (
          <article key={i} className="review-item-container">
            <MiniUserReview review={review} />
          </article>
        ))}
      </div>
      {hasMoreReviews &&
        <button className="commun-btn" onClick={()=>onToggleModal({type:'reviewsModal',payload:{reviews}})}>Show all {totalReviews} reviews</button>
      }
    </>
  )
}
