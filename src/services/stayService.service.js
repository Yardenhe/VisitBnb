import PropTypes from 'prop-types'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const stayService = {
	query,
	get,
	remove,
	save,
	getEmptyStay,
	getLoggedUser,
	// getStayFromSearchParams,
	// getSortFromParams,
	getUnreadCount,
}
export const stay1 = {
  _id: "s101",
  name: "Ribeira Charming Duplex",
  type: "House",
  imgUrls: [
    "https://a0.muscache.com/im/pictures/dc89cf8d-6d45-4db8-acb0-e8331150d725.jpg?im_w:960",
    "https://a0.muscache.com/im/pictures/3ecf9b60-50a1-4a8b-9aa5-7f7c9bd2defa.jpg?im_w:480",
    "https://a0.muscache.com/im/pictures/e362a6b6-ef1e-43c5-9186-ac26abf2994e.jpg?im_w:480",
    "https://a0.muscache.com/im/pictures/c566639d-6444-458e-83e1-2ec903f59e36.jpg?im_w:480",
    "https://a0.muscache.com/im/pictures/miso/Hosting-48086771/original/45f8627a-db65-426e-aab5-8018b4b40e17.jpeg?im_w:1200",
  ],
  price: 80.00,
  summary: "Fantastic duplex apartment...",
  capacity: 8,
  amenities: [
    "TV",
    "Wifi",
    "Kitchen",
    "Smoking allowed",
    "Pets allowed",
    "Cooking basics"
  ],
  labels: [
    "Top of the world",
    "Trending",
    "Play",
    "Tropical"
  ],
  host: {
    _id: "u101",
    fullname: "Davit Pok",
    imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy:profile_small",
  },
  loc: {
    country: "Portugal",
    countryCode: "PT",
    city: "Lisbon",
    address: "17 Kombo st",
    lat: -8.61308,
    lng: 41.1413
  },
  reviews: [
    {
      id: "madeId",
      txt: "Very helpful hosts. Cooked traditional...",
      rate: 4,
      by: {
        _id: "u102",
        fullname: "user2",
        imgUrl: "/img/img2.jpg"
      }
    }
  ],
  likedByUsers: ['mini-user']
}
const STAY_KEY = 'stayDB'
const loggedInUser = {
}
// Init demo data here
_createStays()


async function query(){   //filterBy = {}, sortBy = getDefaultSort()) {
	let stays = await storageService.query(STAY_KEY)
	// stays = _filterStays(stays, filterBy)
	// _sortStays(stays, sortBy)
	return stays
}

function get(stayId) {
	return storageService.get(STAY_KEY, stayId)
}

async function getUnreadCount() {
	const stays = await storageService.query(STAY_KEY)
	return stays.filter(stay => !stay.isRead).length
}

function remove(stayId) {
	return storageService.remove(STAY_KEY, stayId)
}

function save(stay) {
	if (stay.id) {
		return storageService.put(STAY_KEY, stay)
	} else {
		stay.from = getLoggedUser().estay
		return storageService.post(STAY_KEY, stay)
	}
}



function getEmptyStay(
	{_id= "",
  name= "",
  type= "",
  imgUrls= [],
  price= null,
  summary= "",
  capacity= null,
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
    lat: null,
    lng: null
  }}
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
  //   likedByUsers= ['mini-user']
) {
	return {
    _id,
    name,
    type,
    imgUrls,
    price,
    summary,
    capacity,
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

// function getDefaultFilter() {
// 	return {
// 		status= 'inbox',
// 		txt= '',
// 		isRead= null,
// 		isStarred= null,
// 		labels= []
// 	}
// }

// function getDefaultSort() {
// 	return {
// 		by= 'date',
// 		dir= 1
// 	}
// }

// function getFilterFromParams(searchParams, folder) {
// 	// console.log('folder', folder);
// 	const filterBy = {
// 		status= folder,
// 		txt= searchParams.get('txt') || '',
// 		isRead= searchParams.get('isRead') || null,
// 		isStarred= searchParams.get('isStarred') || null,
// 		labels= searchParams.get('labels') || []
// 	}
// 	// console.log('filterBy from params', filterBy);
// 	// for (const field in defaultFilter) {
// 	// 	filterBy[field] = searchParams.get(field) || ''
// 	// }
// 	return filterBy
// }

// function getSortFromParams(searchParams) {
// 	const sort = getDefaultSort()
// 	//Allow Changing only wanted fields in the sort obj
// 	sort.by = searchParams.get('sortBy') || 'date'
// 	return sort
// }

// function getStayFromSearchParams(searchParams = { get: () => { } }) {
// 	const stay = getEmptyStay()
// 	// Change only wanted fields in the stay obj
// 	stay.subject = searchParams.get('subject') || ''
// 	stay.body = searchParams.get('body') || ''
// 	stay.to = searchParams.get('to') || ''
// 	return stay
// }



// function _filterStays(stays, filterBy) {
// 	if (filterBy.status) {
// 		stays = _filterStaysByFolder(stays, filterBy.status)
// 	}
// 	if (filterBy.txt) {
// 		const regExp = new RegExp(filterBy.txt, 'i')
// 		stays = stays.filter(stay => regExp.test(stay.subject) || regExp.test(stay.body) || regExp.test(stay.from))
// 	}
// 	if (filterBy.isRead !== null && filterBy.isRead !== undefined) {
// 		stays = stays.filter(stay => stay.isRead === filterBy.isRead)
// 	}
// 	return stays

// }



// function _sortStays(stays, sortBy) {
// 	if (sortBy.by === 'date') {
// 		stays.sort((stay1, stay2) => (stay2.sentAt - stay1.sentAt) * sortBy.dir)
// 	} else if (sortBy.by === 'starred') {
// 		stays.sort((stay1, stay2) => (stay2.isStarred - stay1.isStarred) * sortBy.dir)
// 	} else if (sortBy.by === 'read') {
// 		stays.sort((stay1, stay2) => (stay1.isRead - stay2.isRead) * sortBy.dir)
// 	} else if (sortBy.by === 'subject') {
// 		stays.sort((stay1, stay2) => stay1.subject.localeCompare(stay2.subject) * sortBy.dir)
// 	}
// }

function _createStay() {
	const stay = getEmptyStay(stay1)
  console.log('stay', stay);
	stay._id = utilService.makeId()
	return stay
}

function _createStays() {
	let stays = utilService.loadFromStorage(STAY_KEY)
	if (!stays || !stays.length) {
    stays = []
    stays.push(_createStay())
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