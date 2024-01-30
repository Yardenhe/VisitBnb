import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ImageShortGalery } from "../components/stayDetailsCmps/ImageShortGalery";
import { StayDescription } from "../components//stayDetailsCmps/StayDescription";
import { StayCheckout } from "../components//stayDetailsCmps/StayCheckout";
import { IoIosHeartEmpty as Heart } from "react-icons/io";
import { MdIosShare as ShareIcon } from "react-icons/md";

import { Button } from "../components/UI/Button";
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { stayService } from "../services/stay.service";
import { useEffect, useState } from "react";
import { StayReviews } from "../components/stayDetailsCmps/StayReviews";

import { useSelector } from "react-redux";
import {
  setCurrOrder,
} from "../store/actions/order.actions";
import GoogleMapReact from 'google-map-react';

export function StayDetails() {

  const { stayId } = useParams(); //
  const [stay, setStay] = useState(null);
  const navigate = useNavigate();
  const currOrder = useSelector((storeState) => storeState.orderModule.currOrder)


  let { startDate, endDate } = currOrder


  useEffect(() => {
    loadStay()
  }, [stayId]);

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId);
      setStay(stay);
    } catch (err) {
      navigate("/");
      console.log(err);
    }
  }
  useEffectUpdate(() => {
    onPickStay()
  }, [stay])

  async function onPickStay() {
    const { _id, price, name, host } = stay;
    const stayToSave = { _id, price, name };
    return await setCurrOrder({ stay: stayToSave, hostId: host.id });
  }

  if (!stay) return <div>Loading..</div>
  // destructure after loading
  const { name, imgUrls, price, host, loc, capacity } = stay

  // googleMap handeling
  const mapProps = {
    center: {
      lat: loc.lat,
      lng: loc.lng
    },
    zoom: 15
  }
  const AnyReactComponent = ({ text, className }) => <div className={className || ''}>{text}</div>;

  return (
    <div className="details-layout">
      {/* HEADER */}
      <section className="details-header ">
        <h3>{name}</h3>
        <div className="btn-header-container">
          <Button icon={<ShareIcon />} className={'share-save-btn'} text={"Share"} isUnderlined={true} />
          <Button icon={<Heart />} className={'share-save-btn'} text={"Save"} isUnderlined={true} />
        </div>
      </section>

      {/* GALERY */}
      <ImageShortGalery imgUrls={imgUrls} />

      {/* DESCRIPTION */}
      <section className="checkout-container ">
        <StayDescription stay={stay} />
        <StayCheckout price={price} startDate={startDate} endDate={endDate} currOrder={currOrder} />
      </section>

      {/* All details */}
      <section className="stay-reviews">
        <StayReviews reviews={stay.reviews} />
      </section>

      <section className="stay-location">
        <h4>Where you'll stay</h4>
        <div className='stay-map-container' >
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCfwC_mk9Fxgszcr2eArRS4PTdQQYy1Si8" }}
            defaultCenter={mapProps.center}
            defaultZoom={mapProps.zoom}
            options={{ maxZoom: 16 }}
          >

            <AnyReactComponent
              lat={loc.lat}
              lng={loc.lng}
              className={'marker-circle'}
              // text={name}/>
              text={''} />
          </GoogleMapReact>
        </div>
      </section>
    </div>
  );
}
