import { RiArrowDropDownLine as DownArrow } from "react-icons/ri";
import { onToggleModal } from "../../store/actions/app.actions";
import { utilService } from "../../services/util.service";

export function StayCheckout({ price, orderInfo,startDate, endDate }) {
  const formattedStartDate = utilService.formatDate(startDate)
  const formattedEndDate = utilService.formatDate(endDate)

  function onOpenDatePicker(){
    onToggleModal({type:'datePicker',action})
  }
  return (
    //<div className="checkout-card-container">
    <div className="checkout-card">
      <div className="price-container">
        <div className="price"> ${price}</div> 
        <span className="btn-info-detail">night</span>
      </div>
      {/* actions */}
      <button onClick={onOpenDatePicker}>

        <div className="date-btn-container">
          <div className="btn-info">
            <div className="btn-info-label">check-in</div>
            <div className="btn-info-detail">{formattedStartDate?formattedStartDate : 'Add date'}</div>
          </div>

          <div className="btn-info">
            <div className="btn-info-label">check-out</div>
            <div className="btn-info-detail">{formattedEndDate?formattedEndDate : 'Add date'}</div>
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
          <DownArrow/>
        </div>
        </div>
      </button>
      <button className="btn-continue bnb-color">continue</button>
      {/* pricing */}
      <div className="price-break-down">
        <button className="btn-desc-modal">{`${price} x 5 nights`}</button>
        <span>${price * 5}</span>
      </div>
      <div className="price-break-down">
        <button className="btn-desc-modal">Cleaning fee</button>
        <span>${21}</span>
      </div>
      <div className="price-break-down">
        <button className="btn-desc-modal">Airbnb service fee</button>
        <span>${price * 5 * 0.15}</span>
      </div>
      <div className="price-break-down">
        <button className="btn-desc-modal">Taxes</button>
        <span>${price * 0.05}</span>
      </div>
      <div className="checkout-total">
        <span>Total</span>
        <span>${`${price}`}</span>
      </div>
    </div>
    //</div>
  );
}
