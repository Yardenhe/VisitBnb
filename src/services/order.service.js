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
  getTotalguests,
  getOverviewInsights,
  getOrdersInsights

}

// _createOrders()
const BASE_URL = 'order/'
// READ
async function query(userId) {
  try {
    const orders = await httpService.get(BASE_URL, userId)
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
    // _id: "",
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
    // msgs: [],
    // status: "pending",
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

function getTotalguests(guests) {
  return Object.values(guests).reduce((totalGuests , value) => totalGuests+value,0)
}
// FOR HOST INSIGHTS 

function getOrdersInsights(orders) {

  return {
    revenue: _getRevenueInsight(orders),
    totalGuests: _getGuestsInsight(orders),
    averageDuration: _getAverageBookingDuration(orders)
  }
}
function getOverviewInsights(orders) {
  const overviewStats = {}
  const { pending, approved, rejected } = _getOrderStatusBreakdown(orders)
  overviewStats["Total Orders"] = orders.length
  // overviewStats["Average revenue"] = 
  overviewStats["Approved"] = approved || 0
  overviewStats["Pending"] = pending || 0
  overviewStats["Rejected"] = rejected || 0
  return overviewStats
}


function _getRevenueInsight(orders) {
  let result = orders.reduce((total, order) => total + order.totalPrice, 0);
  return result
}
function _getGuestsInsight(orders) {
  return orders.reduce((totalGuests, order) => totalGuests + (+order.guests.adults || 0) + (+order.guests.kids || 0) + (+order.guests.infants || 0), 0);
}
function _getAverageBookingDuration(orders) {
  const durations = orders.map(order => {
    const startDate = new Date(order.startDate);
    const endDate = new Date(order.endDate);
    return endDate - startDate; // Duration in milliseconds
  });

  const averageDuration = durations.reduce((total, duration) => total + duration, 0) / durations.length;

  return utilService.convertMillisecondsToNights(averageDuration) // Result in milliseconds
}
function _getOrderStatusBreakdown(orders) {
  const statusCounts = {}
  orders.forEach(order => {
    const { status } = order
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  })
  return statusCounts;
}


////// Not - loggedin
// productId=578700489517829279&
// checkin=2024-02-02&
// checkout=2024-02-07&
// numberOfGuests=1&
// numberOfAdults=1&
// numberOfChildren=0&
// numberOfInfants=0&
// numberOfPets=0&
// guestCurrency=ILS&isWorkTrip=false

///// loggedin
//www.airbnb.com/book/stays/50191282?
// numberOfAdults=1&
// numberOfChildren=0&
// numberOfInfants=0&
// numberOfPets=0&
// checkin=2024-02-01&
// checkout=2024-02-06&
// guestCurrency=ILS&
// productId=50191282&
// numberOfGuests=1&
// photoId=1191521399&
// orderId=1077300159274466394