import {reducer, actionTypes, directionTypes, dateTypes} from '../store'
import { ERROR_MESSAGES } from '../config/properties';


describe('Reducers tests', () => {
  //beforeEach(() => { 
   
  //});
  let initialState = {     
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
    max_duration_selected: 0,};

    test('RESET is correct', () => {
      const action = { type: actionTypes.RESET };
      expect(reducer(undefined, action)).toEqual(initialState);
    });
    test('FETCH_FLIGHTS_BEGIN is correct', () => {
      const action = { type: actionTypes.FETCH_FLIGHTS_BEGIN };
      const initialState = {  loading_flights: false};
      const finalState = {  loading_flights: true, error: ''};
      expect(reducer(initialState, action)).toEqual(finalState);
    });
    test('FETCH_FLIGHTS_SUCCESS is correct', () => {
      const action = { type: 'FETCH_FLIGHTS_SUCCESS', flights: [1,2,3],min_duration:100,max_duration:100000,min_price:100,max_price:100000};
      const initialState = { loading_flights: true, flights: [], max_duration: 0, min_duration: 0, max_price: 0, min_price: 0, error: ''};
      const finalState = {  loading_flights: false, flights: [1,2,3], min_duration: 100, max_duration: 100000, max_price: 100000, min_price: 100, error: ''};
      expect(reducer(initialState, action)).toEqual(finalState);
    });
    test('FETCH_FLIGHTS_FAILURE is correct', () => {
      const action = { type: 'FETCH_FLIGHTS_FAILURE', error: ERROR_MESSAGES.empty_dates};
      const initialState = { loading_flights: true, error: ''};
      const finalState = {  loading_flights: false, error: ERROR_MESSAGES.empty_dates};
      expect(reducer(initialState, action)).toEqual(finalState);
    });
    test('FETCH_AIRPORTS_BEGIN is correct', () => {
      const action = { type: actionTypes.FETCH_AIRPORTS_BEGIN };
      const initialState = {  loading: false};
      const finalState = {  loading: true, error: ''};
      expect(reducer(initialState, action)).toEqual(finalState);
    });
    test('FETCH_AIRPORTS_SUCCESS is correct', () => {
      const action = { type: actionTypes.FETCH_AIRPORTS_SUCCESS, airports: [1,2,3], direction: [directionTypes.FROM],text: 'abc'};
      const initialState = { loading: true, [directionTypes.FROM]: [], search_text: '', error: '' };
      const finalState = {  loading: false, [directionTypes.FROM]: [1,2,3], search_text: 'abc', error: '' };
      expect(reducer(initialState, action)).toEqual(finalState);
    });
    test('FETCH_AIRPORTS_FAILURE is correct', () => {
      const action = { type: actionTypes.FETCH_AIRPORTS_FAILURE, error: ERROR_MESSAGES.empty_dates};
      const initialState = { loading: true, error: ''};
      const finalState = {  loading: false, error: ERROR_MESSAGES.empty_dates};
      expect(reducer(initialState, action)).toEqual(finalState);
    });
    test('PICKUP_AIRPORT is correct', () => {
      const action = { type: actionTypes.PICKUP_AIRPORT, airport: [1,2,3], direction: [directionTypes.FROM]};
      const initialState = { ['selected_' + directionTypes.FROM]: [], [directionTypes.FROM]: [1,2,3]};
      const finalState = {  ['selected_' + directionTypes.FROM]: [1,2,3], [directionTypes.FROM]: []};
      expect(reducer(initialState, action)).toEqual(finalState);
    });
    test('PICKUP_DATE is correct', () => {
      const action = { type: actionTypes.PICKUP_DATE, date: [1,2,3], depart: [dateTypes.DEPART]};
      const initialState = { [dateTypes.DEPART]: [] };
      const finalState = {  [dateTypes.DEPART]: [1,2,3] };
      expect(reducer(initialState, action)).toEqual(finalState);
    });
    test('SHOW_ERROR is correct', () => {
      const action = { type: actionTypes.SHOW_ERROR, error: ERROR_MESSAGES.empty_dates};
      const initialState = { error: '' };
      const finalState = {  error: ERROR_MESSAGES.empty_dates};
      expect(reducer(initialState, action)).toEqual(finalState);
    });
    test('UPDATE_PARAMETERS is correct', () => {
      const action = { type: actionTypes.UPDATE_PARAMETERS, min_duration: 1, max_duration: 2, min_price: 3, max_price: 4};
      const initialState = { min_duration_selected: 0, max_duration_selected: 0, min_price_selected: 0, max_price_selected: 0 };
      const finalState = {  min_duration_selected: 1, max_duration_selected: 2, min_price_selected: 3, max_price_selected: 4 };
      expect(reducer(initialState, action)).toEqual(finalState);
    });
  });
