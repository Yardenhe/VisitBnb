import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
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
import { orderService } from "../services/order.service";
import { useSelector } from "react-redux";
import {
  loadOrders,
  saveOrder,
  setCurrOrder,
} from "../store/actions/order.actions";

export function StayDetails() {
  // TODO: get the stay from the store
  const { stayId } = useOutletContext(); //
  const [stay, setStay] = useState(null);
  const navigate = useNavigate();


  const currOrder = useSelector(
    (storeState) => storeState.orderModule.currOrder
  );
  const orders = useSelector(
    (storeState) => storeState.orderModule.orders
  );
  console.log("🚀 ~ StayDetails ~ orders:", orders)
  let { startDate, endDate } = currOrder




  useEffect(() => {
    loadStay()
    loadOrders()
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
    const { _id, price, name } = stay;
    const stayToSave = { _id, price, name };
    return await setCurrOrder({ stay: stayToSave });
  }

  if (!stay) return <div>Loading..</div>
  // destructure after loading
  const { name, imgUrls, price, host, loc, capacity } = stay

  async function onSaveOrder() {
    try {

      const orderToSave = currOrder;
      await saveOrder(orderToSave)
      navigate('/')
    } catch (err) {
      console.log('Had issues adding order', err);
    }
  }

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
        <StayCheckout price={price} startDate={startDate} onSaveOrder={onSaveOrder} endDate={endDate} />
      </section>

      {/* All details */}
      <section className="stay-reviews">
        <StayReviews reviews={stay.reviews} />
      </section>
    </div>
  );
}
