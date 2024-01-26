import { RiArrowDropDownLine as DownArrow } from "react-icons/ri";
import { onToggleModal } from "../../store/actions/app.actions";
import { utilService } from "../../services/util.service";
import { ReserveBtn } from "../UI/ReserveBtn";
import { DatePicker } from "../UI/DatePicker";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stayService } from "../../services/stay.service";
import { useNavigate } from "react-router-dom";
import { setCurrOrder } from "../../store/actions/order.actions";

export function StayCheckout({ price, startDate, endDate, currOrder }) {
  console.log("🚀 ~ StayCheckout ~ currOrder:", currOrder)
  const formattedStartDate = utilService.formatDate(startDate)
  const formattedEndDate = utilService.formatDate(endDate)
  const [bookingCosts, setBookingCosts] = useState({})

  const navigate = useNavigate()

  const nightsInStay = utilService.calculateNightsBetweenDates(startDate, endDate)

  useEffect(() => {
    if (nightsInStay) {
      setBookingCosts(prev=>({...prev,...stayService.calculateBookingCost(price, nightsInStay)}))
    }
  }, [nightsInStay])

  useEffect(()=>{
    setCurrOrder({totalPrice:bookingCosts.totalPrice})
  },[bookingCosts.totalPrice])


  const [isOpenDatePickerModal, setIsOpenDatePickerModal] = useState(false)

  function onOpenDatePicker() {
    console.log("🚀 ~ onOpenDatePicker ", isOpenDatePickerModal)
    setIsOpenDatePickerModal(prev => !prev)

  }
  function handleReserve() {
    navigate(`/book/${currOrder.stay._id}`)
  }
  

  return (
    //<div className="checkout-card-container">
    <>
      <div className="checkout-card">
        <div className={`date-picker-modal ${!isOpenDatePickerModal ? 'hidden' : ''}`}>
          <DatePicker />
        </div>
        <div className="price-container">
          <div className="price"> ${price}</div>
          <span className="btn-info-detail">night</span>
        </div>
        {/* actions */}
        <button onClick={onOpenDatePicker}>

          <div className="date-btn-container">
            <div className="btn-info">
              <div className="btn-info-label">check-in</div>
              <div className="btn-info-detail">{formattedStartDate ? formattedStartDate : 'Add date'}</div>
            </div>

            <div className="btn-info">
              <div className="btn-info-label">check-out</div>
              <div className="btn-info-detail">{formattedEndDate ? formattedEndDate : 'Add date'}</div>
            </div>
          </div>

        </button>
        <button>
          <div className="guest-btn-container">

            <div className="btn-info">
              <div className="btn-info-label">guests</div>
              <div className="btn-info-detail">1</div>
            </div>
            <div className="btn-info down-arrow">
              <DownArrow />
            </div>
          </div>
        </button>
        {/* <button className="btn-continue bnb-color">continue</button> */}
        <ReserveBtn cb={handleReserve} text={'Reserve'} />
        {/* pricing */}
        <div className="checkout-card-info">
          <span>You won't be charged yet</span>
        </div>
        {nightsInStay ? <div className="booking-costs">
          <div className="price-break-down">
            <button className="btn-desc-modal">{`${price} x ${nightsInStay} nights`}</button>
            <span>${bookingCosts.nightsCost}</span>
          </div>
          <div className="price-break-down">
            <button className="btn-desc-modal">Visit service fee</button>
            <span>${bookingCosts.serviceFee}</span>
          </div>
          <div className="price-break-down">
            <button className="btn-desc-modal">Taxes</button>
            <span>${bookingCosts.taxes}</span>
          </div>
          <div className="checkout-total">
            <span>Total</span>
            <span>${`${bookingCosts.totalPrice}`}</span>
          </div>
        </div> :
          <>
            <div className="checout-total">select Dates</div>
          </>}
      </div>

    </>

    //</div>
  );
}
