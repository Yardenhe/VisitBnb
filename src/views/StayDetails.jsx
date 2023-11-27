import { Link, useOutletContext } from "react-router-dom";
import { ImageShortGalery } from "../components/ImageShortGalery";
import { StayDescription } from "../components/StayDescription";
import { StayCheckout } from "../components/StayCheckout";
import { IoIosHeartEmpty as Heart } from "react-icons/io";
import { MdIosShare as ShareIcon } from "react-icons/md";

import { Button } from "../components/UI/Button";

import { stayService } from "../services/stayService.service";
import { useEffect } from "react";

// for now
export const imgUrls = [
  "https://a0.muscache.com/im/pictures/dc89cf8d-6d45-4db8-acb0-e8331150d725.jpg?im_w=960",
  "https://a0.muscache.com/im/pictures/3ecf9b60-50a1-4a8b-9aa5-7f7c9bd2defa.jpg?im_w=480",
  "https://a0.muscache.com/im/pictures/e362a6b6-ef1e-43c5-9186-ac26abf2994e.jpg?im_w=480",
  "https://a0.muscache.com/im/pictures/c566639d-6444-458e-83e1-2ec903f59e36.jpg?im_w=480",
  "https://a0.muscache.com/im/pictures/miso/Hosting-48086771/original/45f8627a-db65-426e-aab5-8018b4b40e17.jpeg?im_w=1200",
];

//
export function StayDetails() {
  // TODO: get the stay from the store
  const { stayId } = useOutletContext();

  console.log(stayId);

  useEffect(() => {
    loadStays();
  }, []);

  async function loadStays(){
    const stays = await stayService.query()
    console.log(stays);
  }

  return (
    <div className="details-layout">
      {/* <Link to="/">←back</Link> */}
      {/* HEADER */}
      <section className="details-header ">
        <h3>stay name {stayId}</h3>
        <div className="btn-header-container">
          <Button icon={<ShareIcon />} text={"share"} />
          <Button icon={<Heart />} text={"save"} />
        </div>
      </section>
      {/* GALERY */}
      <ImageShortGalery imgUrls={imgUrls} />
      {/* DESCRIPTION */}
      <section className="checkout-container ">
        <StayDescription />
        <StayCheckout />
      </section>
    </div>
  );
}
