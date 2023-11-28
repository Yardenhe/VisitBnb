import { stayService } from '../../services/stayService.service'

export const SET_STAYS = 'SET_STAYS'
export const ADD_STAY = 'ADD_STAY'
export const REMOVE_STAY = 'REMOVE_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const UNDO_CHANGES = 'UNDO_CHANGES'

const initialState = {
    stays: null,
   // filterBy: stayService.getDefaultFilter(),
    lastStays: []
}

export function stayReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_STAYS:
            return {
                ...state,
                stays: action.stays
            }
        case ADD_STAY:
            return {
                ...state,
                stays: [...state.stays, action.stay]
            }

        case REMOVE_STAY:
            const laststays = [...state.stays]
            return {
                ...state,
                stays: state.stays.filter(stay => stay.id !== action.stayId),
                laststays

            }
        case UPDATE_STAY:
            return {
                ...state,
                stays: state.stays.map(stay => stay.id === action.stay.id ? action.stay : stay)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }
        case UNDO_CHANGES:
            return {
                ...state,
                stays: [...state.lastStays]
            }
        default:
            return state
    }
}