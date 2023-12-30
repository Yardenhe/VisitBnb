import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";

const orderData = [
    {
      "_id": "o1225",
      "hostId": "u102",
      "buyer": {
        "_id": "u101",
        "fullname": "User 1"
      },
      "totalPrice": 160,
      "startDate": "2025/10/15",
      "endDate": "2025/10/17",
      "guests": {
        "adults": 1,
        "kids": 2
      },
      "stay": {
        "_id": "h102",
        "name": "House Of Uncle My",
        "price": 80.00
      },
      "msgs": [],
      "status": "pending" 
    },
    {
      "_id": "o12s",
      "hostId": "u102",
      "buyer": {
        "_id": "u101",
        "fullname": "User 1"
      },
      "totalPrice": 160,
      "startDate": "2025/10/15",
      "endDate": "2025/10/17",
      "guests": {
        "adults": 1,
        "kids": 2
      },
      "stay": {
        "_id": "h102",
        "name": "House Of Uncle My",
        "price": 80.00
      },
      "msgs": [],
      "status": "pending" 
    }
  ]
  // order status: pending ,approved, rejected
const STORAGE_KEY = 'orderDB'

export const orderService = {
  query,
  getById,
  save,
  remove,
  getEmptyOrder,
  getOrderFromParams,
}

_createOrders()

// Read
async function query(){
	const orders = await storageService.query(STORAGE_KEY)
  console.log('ordersFromQuery',orders);
	return orders
}
// Read - getById
function getById(orderId) {
	return storageService.get(STAY_KEY, orderId)
}
// Create / Update
async function save(order) {
  console.log('service',order);
  let method = order.id ? 'put' : 'post'
  return await storageService[method](STORAGE_KEY, order)
	// if (order.id) {
	// 	return storageService.put(STORAGE_KEY, order)
	// } else {
	// 	return storageService.post(STORAGE_KEY, order)
	// }
}
// Delete
async function remove(orderId){
  return await storageService.remove(orderId)
}


function getEmptyOrder(){
  return {
    // _id: "",
    // hostId: "",
    // buyer: {
    //   _id: "",
    //   fullname: "",
    // },
    totalPrice: 0,
    startDate: "",
    endDate: "",
    guests: {
      adults: 0,
      kids: 0,
    }
  //   ,
  //   stay: {
  //     _id: "",
  //     name: "",
  //     price: 0,
  //   },
  //   msgs: [],
  //   status: "",
  };
}

function _createOrders(){
  let orders = utilService.loadFromStorage(STORAGE_KEY)
  if(!orders || !orders.length) {
    orders = orderData
    utilService.saveToStorage(STORAGE_KEY,orders)
  }
}

function getOrderFromParams(searchParams) {
  const defaultOrder = getEmptyOrder()
  const order = {}
  for (const field in defaultOrder) {
      order[field] = searchParams.get(field) || ''
  }
  return order
}

// search criteria result
// .com/?
// tab_id=home_tab
// &refinement_paths%5B%5D=%2Fhomes
// &search_mode=flex_destinations_search
// &flexible_trip_lengths%5B%5D=one_week
// &location_search=MIN_MAP_BOUNDS
// &monthly_start_date=2024-01-01
// &monthly_length=3
// &category_tag=Tag%3A8225
// &price_filter_input_type=0
// &channel=EXPLORE
// &date_picker_type=calendar

// &checkin=2023-12-29
// &checkout=2023-12-31
// &adults=1
// &children=1
// &infants=1

// &source=structured_search_input_header
// &search_type=filter_change


// result from cirteria
//.com/rooms/32269342?
// adults=1
// &infants=1
// &children=1
// &check_in=2023-12-29
// &check_out=2023-12-31

// &category_tag=Tag%3A8225
// &enable_m3_private_room=true
// &photo_id=677545651
// &search_mode=flex_destinations_search
// &source_impression_id=p3_1703853554_AHRccZ4Lk%2BEo%2Ffl6
// &previous_page_section_name=1000
// &federated_search_id=1fdb5204-b66e-41f9-81b5-b652d02c84ce

// PROCEED WITH ORDER
//.com/book/stays/32269342?
// numberOfAdults=1
// &numberOfChildren=1
// &numberOfInfants=1
// &checkin=2023-12-29
// &checkout=2023-12-31
// &guestCurrency=ILS
// &productId=32269342
// &isWorkTrip=false
// &numberOfGuests=1
// &numberOfPets=0
// &photoId=677545651