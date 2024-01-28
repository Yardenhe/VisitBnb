export const utilService = {
	makeId,
	makeLorem,
	getRandomIntInclusive,
	getRandomColor,
	padNum,
	getDayName,
	getMonthName,
	saveToStorage,
	loadFromStorage,
	saveToStorage,
	getMonthShortName,
	debounce,
	debouncePromise,
	validateMail,
	formatOrderDate,
	getSymbolCurrency,
	formatDate,
	calculateTimeAgo,
	calculateNightsBetweenDates,
	convertMillisecondsToNights,
	checkClassNameByTitle
	// pluralizeLabel,
}
export function pluralizeLabel(num, label) {
	return `${num} ${label}${(+num <= 1) ? '' : 's'}`
}

function makeId(length = 6) {
	var txt = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length))
	}

	return txt
}

function makeLorem(size = 100) {
	var words = [
		'sky',
		'above',
		'port',
		'was',
		'television',
		'tuned',
		'to',
		'channel',
		'all',
		'baby',
		'thing',
		'happened',
		'less',
		'I',
		'had',
		'story',
		'bit',
		'people',
		'and',
		'generally',
		'happens',
		'cases',
		'time',
		'it',
		'was',
		'story',
		'It',
		'was',
		'pleasure',
		'to',
		'burn',
	]
	var txt = ''
	while (size > 0) {
		size--
		txt += words[Math.floor(Math.random() * words.length)] + ' '
	}
	return txt.slice(0, -1)
}


function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function padNum(num) {
	return num > 9 ? num + '' : '0' + num
}

function getRandomColor() {
	const letters = '0123456789ABCDEF'
	var color = '#'
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

function getDayName(date, locale) {
	date = new Date(date)
	return date.toLocaleDateString(locale, { weekday: 'long' })
}

function getMonthName(date) {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	return monthNames[date.getMonth()]
}

function formatOrderDate(timeStamp) {
	const date = new Date(timeStamp)
	const year = date.getFullYear()
	const today = new Date().getFullYear()
	if (today > year) {
		const yy = date.getFullYear().toString().slice(2)
		let mm = padNum(date.getMonth() + 1) // months start at 0!
		let dd = padNum(date.getDate())

		return dd + '/' + mm + '/' + yy
	}
	return getMonthShortName(date.getMonth()) + ' ' + date.getDate()
}

function formatDate(date) {
	if (!date) return ''

	date = new Date(date)
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}



/* receives a month number (0-11) and returns short month name*/
function getMonthShortName(monthNum) {
	const date = new Date()
	date.setMonth(monthNum)
	return date.toLocaleString('en-US', { month: 'short' })
}

function saveToStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
	const data = localStorage.getItem(key)
	return data ? JSON.parse(data) : undefined
}

function debounce(func, timeout = 500) {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

function debouncePromise(func, timeout = 500) {
	let timer

	return (...args) => {
		clearTimeout(timer)
		return new Promise(resolve => {
			timer = setTimeout(() => resolve(func(...args)), timeout)
		})
	}
}

function validateMail(mail) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
}

function getSymbolCurrency(currency) {
	switch (currency) {
		case 'USD':
			return String.fromCharCode(0x0024)
			break
		case 'EUR':
			return String.fromCharCode(0x20ac)
			break
		case 'ILS':
			return String.fromCharCode(0x20aa)
			break
	}
}

function calculateTimeAgo(timestamp) {
	const currentDate = new Date();
	const pastDate = new Date(timestamp);

	const timeDifference = currentDate - pastDate;
	// changing units to days
	const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

	if (daysDifference <= 30) {
		return `${daysDifference} days ago`;
	} else {
		const monthNames = [
			'January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'
		];

		const year = pastDate.getFullYear();
		const month = pastDate.getMonth();

		return `${monthNames[month]} ${year}`;
	}
}

function calculateNightsBetweenDates(startDate, endDate) {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const nights = Math.round(Math.abs((start - end) / oneDay));

	return nights;
}

function convertMillisecondsToNights(milliseconds) {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const nights = Math.round(milliseconds / oneDay);
	return nights;
}
function checkClassNameByTitle(title) {
	switch (title) {
		case 'Approved':
			return 'approved-green'
		case 'Rejected':
			return 'rejected-red'
		case 'Pending':
			return 'pending-orange'
		case 'approved':
			return 'approved-green'
		case 'rejected':
			return 'rejected-red'
		case 'pending':
			return 'pending-orange'
		default:
			break;
	}
}