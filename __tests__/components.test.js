import React from 'react'
import Index from '../pages/index'
import Results from '../pages/index'
import Layout from '../components/layout'
import Link from 'next/link'
import ResultContainer from "../components/ResultsContainer"
import { actionTypes, directionTypes, dateTypes} from '../store'
import SearchContainer from '../components/searchcontainer'
import Logo from '../components/logo'
import { shallow} from 'enzyme'
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();



describe('Components Tests', () => {
    const store = mockStore(
        {
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
      });


    it('Index page has the right structure', () => {
        const index = shallow(<Index store={store}/>);
        expect(index.find(Layout)).toBeDefined();
        expect(index.find(SearchContainer)).toBeDefined();
        expect(index.find(Logo)).toBeDefined();
    })
    it("Index page renders correctly", () => {
      const wrapper = shallow(
        <Index store={store}/>
      );
      expect(wrapper).toMatchSnapshot();
    })
    it('Results page has the right structure', () => {
        const result = shallow(<Results store={store}/>);
        expect(result.find(Layout)).toBeDefined();
        expect(result.find(SearchContainer)).toBeDefined();
        expect(result.find(ResultContainer)).toBeDefined();
    })
    it("Results page renders correctly", () => {
      const wrapper = shallow(
        <Results store={store}/>
      );
      expect(wrapper).toMatchSnapshot();
    })
  })
