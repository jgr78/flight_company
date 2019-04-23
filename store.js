import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {API_URL, API_FLIGHTS_URL, ERROR_MESSAGES, RESULTS_PAGE} from './config/properties'

import Router from 'next/router'


export const directionTypes = {
  FROM: 'FROM',
  TO: 'TO',
}

export const sortTypes = ['Best', 'Cheapest first', 'Fastest first']

export const dateTypes = {
  DEPART: 'DEPART',
  RETURN: 'RETURN',
}


const initialState = {
  airports: [],
  loading: false,
  error: '',
  [directionTypes.FROM]: [],
  [directionTypes.TO]: [],
  ['selected_' + directionTypes.FROM]: {},
  ['selected_' + directionTypes.TO]: {},
  [dateTypes.DEPART]: '',
  [dateTypes.RETURN]: '',
  search_text: '',
  loading_flights: false,
  flights: [],
  sortby: 'Best',
  min_price: 0,
  max_price: 0,
  min_duration: 0,
  max_duration: 0,
  min_price_selected: 0,
  max_price_selected: 0,
  min_duration_selected: 0,
  max_duration_selected: 0,
}

export const actionTypes = {
  FETCH_AIRPORTS_BEGIN: 'FETCH_AIRPORTS_BEGIN',
  FETCH_AIRPORTS_SUCCESS: 'FETCH_AIRPORTS_SUCCESS',
  FETCH_AIRPORTS_FAILURE: 'FETCH_AIRPORTS_FAILURE',
  RESET_AIRPORTS: 'RESET_AIRPORTS',
  PICKUP_AIRPORT: 'PICKUP_AIRPORT',
  PICKUP_DATE: 'PICKUP_DATE',
  SHOW_ERROR: 'SHOW_ERROR',

  FETCH_FLIGHTS_BEGIN: 'FETCH_FLIGHTS_BEGIN',
  FETCH_FLIGHTS_SUCCESS: 'FETCH_FLIGHTS_SUCCESS',
  FETCH_FLIGHTS_FAILURE: 'FETCH_FLIGHTS_FAILURE',
  UPDATE_FILTERS: 'UPDATE_FILTERS',
  UPDATE_PARAMETERS: 'UPDATE_PARAMETERS',
  RESET: 'RESET',

}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PARAMETERS:
    return {
      ...state,
      min_duration_selected: action.min_duration,
      max_duration_selected: action.max_duration,
      min_price_selected: action.min_price,
      max_price_selected: action.max_price
    }

    case actionTypes.UPDATE_FILTERS:
    return {
      ...state,
      sortby: action.sortby,
      search_text: action.sortby
    }
    case actionTypes.SHOW_ERROR:
    return {
      ...state,
      error: action.error
    }
    case actionTypes.PICKUP_DATE:
    return {
      ...state,
      [action.depart]: action.date,
    };
    case actionTypes.PICKUP_AIRPORT:
    return {
      ...state,
      ['selected_' + action.direction]: action.airport,
      [action.direction]: [] 
    };

    case actionTypes.FETCH_AIRPORTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: ''
      };

    case actionTypes.FETCH_AIRPORTS_SUCCESS:
      return {
        ...state,
        loading: false,
        [action.direction]: action.airports,
        search_text: action.text,
        error: '',
      };
    case actionTypes.FETCH_AIRPORTS_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
    case actionTypes.RESET:
    return {
      ...state,
      airports: [],
      loading: false,
      error: '',
      [directionTypes.FROM]: [],
      [directionTypes.TO]: [],
      ['selected_' + directionTypes.FROM]: {},
      ['selected_' + directionTypes.TO]: {},
      [dateTypes.DEPART]: '',
      [dateTypes.RETURN]: '',
      search_text: '',
      loading_flights: false,
      flights: [],
      sortby: sortTypes[0],
      min_price: 0,
      max_price: 0,
      min_duration: 0,
      max_duration: 0,
      min_price_selected: 0,
      max_price_selected: 0,
      min_duration_selected: 0,
      max_duration_selected: 0,
    }
    /*
    case actionTypes.RESET_AIRPORTS:
      return {
        ...state,
        [action.direction]: []
      };  
      */
      case actionTypes.FETCH_FLIGHTS_BEGIN:
      return {
        ...state,
        loading_flights: true,
        error: ''
      };

      case actionTypes.FETCH_FLIGHTS_SUCCESS:
      return {
        ...state,
        loading_flights: false,
        flights: action.flights,
        max_duration: action.max_duration,
        min_duration: action.min_duration,
        max_price: action.max_price,
        min_price: action.min_price,
        error: (action.flights.length > 0) ? '' : ERROR_MESSAGES.no_flights
      };
    case actionTypes.FETCH_FLIGHTS_FAILURE:
    return {
      ...state,
      loading_flights: false,
      error: action.error,
    };    
    default:
      return state
  }
}

// ACTIONS
  export const selectDate = (date, depart) => dispatch => {
    return dispatch(pickUpDate(date, depart));
  }
  export const selectAirport = (airport, direction) => dispatch => {
    return dispatch(pickUpAirports(airport, direction));
  }
  export const searchAirport = (values, direction) => dispatch => {
    dispatch(fetchAirportsBegin());
    return fetch(`${API_URL}:${values}`)
      .then(res => res.json())
      .then(response => {
          return dispatch(fetchAirportsSuccess(response, direction, values));
      })
      .catch(error => dispatch(fetchAirportsFailure(error)))
  }
  export const checkValues = (data) => dispatch => {
    if (!data['selected_' + directionTypes.FROM].name || !data['selected_' + directionTypes.TO].name) {
      return dispatch(showError(ERROR_MESSAGES.empty_fields));
    }
    if (data['selected_' + directionTypes.FROM].city.length && data['selected_' + directionTypes.TO].city.length && data['selected_' + directionTypes.FROM].city === data['selected_' + directionTypes.TO].city) {
      return dispatch(showError(ERROR_MESSAGES.same_city));
    }

    if ( !Object.keys(data[dateTypes.DEPART]).length || !Object.keys(data[dateTypes.RETURN]).length ) {
      return dispatch(showError(ERROR_MESSAGES.empty_dates));
    }
    if(data[dateTypes.DEPART].diff( data[dateTypes.RETURN], 'days') > 0) {
      return dispatch(showError(ERROR_MESSAGES.return_earlier));
    }
    Router.push(RESULTS_PAGE, RESULTS_PAGE);
    return dispatch(searchFlights(data.sortby, data['selected_' + directionTypes.FROM].code, data['selected_' + directionTypes.TO].code, data.min_price_selected, data.max_price_selected, data.min_duration_selected, data.max_duration_selected ));
  }
  export const searchFlights = (sortby = "", from = "", to = "",  min_price_selected = 0, max_price_selected = 0,  min_duration_selected =  0, max_duration_selected = 0) => dispatch => {
     dispatch(fetchFlightsBegin());
    return fetch(`${API_FLIGHTS_URL}/:${sortby}/:${from}/:${to}/:${min_price_selected}/:${max_price_selected}/:${min_duration_selected}/:${max_duration_selected}`)
      .then(res => res.json())
      .then(response => {
          return dispatch(fetchFlightsSuccess(response));
      })
      .catch(error => dispatch(fetchFlightsFailure(error)))
  }
  export const changeFilter = (sortby, data) => dispatch => {
    dispatch(updateFilters(sortby));
    data.sortby = sortby;
    return dispatch(checkValues(data))
  }
     
  const appendItem = (min_duration, max_duration, min_price, max_price, dispatch) => new Promise((resolve, reject) => {
    // do anything here
    dispatch(updateParameters(min_duration, max_duration, min_price, max_price));
    resolve();
  });

  export const changeParameters = (min_duration, max_duration, min_price, max_price, data) => dispatch => {
    return appendItem(min_duration, max_duration, min_price, max_price, dispatch).then((res) => {
      let obj = Object.assign({}, data);
      obj.max_price_selected = max_price;
      obj.min_price_selected = min_price;
      obj.max_duration_selected = max_duration;
      obj.min_duration_selected = min_duration;
      dispatch(checkValues(obj));
    }) 
  }

  export const fetchFlightsBegin = () => dispatch => {
    return dispatch({ type: actionTypes.FETCH_FLIGHTS_BEGIN })
  }
  export const fetchFlightsSuccess = (data) => dispatch => {
    
    return dispatch({ type: actionTypes.FETCH_FLIGHTS_SUCCESS, flights: data.flights,  
      max_duration: data.max_duration,
      min_duration: data.min_duration,
      max_price: data.max_price,
      min_price: data.min_price
    })
  }
  export const fetchFlightsFailure = (error) => dispatch => {
    return dispatch({ type: actionTypes.FETCH_FLIGHTS_FAILURE, error: { error } })
  }
  export const resetStore = () => {
    return { type: actionTypes.RESET }
  }
  export const fetchAirportsBegin = () => dispatch => {
    return dispatch({ type: actionTypes.FETCH_AIRPORTS_BEGIN })
  }
  export const fetchAirportsSuccess = (airports, direction, text) => dispatch => {
    return dispatch({ type: actionTypes.FETCH_AIRPORTS_SUCCESS, airports, direction, text })
  }
  export const fetchAirportsFailure = (error) => dispatch => {
    return dispatch({ type: actionTypes.FETCH_AIRPORTS_FAILURE, error: { error } })
  }
  export const resetAirports = (direction) => dispatch => {
    return dispatch({type: actionTypes.RESET_AIRPORTS, direction})
  }
  export const pickUpAirports = (airport, direction) => dispatch => {
    return dispatch({ type: actionTypes.PICKUP_AIRPORT, airport, direction })
  }
  export const pickUpDate = (date, depart) => dispatch => {
    return dispatch({ type: actionTypes.PICKUP_DATE, date, depart })
  }
  export const showError = (error) => dispatch => {
    return dispatch({ type: actionTypes.SHOW_ERROR, error })
  }
  export const updateFilters = (sortby) => dispatch => {
    return dispatch({ type: actionTypes.UPDATE_FILTERS, sortby })
  }
  export const updateParameters = (min_duration, max_duration, min_price, max_price) => dispatch => {
    return dispatch({ type: actionTypes.UPDATE_PARAMETERS, min_duration, max_duration, min_price, max_price})
  }

  export function initializeStore (initialState = initialState) {
    return createStore(
      reducer,
      initialState,
      composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
  }
