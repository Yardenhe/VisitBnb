import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { ImageShortGalery } from "../components/stayDetailsCmps/ImageShortGalery";
import { StayDescription } from "../components//stayDetailsCmps/StayDescription";
import { StayCheckout } from "../components//stayDetailsCmps/StayCheckout";
import { IoIosHeartEmpty as Heart } from "react-icons/io";
import { MdIosShare as ShareIcon } from "react-icons/md";

import { Button } from "../components/UI/Button";

import { stayService } from "../services/stayService.service";
import { useEffect, useState } from "react";
import { StayReviews } from "../components/stayDetailsCmps/StayReviews";


export function StayDetails() {
  // TODO: get the stay from the store
  const { stayId } = useOutletContext();
  const [stay, setStay] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    loadStay();
  }, [stayId]);
  
  async function loadStay(){
    try{
      const stay = await stayService.get(stayId);
      setStay(stay);
    }
    catch(err){
      navigate('/')
      console.log(err);
    }
  }
  
  if (!stay) return <div>Loading..</div>
  // destructure after loading
  const {name,imgUrls,price,host,loc,capacity} = stay;
  
  return (
    <div className="details-layout">
      {/* HEADER */}
      <section className="details-header ">
        <h3>{name}</h3>
        <div className="btn-header-container">
          <Button icon={<ShareIcon />} text={"share"} />
          <Button icon={<Heart />} text={"save"} />
        </div>
      </section>

      {/* GALERY */}
      <ImageShortGalery imgUrls={imgUrls} />

      {/* DESCRIPTION */}
      <section className="checkout-container ">
        <StayDescription stay={stay} />
        <StayCheckout price={price}/>
      </section>

      {/* All details */}
      <section className="stay-reviews">
        <StayReviews />
      </section>
      
    </div>
  );
}
