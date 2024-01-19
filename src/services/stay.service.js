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
}

const BASE_URL = 'stay/'
const STAY_KEY = 'stayDB'
const loggedInUser = {
}
// _createStays()

// READ
async function query(filterBy = {}){   //, sortBy = getDefaultSort()) {
  try{
    const stays = await httpService.get(BASE_URL, filterBy)
    return stays
  } catch(err){
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
  const url = BASE_URL+stayId
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
	_id= "",
  name= "",
  type= "",
  imgUrls= [],
  price= 100,
  summary= "",
  capacity= 0,
  beds=0,
  bedrooms=0,
  bathrooms=0,
  amenities= [],
  labels= [],
  host= {
    _id: "",
    fullname: "",
    imgUrl: "",
  },
  loc= {
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

function getDefaultFilter() {
  return {
      type: '',
      price: '',
  }
}

function _filterStays(stays, filterBy) {
  let {  type = '', price = '' } = filterBy
	if (filterBy.type) {
		stays = stays.filter(stay => stay.type.toLowerCase().includes(type.toLowerCase()))
	}
	// if (filterBy.txt) {
	// 	const regExp = new RegExp(filterBy.txt, 'i')
	// 	stays = stays.filter(stay => regExp.test(stay.subject) || regExp.test(stay.body) || regExp.test(stay.from))
	// }
	// if (filterBy.isRead !== null && filterBy.isRead !== undefined) {
	// 	stays = stays.filter(stay => stay.isRead === filterBy.isRead)
	// }
	return stays

}

function _createStay() {
	const stay = getEmptyStay()
  console.log('stay', stay);
	// stay._id = utilService.makeId()
	return stay
}


function _createStays() {
	let stays = utilService.loadFromStorage(STAY_KEY)
	if (!stays || !stays.length) {
    stays = staysData
    //stays.push(_createStay())
		utilService.saveToStorage(STAY_KEY, stays)
	}
}



  
// const users = [
//     {
//       _id= "u101",
//       fullname= "User 1",
//       imgUrl= "/img/img1.jpg",
//       username= "user1",
//       password= "secret"
//     },
//     {
//       _id= "u102",
//       fullname= "User 2",
//       imgUrl= "/img/img2.jpg",
//       username= "user2",
//       password= "secret",
//     }
//   ]
  // Homepage= TOP categories= Best Rate / Houses / Kitchen  - show all - link to Explore
  // Renders a <StayList> with <StayPreview> with Link to <StayDetails>   url= /stay/123
  // See More => /explore?topRate=true
  // See More => /explore?type=House
  // See More => /explore?amenities=Kitchen
  // Explore page=
  // stayService.query({type= 'House'})
  
  // UserDetails
  //  basic info
  //  visitedStays => orderService.query({userId= 'u101'})
  //  myStayOrders => orderService.query({hostId= 'u101'})
  //  ownedStays => stayService.query({hostId= 'u103'})
  
  // StayEdit - make it super easy to add Stay for development
  // StayList, StayPreview
  // Order, confirm Order
  // Lastly= StayExplore, Filtering
  
  
  
  // Example - figuring up if the user is an owner=
  // userService.login()
    //  const userStays = stayService.query({ownerId= loggeinUser._id})
    //  loggeinUser.isOwner = userStays.length > 0
  



  // _id= "",
  // name= "",
  // type= "",
  // imgUrls= [],
  // price= null,
  // summary= "",
  // capacity= null,
  // amenities= [],
  // labels= [],
  // host= {
  //   _id: "",
  //   fullname: "",
  //   imgUrl: "",
  // },
  // loc= {
  //   country: "",
  //   countryCode: "",
  //   cit: "",
  //   address: "",
  //   lat: null,
  //   lng: null
  // },
  // reviews= [
  //   {
  //     id: "",
  //     txt: "",
  //     rate: null,
  //     by: {
  //       _id: "",
  //       fullname: "",
  //       imgUrl: ""
  //     }
  //   }
  //   ],
  // likedByUsers= ['mini-user']