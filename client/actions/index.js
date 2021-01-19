import { getFruits } from '../apis/fruits'
import { getFourSquare } from '../apis/fourSquare'

export const SET_FRUITS = 'SET_FRUITS'
export const SET_PLACES = 'SET_PLACES'

// FourSquares Actions
export function setPlaces(places) {
  return {
    type: SET_PLACES,
    places
  }
}

export function fetchFourSquare(city) {
  return dispatch => {
    getFourSquare(city)
      .then(places => {
        dispatch(setPlaces(places))
        return null
      })
  }
}

// DB
export function setFruits(fruits) {
  return {
    type: SET_FRUITS,
    fruits
  }
}

export function fetchFruits() {
  return dispatch => {
    return getFruits()
      .then(fruits => {
        dispatch(setFruits(fruits))
        return null
      })
  }
}
