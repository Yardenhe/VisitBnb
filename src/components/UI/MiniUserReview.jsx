import { utilService } from "../../services/util.service";
import { MiniUser } from "./MiniUser";
import { IoIosStar as StarIcon } from "react-icons/io";

export function MiniUserReview({ review, isList = false }) {

  return (
    <div className="mini-user-review">
      <MiniUser user={review.by} />

      <div className="review-content">
        <div className="review-content-info">
          <div className="review-content-info-rating">
            {review.rate} <StarIcon />
          </div>
          <span className="dot"></span>
          <div className="review-content-info-date">
            {utilService.calculateTimeAgo(review.at)}
          </div>
        </div>
        {isList ?
          <div className="review-content-text-list">
            {review.txt}
          </div> :

          <>
            <div className="review-content-text">
              {review.txt}
            </div>

            {review.txt.length > 128 && (
              <div className="review-action">
                <button className="action-btn underline">Show more</button>
              </div>
            )}
          </>
        }

      </div>

    </div>
  );
}

