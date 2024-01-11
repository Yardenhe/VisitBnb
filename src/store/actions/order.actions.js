import { orderService } from "../../services/order.service";
import { ADD_ORDER, REMOVE_ORDER, SET_CURR_ORDER, SET_ORDERS, UPDATE_ORDER } from "../reducers/order.reducer";
import { store } from "../store";


// SET_ORDERS
export async function loadOrders(){
    try {
        const orders = await orderService.query()
        store.dispatch({type:SET_ORDERS , orders })
    } catch (err) {
        console.log(err);
    }
}
// SET_CURR_ORDER
export async function setCurrOrder(currOrder){
    let order = currOrder ? currOrder : orderService.getEmptyOrder()
    store.dispatch({type:SET_CURR_ORDER , order})
}

// ADD_ORDER / UPDATE_ORDER
export async function saveOrder(order){
    try {
        const type = order.id ? UPDATE_ORDER : ADD_ORDER
        const savedOrder = await orderService.save(order)
        store.dispatch({type, order:savedOrder})
    } catch (err) {
        console.log(err);
    }
}
// REMOVE_ORDER
export async function removeOrder(orderId) {
    try {
        store.dispatch({ type: REMOVE_ORDER, stayId: orderId })
        await orderService.remove(orderId)
    } catch (err) {
        // store.dispatch({ type: UNDO_CHANGES })
        console.log(err);
        throw err
    }
}

// export async function createOrderToSend(){
//     try {
//       const order = await orderService.getEmptyOrder()
//       console.log('createOrderToSend',order);
//     //   store.dispatch({type:})
//     } catch (err) {
//       console.log(err);
//     }
//   }