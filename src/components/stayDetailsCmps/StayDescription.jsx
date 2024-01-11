import { Link } from "react-router-dom";
import { IoIosStar as StarIcon } from "react-icons/io";
import { PiDoorOpenLight as DoorIcon } from "react-icons/pi";
import { pluralizeLabel } from "../../services/util.service";

import { MiniUser } from "../UI/MiniUser";
import { AmenityList } from "./AmenityList";
import { DatePicker } from "../UI/DatePicker";
import { TagToIcon } from "../UI/TagToIcon";

export function StayDescription({ stay }) {
  // console.log('StayDescription',stay);
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
          <span className="dot"></span>
          <li>{pluralizeLabel(bedrooms, "bedroom")}</li>
          <span className="dot"></span>
          <li>{pluralizeLabel(beds, "bed")}</li>
          <span className="dot"></span>
          <li>{pluralizeLabel(bathrooms, "bathroom")}</li>
        </div>

        <div className="rating-peek">
          <div className="rating-peek-stars">
            <StarIcon />
            <span className="total-rating">4.8</span>
          </div>
          <span className="dot"></span>
          <div className="total-reviews">
            <Link>41 reviews</Link>
          </div>
        </div>
      </section>

      <section className="host-mini-section">
        <MiniUser user={host} type="host" />
      </section>

      <section className="stay-facts">
        {/* create a FactMap component and map from data */}
        <div className="stay-facts-row">
          <div className="stay-facts-icon">
            <TagToIcon tag={'door'} />
          </div>
          <div className="list-item-nest">
            <li>Entire home</li>
            <sub>Have the privacy of the entire place.</sub>
          </div>
        </div>
        <div className="stay-facts-row">
          <div className="stay-facts-icon">
            <TagToIcon tag={'gps-loc'} />
          </div>
          <div className="list-item-nest">
            <li>Great location</li>
            <sub>90% of {host.fullname} Guests rated this location a 5 star rating.</sub>
          </div>
        </div>
        <div className="stay-facts-row">
          <div className="stay-facts-icon">
            <TagToIcon tag={'calendar'}/>
          </div>
          <div className="list-item-nest">
            <li>Free cancelation before..</li>
            <sub>Check yourself in with the smartlock.</sub>
          </div>
        </div>
      </section>

      <section className="stay-description">
        <p>{summary}</p>
        <button className="btn-info">show more</button>
      </section>

      <section className="stay-amenities">
        <AmenityList amenities={amenities} />
      </section>

      <section className="stay-dates">
        <DatePicker />
      </section>
    </article>
  );
}
