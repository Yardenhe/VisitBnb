import { Link } from "react-router-dom";
import { IoIosStar as StarIcon } from "react-icons/io";
import { pluralizeLabel } from "../../services/util.service";
import {MiniUser} from "../UI/MiniUser";
import {AmenityList} from "./AmenityList";
import { DatePicker } from "./DatePicker";

export function StayDescription({ stay }) {
  console.log(stay);
  const {
    amenities,
    summary,
    type,
    labels,
    host,
    loc,
    capacity,
    bedrooms,
    beds,
    bathrooms,
  } = stay;
  return (
    <article className="details-top">

      <section className="details-top-head">

        <h4>{`${type} in ${loc.city},${loc.country}`}</h4>

        <div className="stay-capacity-details">
          <li>{pluralizeLabel(capacity, "guest")}</li>
          <li>{pluralizeLabel(bedrooms, "bedroom")}</li>
          <li>{pluralizeLabel(beds, "bed")}</li>
          <li>{pluralizeLabel(bathrooms, "bathroom")}</li>
        </div>

        <div className="rating-peek">
          {/* map from data [!missing]*/}
          <StarIcon />
          <span>4.8</span>
          <Link> 41 reviews</Link>
        </div>
      </section>


      <section className="host-mini-section">
        <MiniUser user={host} type="host" />
      </section>

      <section className="stay-facts">
        <ul>
          {/* map from data */}
          <li>Entire home</li>
          <li>Self check-in</li>
          <li>Free cancelation before..</li>
        </ul>
      </section>

      <section className="stay-description">
        <p>{summary}</p>
        <button className="btn-info">show more</button>
      </section>

      <section className="stay-amenities">
        <AmenityList amenities={amenities}/>
      </section>

      <section className="stay-dates">
        <DatePicker/>
      </section>
    </article>
    

  );
}
