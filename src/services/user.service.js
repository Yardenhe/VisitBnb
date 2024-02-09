import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

const BASE_USER_URL = 'user/'
const BASE_AUTH_URL = 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    getEmptyUser,
    getLoginForm,
    getSignupForm
}

// window.userService = userService

async function getUsers() {
    return await httpService.get(BASE_USER_URL)
}

async function getById(userId) {
    return await httpService.get(BASE_USER_URL + userId)
}

async function remove(userId) {
    return await httpService.remove(BASE_USER_URL + userId)
}

async function update(userToUpdate) {


    const updatedUser = await httpService.put(BASE_USER_URL, userToUpdate)
    if (getLoggedinUser()._id === updatedUser._id) saveLocalUser(updatedUser)
    return updatedUser
}

async function login(credentials) {
    const user = await httpService.post(BASE_AUTH_URL + 'login', credentials)
    if (user) {
        return saveLocalUser(user)
    }
    return null
}

async function signup(credentials) {

    const user = await httpService.post(BASE_AUTH_URL + 'signup', credentials)
    return saveLocalUser(user)
}

async function logout() {
    await httpService.post(BASE_AUTH_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getEmptyUser() {
    return {
        fullname: '',
        email: '',
        password: '',
        pictureUrl: '',
    }
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, pictureUrl: user.pictureUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getSignupForm() {
    return {
        fullname: 'Full name',
        email: 'Email',
        password: 'Password'
    }
}

function getLoginForm() {
    return {
        email: 'Email',
        password: 'Password'
    }
}
