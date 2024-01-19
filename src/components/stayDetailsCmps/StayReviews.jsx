import { MiniUserReview } from "../UI/MiniUserReview";

export function StayReviews({reviews}) {
  let hasMoreReviews
  let reviewsToShow = reviews
  
  const totalReviews = reviews.length

  // limit to 6 reviews
  if (totalReviews > 6) {
    reviewsToShow = reviews.slice(0,6)
    hasMoreReviews = true
  }
  
  // show more reviews 

  return (
    <>
    {/* TODO: stats cmp  */}
    <h4>reviews</h4>
      <div className="review-stats">
        
      </div>
    <div className="review-list-short">
      {reviewsToShow.map((review,i)=>(
        <article key={i} className="review-item-container">
          <MiniUserReview review={review}/>
        </article>
      ))}
    </div>
    {hasMoreReviews && 
      <button className="commun-btn">Show all {totalReviews} reviews</button>
    }
    </>
  )
}
