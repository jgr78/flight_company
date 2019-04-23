import {FROM_TEXT, FROM_PLACEHOLDER, TO_TEXT, TO_PLACEHOLDER, WEB_TITLE, TEXT_DEPART,
        TEXT_RETURN, TEXT_BUTTON, CURRENCY, TEXT_BUTTON_SELECT, TEXT_SORTBY, RESULTS_PAGE, TEXT_HOME,
        TEXT_FILTERS, TEXT_TOTAL_PRICE, TEXT_JOURNEY_DURATION, API_URL, API_FLIGHTS_URL, ERROR_MESSAGES
        }  from '../config/properties'
import { color, background, device } from '../config/theme'


describe('Properties has the right parameters', () => {
    it('The properties exists and have value', () => {
        expect(background).toBeDefined();
        expect(color).toBeDefined();
        expect(device).toBeDefined();

        expect(FROM_TEXT).toBeDefined();
        expect(FROM_PLACEHOLDER).toBeDefined();
        expect(TO_TEXT).toBeDefined();
        expect(TO_PLACEHOLDER).toBeDefined();
        expect(WEB_TITLE).toBeDefined();
        expect(TEXT_DEPART).toBeDefined();
        expect(TEXT_RETURN).toBeDefined();
        expect(TEXT_BUTTON).toBeDefined();
        expect(CURRENCY).toBeDefined();
        expect(TEXT_BUTTON_SELECT).toBeDefined();
        expect(TEXT_SORTBY).toBeDefined();
        expect(RESULTS_PAGE).toBeDefined();
        expect(TEXT_HOME).toBeDefined();
        expect(TEXT_FILTERS).toBeDefined();
        expect(TEXT_TOTAL_PRICE).toBeDefined();
        expect(TEXT_JOURNEY_DURATION).toBeDefined();
        expect(API_URL).toBeDefined();
        expect(API_FLIGHTS_URL).toBeDefined();
        expect(ERROR_MESSAGES).toBeDefined();
    })
  });


  