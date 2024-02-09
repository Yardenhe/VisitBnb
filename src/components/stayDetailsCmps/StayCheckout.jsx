import { RiArrowDropDownLine as DownArrow, RiArrowDropUpLine as UpArrow } from "react-icons/ri";
import { onToggleModal } from "../../store/actions/app.actions";
import { addCommasNumeric, pluralizeLabel, utilService } from "../../services/util.service";
import { ReserveBtn } from "../UI/ReserveBtn";
import { DatePicker } from "../UI/DatePicker";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stayService } from "../../services/stay.service";
import { useNavigate } from "react-router-dom";
import { setCurrOrder } from "../../store/actions/order.actions";
import { orderService } from "../../services/order.service";
import { MiniGuestsModal } from "./MiniGuestsModal";
import useClickOutside from "../../customHooks/useClickOutside";

export function StayCheckout({ price, startDate, endDate, currOrder }) {
  const formattedStartDate = utilService.formatDate(startDate)
  const formattedEndDate = utilService.formatDate(endDate)
  const [bookingCosts, setBookingCosts] = useState({})
  // const [isOpenDatePickerModal, setIsOpenDatePickerModal] = useState(false)
  // const [isOpenGuestPicker, setIsOpenGuestPicker] = useState(false)
  const { isOpen: isOpenDatePickerModal, ref: datePickerRef, setIsOpen: setIsOpenDatePickerModal } = useClickOutside(false)
  const { isOpen: isOpenGuestPicker, ref: guestPickerRef, setIsOpen: setIsOpenGuestPicker } = useClickOutside(false)



  const navigate = useNavigate()

  const nightsInStay = utilService.calculateNightsBetweenDates(startDate, endDate)

  useEffect(() => {
    if (nightsInStay) {
      setBookingCosts(prev => ({ ...prev, ...stayService.calculateBookingCost(price, nightsInStay) }))
    }
  }, [nightsInStay])

  useEffect(() => {
    setCurrOrder({ totalPrice: bookingCosts.totalPrice })
  }, [bookingCosts.totalPrice])



  function handleReserve() {
    navigate(`/book/${currOrder.stay._id}`)
  }

  function onOpenDatePicker() {
    setIsOpenDatePickerModal(!isOpenDatePickerModal)
  }
  function onOpenGuestPicker() {
    setIsOpenGuestPicker(!isOpenGuestPicker)
  }


  return (
    //<div className="checkout-card-container">
    <>
      <div className="checkout-card">
        <div ref={datePickerRef} className={`date-picker-modal ${!isOpenDatePickerModal ? 'hidden' : ''}`}>
          {/* <DatePicker headContentJsx={<DateHeadJsx city={currOrder.city}  nights={nightsInStay} />}/> */}
          <DatePicker isModal={true} />
        </div>
        <div className="price-container">
          <div className="price"> ${price}</div>
          <span className="btn-info-detail">night</span>
        </div>
        {/* actions */}
        <button className="date-btn-container" onClick={onOpenDatePicker}>

          <div className="btn-info">
            <div className="btn-info-label">check-in</div>
            <div className="btn-info-detail sub-text">{formattedStartDate ? formattedStartDate : 'Add date'}</div>
          </div>

          <div className="btn-info">
            <div className="btn-info-label">check-out</div>
            <div className="btn-info-detail sub-text">{formattedEndDate ? formattedEndDate : 'Add date'}</div>
          </div>

        </button>

        <button ref={guestPickerRef} className="guest-btn-container" onClick={onOpenGuestPicker}>

          <div className="btn-info" >
            <div className="btn-info-label">guests</div>
            <div className="btn-info-detail">{pluralizeLabel(orderService.getTotalguests(currOrder.guests), 'guest')}</div>
          </div>
          <div className="btn-info down-arrow" >
            {!isOpenGuestPicker ? <DownArrow /> : <UpArrow />}
          </div>
          <div  className={`guest-picker-modal ${!isOpenGuestPicker ? 'hidden' : ''}`}>
            <MiniGuestsModal guests={currOrder.guests} />
          </div>
        </button>

        {nightsInStay ? <ReserveBtn cb={handleReserve} text={'Reserve'} />
          :
          <ReserveBtn cb={onOpenDatePicker} text={'Check availability'} />
        }
        {/* pricing */}

        {nightsInStay ? <>
          <div className="checkout-card-info">
            <span>You won't be charged yet</span>
          </div>
          <div className="booking-costs">
            <div className="price-break-down">
              <button className="btn-desc-modal">{`${addCommasNumeric(+price)} x ${nightsInStay} nights`}</button>
              <span>${addCommasNumeric(+bookingCosts.nightsCost)}</span>
            </div>
            <div className="price-break-down">
              <button className="btn-desc-modal">Visit service fee</button>
              <span>${addCommasNumeric(+bookingCosts.serviceFee)}</span>
            </div>
            <div className="price-break-down">
              <button className="btn-desc-modal">Taxes</button>
              <span>${addCommasNumeric(+bookingCosts.taxes)}</span>
            </div>
            <div className="checkout-total">
              <span>Total</span>
              <span>${`${addCommasNumeric(+bookingCosts.totalPrice)}`}</span>
            </div>
          </div>
        </>
          :
          <>
            {/* <div className="checout-total">select Dates</div> */}
          </>}
      </div>
    </>

    //</div>
  );
}

