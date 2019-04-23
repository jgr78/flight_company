import { actionTypes, directionTypes, dateTypes, selectDate, selectAirport, searchAirport, searchFlights, checkValues, changeFilter, sortTypes, changeParameters, fetchFlightsBegin, fetchFlightsSuccess, fetchFlightsFailure, resetStore, fetchAirportsBegin, fetchAirportsSuccess, fetchAirportsFailure, pickUpAirports, pickUpDate } from '../store'
import thunk from 'redux-thunk';
import configureMockStore from "redux-mock-store";
import { ERROR_MESSAGES } from '../config/properties';
import moment from 'moment'
export const mockStore = configureMockStore([thunk]);
const now = moment();
const initialState = {     
  airports: [],
  loading: false,
  error: '',
  [directionTypes.FROM]: [],
  [directionTypes.TO]: [],
  ['selected_' + directionTypes.FROM]:  {name: "London", city: "London"},
  ['selected_' + directionTypes.TO]:  {name: "Madrid", city: "Madrid"},
  [dateTypes.DEPART]: now.toDate(),
  [dateTypes.RETURN]: now.toDate(),
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
  max_duration_selected: 0,};

describe('Reducers tests', () => {
  const store = mockStore();
  beforeEach(() => { 
    store.clearActions();
  });

  test('Dispatches the correct action for PICKUP_DATE', () => {
    const expectedActions = [
      {
        'type': actionTypes.PICKUP_DATE,
         'date': '1/1/2020',
         'depart': '1/1/2020'
      },
    ];
    store.dispatch(selectDate('1/1/2020','1/1/2020'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action for PICKUP_AIRPORT', () => {
    const expectedActions = [
      {
        'type': actionTypes.PICKUP_AIRPORT,
        "direction": "FROM",
        "airport": {"name": "London","code": "ANY","city": "London","type": 'city',"country": "United Kingdom"},
      },
    ];
    store.dispatch(selectAirport({"name": "London","code": "ANY","city": "London","type": 'city',"country": "United Kingdom"}, directionTypes.FROM));
    expect(store.getActions()).toEqual(expectedActions);
  });


  test('Dispatches the correct action for FETCH_AIRPORTS_BEGIN', () => {
    const expectedActions = [
      {
         "type":  actionTypes.FETCH_AIRPORTS_BEGIN,
      },
    ];
    store.dispatch(searchAirport("LON", directionTypes.FROM));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action for SHOW_ERROR same city', () => {
    const expectedActions = [
      {
         "type": actionTypes.SHOW_ERROR,
         "error": ERROR_MESSAGES.same_city,
      },
    ];
    const aux = {
       ['selected_' + directionTypes.FROM]: {name: "Luton", city: "London"},
       ['selected_' + directionTypes.TO]: {name: "LCY", city: "London"}
    }
    store.dispatch(checkValues(aux));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action for FETCH_FLIGHTS_BEGIN', () => {
    const expectedActions = [
      {
         "type": actionTypes.FETCH_FLIGHTS_BEGIN,
      },
    ];
    const aux = {
       ['selected_' + directionTypes.FROM]: {name: "Madrid", city: "Madrid"},
       ['selected_' + directionTypes.TO]: {name: "LCY", city: "London"},
       [dateTypes.DEPART]: new Date(),
       [dateTypes.RETURN]: new Date(),
    }
    const sortby ="Best";
    const from = {name: "Madrid", city: "Madrid"}
    const to = {name: "London", city: "London"}
    const min_price_selected = 0
    const max_price_selected = 0
    const min_duration_selected = 0
    const max_duration_selected = 0
    store.dispatch(searchFlights(sortby, from, to,  min_price_selected, max_price_selected,  min_duration_selected, max_duration_selected));    
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action for SHOW_ERROR no date selected', () => {
    const expectedActions = [
      {
         "type": "SHOW_ERROR",
         "error": ERROR_MESSAGES.empty_dates,
      },
    ];
    store.dispatch(checkValues(initialState));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action for UPDATE_FILTERS', () => {
    const expectedActions = [
      {
        "sortby": sortTypes[0],
        "type": actionTypes.UPDATE_FILTERS,
      },
      {
        "error": ERROR_MESSAGES.empty_dates,
        "type": actionTypes.SHOW_ERROR,
      },
    ];
    store.dispatch(changeFilter(sortTypes[0], initialState));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
    expect(store.getActions()[1]).toEqual(expectedActions[1]);
  });

  test('Dispatches the correct action for SHOW_ERROR no date selected', () => {
    const expectedActions = 
      {
        "max_duration": 1,
        "max_price": 3,
        "min_duration": 0,
        "min_price": 2,
        "type": actionTypes.UPDATE_PARAMETERS,
      }
    ;
    const min_duration = 0, max_duration = 1, min_price = 2 , max_price = 3
    store.dispatch(changeParameters(min_duration, max_duration, min_price, max_price, initialState));
    expect(store.getActions()[0]).toEqual(expectedActions);
  });

  test('Dispatches the correct action for SHOW_ERROR same city', () => {
    const expectedActions = [
      {
         "type": actionTypes.FETCH_FLIGHTS_BEGIN,
      },
    ];
    store.dispatch(fetchFlightsBegin(initialState));
  const actions = store.getActions();

    expect(store.getActions()).toEqual(expectedActions);
  });


  test('Dispatches the correct action for FETCH_FLIGHTS_SUCCESS same city', () => {
    const expectedActions = [
      {
        "flights":  [],
        "max_duration": 0,
        "max_price": 0,
        "min_duration": 0,
        "min_price": 0,
        "type": actionTypes.FETCH_FLIGHTS_SUCCESS,
      },
    ];
    store.dispatch(fetchFlightsSuccess(initialState));
    
    expect(store.getActions()).toEqual(expectedActions);
  });


  test('Dispatches the correct action for SHOW_ERROR same city', () => {
    const expectedActions = [
      {
        "type": actionTypes.FETCH_FLIGHTS_FAILURE,
        "error": {error: ERROR_MESSAGES.no_flights}
      },
    ];
    store.dispatch(fetchFlightsFailure(ERROR_MESSAGES.no_flights));
    
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action for SHOW_ERROR same city', () => {
    const expectedActions = [
      {
        "type": actionTypes.RESET,
      },
    ];
    store.dispatch(resetStore(initialState));
    
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action for FETCH_AIRPORTS_BEGIN same city', () => {
    const expectedActions = [
      {
        "type": actionTypes.FETCH_AIRPORTS_BEGIN,
      },
    ];
    store.dispatch(fetchAirportsBegin());
    
    expect(store.getActions()).toEqual(expectedActions);
  });


  test('Dispatches the correct action for FETCH_AIRPORTS_BEGIN same city', () => {
    const expectedActions = [
      {
        "airports": [
                 1,
                 2,
                 3,
               ],
               "direction": "FROM",
               "text": "abc",
               "type": actionTypes.FETCH_AIRPORTS_SUCCESS,
      },
    ];
    store.dispatch(fetchAirportsSuccess([1,2,3], directionTypes.FROM, "abc"));
    
    expect(store.getActions()).toEqual(expectedActions);
  });


  test('Dispatches the correct action for FETCH_AIRPORTS_FAILURE same city', () => {
    const expectedActions = [
      {
        "type": actionTypes.FETCH_AIRPORTS_FAILURE,
        error: { error: ERROR_MESSAGES.no_flights}
      },
    ];
    store.dispatch(fetchAirportsFailure(ERROR_MESSAGES.no_flights));
    
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action for FETCH_AIRPORTS_FAILURE same city', () => {
    const expectedActions = [
      {
        "airport": [1],
        "direction": dateTypes.DEPART,
        "type": actionTypes.PICKUP_AIRPORT,
      },
    ];
    store.dispatch(pickUpAirports([1], dateTypes.DEPART));
    
    expect(store.getActions()).toEqual(expectedActions);
  });
  test('Dispatches the correct action for FETCH_AIRPORTS_FAILURE same city', () => {
    const expectedActions = [
      {
        "type": actionTypes.PICKUP_DATE,
        "date": [1],
        "depart": dateTypes.DEPART,
      },
    ];
    store.dispatch(pickUpDate([1], dateTypes.DEPART));
    
    expect(store.getActions()).toEqual(expectedActions);
  });


});