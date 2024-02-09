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
  getOrdersInsights,
  getOrdersInsightsPie,

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
    // buyer: {
    //   _id: "",
    //   fullname: "",
    // },
    totalPrice: 0,
    startDate: "",
    endDate: "",
    guests: {
      adults: 1,
      children: 0,
      infants: 0,
      pets: 0
    }
    ,
    stay: {
      _id: "",
      name: "",
      price: 0,
    },
    hostId: ""
    // msgs: [],
    // status: "pending",
  };
}


function getOrderFromParams(searchParams) {
  const defaultOrder = getEmptyOrder()
  const order = {}
  for (const field in defaultOrder) {
    order[field] = searchParams.get(field) || ''
  }
  return order
}

function getTotalguests(guests) {
  return Object.values(guests).reduce((totalGuests, value) => totalGuests + value, 0)
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

function getOrdersInsightsPie(orders) {
  return {
    guestPieData: _calculateGuestsSum(orders),
    otherPieData: _calculateOtherPieData(orders),
  }
}
function _calculateOtherPieData(orders) {

  return [{ id: 0, value: 5, label: 'completions' }, { id: 1, value: 2, label: 'not-completed' }]
}
function _calculateGuestsSum(orders) {
  const guestSum = {
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  }

  orders.forEach((order) => {
    const { guests } = order;

    guestSum.adults += guests.adults || 0;
    guestSum.children += guests.children || 0;
    guestSum.infants += guests.infants || 0;
    guestSum.pets += guests.pets || 0;
  })

  const resultArray = Object.entries(guestSum).map(([label, value], id) => ({ id, value, label }));

  return resultArray;
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

  if (durations.length === 0) return 0
  const averageDuration = durations.reduce((total, duration) => total + duration, 0) / durations.length;

  return utilService.convertMillisecondsToNights(averageDuration)// Result in milliseconds
}
function _getOrderStatusBreakdown(orders) {
  const statusCounts = {}
  orders.forEach(order => {
    const { status } = order
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  })
  return statusCounts;
}
