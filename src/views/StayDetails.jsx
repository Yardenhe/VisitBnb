import { Link, useNavigate, useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { ImageShortGalery } from "../components/stayDetailsCmps/ImageShortGalery";
import { StayDescription } from "../components//stayDetailsCmps/StayDescription";
import { StayCheckout } from "../components//stayDetailsCmps/StayCheckout";
import { IoIosHeartEmpty as Heart } from "react-icons/io";
import { MdIosShare as ShareIcon } from "react-icons/md";

import { Button } from "../components/UI/Button";

import { stayService } from "../services/stayService.service";
import { useEffect, useState } from "react";
import { StayReviews } from "../components/stayDetailsCmps/StayReviews";
import { orderService } from "../services/order.service";


export function StayDetails() {
  // TODO: get the stay from the store
  const { stayId } = useOutletContext();
  const [stay, setStay] = useState(null);
  const navigate = useNavigate();

  // obtain orderData from params , 
  // add orderDetails to params (useParams/searchParams),
  // turn into object

  //idea ↓ (flow doesnt exist yet)
  // const [order,setOrder] = useState(orderService.getOrderFromParams() || orderService.getDefaultOrder())
  const [searchParams,setSearchParams] = useSearchParams()
  
  
  useEffect(()=>{
    setSearchParams(new URLSearchParams(orderService.createOrder()))
    console.log('blank order: ',searchParams.entries() );
  },[])
  
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

  async function createOrderToSend(){
    try {
      const order = await orderService.createOrder()
      console.log('createOrderToSend');
    } catch (err) {
      console.log(err);
    }
  }
  
  if (!stay) return <div>Loading..</div>
  // destructure after loading
  const {name,imgUrls,price,host,loc,capacity} = stay;
  
  return (
    <div className="details-layout">
      <div className="dev-actions">
        <button onClick={createOrderToSend}>createOrderToSend</button>
        {/* <button onClick={}>updateOrderToSend</button> */}
        {/* <button onClick={}>saveOrder</button> */}
        {/* <button onClick={}></button> */}
      </div>
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
