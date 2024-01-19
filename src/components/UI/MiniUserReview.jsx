import { utilService } from "../../services/util.service";
import { MiniUser } from "./MiniUser";
import { IoIosStar as StarIcon } from "react-icons/io";

export function MiniUserReview({ review }) {

  return (
    <div className="mini-user-review">
      <MiniUser user={review.by} />

      <div className="review-content">
        <div className="review-content-info">
            <div className="review-content-info-rating">
                {review.rate} <StarIcon/>
            </div>
            <span className="dot"></span>
            <div className="review-content-info-date">
                {utilService.calculateTimeAgo(review.at)}
            </div>
        </div>
        
        <div className="review-content-text">
            {review.txt}
        </div>

        {review.txt.length > 258 && (
          <div className="review-action">
            <button className="action-btn underline">Show more</button>
          </div>
        )}
      </div>
      
    </div>
  );
}
// reviews: [
//     {
//       at: "2016-08-23T04:00:00.000Z",
//       by: {
//         _id: "622f3406e36c59e6164fbbe5",
//         fullname: "Liz",
//         imgUrl: "https://thispersondoesnotexist.com/",
//         id: "40447686",
//       },
//       txt: "This place was amazing\nKandy was so quick to respond and so accommodating -even when I was a little needy a couple of times (I needed a wine opener and I had one within the hour)\nIt's a hidden gem and just what we needed to reset life\nIt had every modern luxury while being tucked away in the jungle and right next to the bay\nThank you Kandy so much for having us\nWe thoroughly enjoyed our stay \n",
//       rate: 5,
//     },
