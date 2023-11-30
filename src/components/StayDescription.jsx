import { Link } from "react-router-dom";
import { IoIosStar as StarIcon} from "react-icons/io";
import {pluralizeLabel} from '../services/util.service'

export function StayDescription({stay}) {



  console.log(stay);
  const {amenities,summary,type,labels,host,loc,capacity,bedrooms,beds,bathrooms} = stay;
  return (
    <article className="details-short">
      <h3>{`${type} in ${loc.city},${loc.country}`}</h3>
      <div className="stay-capacity-details">
        {/* map from data [!currently missing] */}
        <li>{pluralizeLabel(capacity,'guest')}</li>
        <li>{pluralizeLabel(bedrooms,'bedroom')}</li>
        <li>{pluralizeLabel(beds,'bed')}</li>
        <li>{pluralizeLabel(bathrooms,'bathroom')}</li>
      </div>
      <div className="rating-peek">
        {/* map from data [!missing]*/}
        <StarIcon />
        <span>4.8</span>
        <Link> 41 reviews</Link>
      </div>
      <hr />
      
      <div className="stay-facts">
        <ul>
          {/* map from data */}
          <li>Entire home</li>
          <li>Self check-in</li>
          <li>Free cancelation before..</li>
        </ul>
      </div>
      <hr />
      <div className="stay-description">
        {/* make hr a dynamic component */}
        <p>
          {summary}
        </p>
        <button>show more</button>
      </div>
    </article>
  );
}



{/* <div className="mini-user">
        map from data
        <img
          className="user-img"
          src=""
          alt="user"
        />
        <span>hosted by </span>
        <span>Superhost tag?</span>
        <span>-years of experience</span>
      </div> */}