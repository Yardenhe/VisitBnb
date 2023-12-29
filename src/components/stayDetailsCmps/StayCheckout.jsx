export function StayCheckout({ price, orderInfo }) {
  return (
    //<div className="checkout-card-container">
    <div className="checkout-card">
      <p>
        <b>${price}</b> <span className="btn-info-detail">night</span>
      </p>
      {/* actions */}
      <button>
        <div className="date-btn-container">

          <div className="btn-info">
            <div className="btn-info-label">check-in</div>
            <div className="btn-info-detail">12/1/2023</div>
          </div>

          <div className="btn-info">
            <div className="btn-info-label">check-out</div>
            <div className="btn-info-detail">12/1/2023</div>
          </div>
  
        </div>
      </button>
      <button>
        <div className="btn-info">
          <div className="btn-info-label">guests</div>
          <div className="btn-info-detail">1</div>
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
