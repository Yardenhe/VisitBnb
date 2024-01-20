import { orderService } from "../../services/order.service"

const initialState = {
    orders: null,
    currOrder: orderService.getEmptyOrder(),
}
// maybe a state for the order too
export const SET_ORDERS = 'SET_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'

export const SET_CURR_ORDER = 'SET_CURR_ORDER'
// export const UNDO_CHANGES = 'UNDO_CHANGES'

export function orderReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders,
            }
        case ADD_ORDER:
            return {
                ...state,
                orders: [...state.orders, action.order],
            }
        case REMOVE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(order => order._id !== action.orderId),
            }
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(order => order._id === action.order._id ? action.order : order),
            }
        case SET_CURR_ORDER:
            return {
                ...state,
                currOrder: { ...state.currOrder, ...action.order }
            }
        // case UNDO_CHANGES:
        //     return {
        //         ...state,
        //         orders:action.orders,
        //     }


        default:
            return state
    }
}