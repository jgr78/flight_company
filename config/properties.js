export const FROM_TEXT = "From";
export const FROM_PLACEHOLDER = "Country, city or airport";
export const TO_TEXT = "To";
export const TO_PLACEHOLDER = "Country, city or airport";
export const WEB_TITLE = "Flight company";
export const TEXT_DEPART = "Depart";
export const TEXT_RETURN = "Return";
export const TEXT_BUTTON = "Search flights"
export const CURRENCY = "£";
export const TEXT_BUTTON_SELECT = "Select"
export const TEXT_SORTBY = "Sort by"
export const RESULTS_PAGE = "/results"
export const TEXT_HOME = "Home"
export const TEXT_FILTERS = "Filters";
export const TEXT_TOTAL_PRICE = "Total Price";
export const TEXT_JOURNEY_DURATION = "Journey Duration";

export const API_URL = 'http://localhost:9000/api/airports'
export const API_FLIGHTS_URL = 'http://localhost:9000/api/flights'

export const ERROR_MESSAGES = {
    same_city: 'Searching from and to the same city is not possible',
    empty_fields: 'Please select an origin and a destination',
    empty_dates: 'Please select a depart and return dates',
    return_earlier: 'The return can´t be earlier than the depart',
    no_airports: 'There are no airports that match your search terms',
    no_flights: 'There are no flights that match your search terms',
}