import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service'


export const stayService = {
  query,
  remove,
  getById,
  save,
  getEmptyStay,
  getLoggedUser,
  getFilterFromParams,
  // getStayFromSearchParams,
  // getSortFromParams,
  getStayCount,
  calculateBookingCost
}

const BASE_URL = 'stay/'
const STAY_KEY = 'stayDB'
const loggedInUser = {
}
// _createStays()

// READ
async function query(filterBy = {}) {   //, sortBy = getDefaultSort()) {
  try {
    const stays = await httpService.get(BASE_URL, filterBy)
    return stays
  } catch (err) {
    throw err
  }
}
// READ - getById
async function getById(stayId) {
  const url = BASE_URL + stayId
  return await httpService.get(url)
}
// DELETE
async function remove(stayId) {
  const url = BASE_URL + stayId
  return await httpService.delete(url)
}
// CREATE / UPDATE
async function save(stay) {
  const method = stay._id ? 'put' : 'post'
  return await httpService[method](BASE_URL, stay)
}
//
// OTHER
//
function getEmptyStay(
  _id = "",
  name = "",
  type = "",
  imgUrls = [],
  price = 100,
  summary = "",
  propertyType = "",
  capacity = 0,
  beds = 0,
  bedrooms = 0,
  bathrooms = 0,
  amenities = [],
  labels = [],

  host = {
    _id: "",
    fullname: "",
    imgUrl: "",
  },
  loc = {
    country: "",
    countryCode: "",
    cit: "",
    address: "",
    lat: 0,
    lng: 0
  }
) {
  return {
    _id,
    name,
    type,
    imgUrls,
    price,
    summary,
    propertyType,
    capacity,
    beds,
    bedrooms,
    bathrooms,
    amenities,
    labels,
    host,
    loc,
    // reviews,
    // likedByUsers
  }
}

function getLoggedUser() {
  return loggedInUser
}

function getFilterFromParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }

  return filterBy
}
async function getStayCount(filterBy) {
  try {
    const { count } = await httpService.get(BASE_URL + 'count', filterBy)
    return count
  } catch (err) {
    throw err
  }
}

function getDefaultFilter() {
  return {
    // type: '',
    // price: '',
  }
}

// function _filterStays(stays, filterBy) {
//   let { type = '', price = '' } = filterBy
//   if (filterBy.type) {
//     stays = stays.filter(stay => stay.type.toLowerCase().includes(type.toLowerCase()))
//   }

//   return stays

// }

// // function _createStay() {
// //   const stay = getEmptyStay()
// //   console.log('stay', stay);
// //   // stay._id = utilService.makeId()
// //   return stay
// // }



// // function _createStays() {
// //   let stays = utilService.loadFromStorage(STAY_KEY)
// //   if (!stays || !stays.length) {
// //     stays = staysData
// //     //stays.push(_createStay())
// //     utilService.saveToStorage(STAY_KEY, stays)
// //   }
// }

function calculateBookingCost(pricePerNight,numberOfNights) {
console.log("🚀 ~ calculateBookingCost ~ pricePerNight:", pricePerNight)

  const nightsCost = pricePerNight * numberOfNights
  const serviceFeeMultiplier = 0.15
  const taxesMultiplier = 0.17

  const serviceFee = nightsCost * serviceFeeMultiplier
  const taxes = nightsCost * taxesMultiplier
  const totalPrice = nightsCost + serviceFee + taxes

  return {
    nightsCost,
    serviceFee:(serviceFee % 1 === 0) ? serviceFee :serviceFee.toFixed(2),
    taxes:(taxes % 1 === 0) ? serviceFee :taxes.toFixed(2),
    totalPrice:(totalPrice % 1 === 0) ? totalPrice :totalPrice.toFixed(2),
  };
}


