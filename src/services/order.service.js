import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";
import { httpService } from './http.service'


const STORAGE_KEY = 'orderDB'

export const orderService = {
  query,
  getById,
  save,
  remove,
  getEmptyOrder,
  getOrderFromParams,
}

// _createOrders()
const BASE_URL = 'order/'
// READ
async function query(filterBy = {}) {
  try {
    const orders = await httpService.get(BASE_URL, filterBy)
    return orders
  } catch (err) {
    throw err
  }
}
// READ - getById
async function getById(orderId) {
  const url = BASE_URL + orderId
  return await httpService.get(url)
}
// Create / Update
async function save(order) {
  const method = order._id ? 'put' : 'post'
  return await httpService[method](BASE_URL, order)
}
// Delete
async function remove(orderId) {
  const url = BASE_URL + orderId
  return await httpService.delete(url)
}


function getEmptyOrder() {
  return {
    _id: "",
    hostId: "",
    buyer: {
      _id: "",
      fullname: "",
    },
    totalPrice: 0,
    startDate: "",
    endDate: "",
    guests: {
      adults: 0,
      kids: 0,
    }
    ,
    stay: {
      _id: "",
      name: "",
      price: 0,
    },
    msgs: [],
    status: "pending",
  };
}

// function _createOrders() {
//   let orders = utilService.loadFromStorage(STORAGE_KEY)
//   if (!orders || !orders.length) {
//     orders = orderData
//     utilService.saveToStorage(STORAGE_KEY, orders)
//   }
// }

function getOrderFromParams(searchParams) {
  const defaultOrder = getEmptyOrder()
  const order = {}
  for (const field in defaultOrder) {
    order[field] = searchParams.get(field) || ''
  }
  return order
}

