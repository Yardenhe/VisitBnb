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

import { stayService } from "../services/stayService.service";
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

  const orders = useSelector((storeState) => storeState.orderModule.orders);
  const currOrder = useSelector(
    (storeState) => storeState.orderModule.currOrder
  );
  let { startDate, endDate } = currOrder;
  // const [orderToSend,setOrderToSend] = useState(currOrder)

  // obtain orderData from params ,
  // add orderDetails to params (useParams/searchParams),
  // turn into object...
  //idea ↓ (flow doesnt exist yet)
  // const [order,setOrder] = useState(orderService.getOrderFromParams() || orderService.getDefaultOrder())
  // const [searchParams,setSearchParams] = useSearchParams()
  // useEffect(()=>{
  //   setSearchParams(new URLSearchParams(orderService.getEmptyOrder()))
  //   console.log('blank order: ',searchParams.entries() );
  // },[])

  console.log("global Orders", orders);

  useEffect(() => {
    loadStay();
  }, [stayId]);

  async function loadStay() {
    try {
      const stay = await stayService.get(stayId);
      setStay(stay);
    } catch (err) {
      navigate("/");
      console.log(err);
    }
  }

  async function onChangeOrderData({ startDate, endDate, guests }) {
    return await setCurrOrder({ startDate, endDate, guests });
    // setOrderToSend(prev=>({...prev,startDate,endDate,guests}))
  }

  if (!stay) return <div>Loading..</div>;
  // destructure after loading
  const { name, imgUrls, price, host, loc, capacity } = stay;

  // dev - order actions
  const elDevActions = (
    <div className="dev-actions">
      <button onClick={() => loadOrders()}>LoadOrders</button>
      <button onClick={() => onChangeOrderData(orders[0])}>
        set/update currOrder
      </button>
      {/* <button onClick={()=>setCurrOrder(orderToSend)}>setCurrOrder</button> */}

      <button onClick={() => console.log(currOrder)}>LOG CURR ORDER</button>
      <button onClick={() => console.log(orders)}>LOG all ORDERS</button>
      <button onClick={() => console.log(currOrder)}>LOG CURR ORDER</button>
      <button onClick={() => console.log(orders)}>LOG all ORDERS</button>

      <button onClick={() => saveOrder(currOrder)}>placeOrder (save)</button>
    </div>
  );

  return (
    <div className="details-layout">
      <div className="dev-action-element">
        <button>
          <Link to={"/orders"}>Orders Page (dev-btn)</Link>
        </button>
        {elDevActions}
      </div>
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
        <StayCheckout price={price} startDate={startDate} endDate={endDate} />
      </section>

      {/* All details */}
      <section className="stay-reviews">
        <StayReviews reviews={stay.reviews}/>
      </section>
    </div>
  );
}
