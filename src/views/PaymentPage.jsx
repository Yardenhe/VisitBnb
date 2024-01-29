import { useSelector } from "react-redux"
import { OrderPreview } from "../components/OrderPreview"
import { stayService } from "../services/stay.service"
import { LoginSignup } from "../components/LoginSignUp"
import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import { orderService } from "../services/order.service"
import { ReserveBtn } from "../components/UI/ReserveBtn"
import { saveOrder } from "../store/actions/order.actions"
import { useNavigate } from "react-router-dom"

export default function PaymentPage() {
    const currOrder = useSelector((storeState) => storeState.orderModule.currOrder)
    console.log("🚀 ~ PaymentPage ~ currOrder:", currOrder)
    const loggedinUser = useSelector((storeState) => storeState.userModule.user)
    const [isLoggedin, setIsLoggedin] = useState()
    const navigate = useNavigate()

    async function onSaveOrder() {
        try {
            const orderToSave = currOrder;
            await saveOrder(orderToSave)
            navigate('/')
            showSuccessMsg("your order Successfully sent !")
        } catch (err) {
            console.log('Had issues adding order', err);
        }
    }

    useEffect(() => {
        setIsLoggedin((loggedinUser ? true : false))
    }, [loggedinUser])
    return (
        <div className="payment-layout">
            <section className="checkout-payment-container ">
                <article className="details-top">
                    <section className="details-top-head">
                        <h4>Confirm and pay</h4>
                        <h3>Your trip</h3>
                        <div className="payment-order-info">
                            <h3>Dates</h3>
                            <div className="sub-text">{`${utilService.formatOrderDate(currOrder.startDate)} -
                                ${utilService.formatOrderDate(currOrder.endDate)}`}</div>
                        </div>
                        <div className="payment-order-info">
                            <h3>Guests</h3>
                            <div className="sub-text"> {orderService.getTotalguests(currOrder.guests)}</div>
                        </div>
                        <div className="payment-order-info">
                            <h3>Total price</h3>
                            <div className="sub-text"> {currOrder.totalPrice}</div>
                        </div>
                    </section>

                    {/* <section className="details-top-head">{Object.entries(currOrder).map(([key, value]) => <article><span>{key} :</span><span>{value.toString()}</span></article>)}</section> */}
                    {!isLoggedin &&
                        <section className="host-mini-section">
                            <LoginSignup payload={{ isLogin: true }} onCloseModal={() => console.log('closeModal')} /></section>}
                    {isLoggedin &&
                        <div className="">
                            <section className="stay-facts">
                                <div className="payment-order-info">
                                    <h3>Ground rules</h3>
                                    <div className="sub-text">
                                        <h4>We ask every guest to remember a few simple things about what makes a great guest.
                                            Follow the house rules
                                            Treat your Host's h
                                            ome like your own.</h4>
                                        <div className="tiny-li">
                                            <span className="dot"></span><li>Follow the house rules</li>
                                        </div>
                                        <div className="tiny-li">
                                            <span className="dot"></span><li>Treat your Host’s home like your own</li>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="stay-description">
                                <div className="payment-order-info">
                                    <h4 className=""> Your reservation won’t be confirmed until the Host accepts your request (within 24 hours).</h4>
                                    <h4 className="sub-text">You won’t be charged until then.</h4>

                                </div>
                            </section>
                            <section className="stay-facts">

                                <div className="action">
                                    <ReserveBtn text={'Confirm & Pay'} cb={onSaveOrder} />
                                </div>
                            </section>
                        </div>
                    }
                </article>

                <div className="checkout-card">
                    <h3>Order details</h3>

                    <div className="mini-order-preview">
                        <OrderPreview order={currOrder} />
                    </div>

                    <div className="checkout-total">
                        <span>Total price</span>
                        <span>${`${currOrder.totalPrice}`}</span>
                    </div>
                </div>

            </section>
        </div>

    )
}
