import { Link } from "react-router-dom";

export function StayDescription() {
  return (
    <article className="details-short">
      <h3>_stayType in Tel-Aviv,israel</h3>
      <div className="stay-capacity-details">
        {/* map from data */}
        <li>4 guests</li>
        <li>2 bedrooms</li>
        <li>2 beds</li>
        <li>1 bath</li>
      </div>
      <hr />
      <div className="rating-peek">
        {/* map from data */}
        <span>4.8 </span>
        <Link>41 reviews</Link>
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quia
          voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. Quis
        </p>
        <button>show more</button>
      </div>
    </article>
  );
}
