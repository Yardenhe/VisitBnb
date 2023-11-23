export function StayDescription() {
  return (
    <article>
      <h2>_stayType in Tel-Aviv,israel</h2>
      <div className="stay-capacity-details">
        {/* map from data */}
        <span>4 guests</span>
        <span>2 bedrooms</span>
        <span>2 beds</span>
        <span>1 bath</span>
      </div>
      <hr />
      <div className="review-peek">
        {/* map from data */}
        <span>4.8</span>
        <span>4 reviews</span>
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
