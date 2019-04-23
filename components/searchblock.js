import {color, device} from '../config/theme'
import AirportBlock from './airportblock'

import DateField from './datefield'
import ButtonField from './buttonfield'

import {directionTypes, dateTypes} from '../store'
import { FROM_TEXT, FROM_PLACEHOLDER, TO_TEXT, TO_PLACEHOLDER, TEXT_DEPART, TEXT_RETURN } from '../config/properties'


export default () => (
    <>
    <div id="search_wrapper">
        <div id="search_block">
            <AirportBlock direction={directionTypes.FROM} text={FROM_TEXT} placeholder={FROM_PLACEHOLDER}/>
            <AirportBlock direction={directionTypes.TO} text={TO_TEXT} placeholder={TO_PLACEHOLDER}/>
            <DateField depart={dateTypes.DEPART} text={TEXT_DEPART} />
            <DateField depart={dateTypes.RETURN} text={TEXT_RETURN} />
        </div>
        <div id="search_button">
            <ButtonField />
        </div>   
    </div>
    <style jsx >{`
        #search_wrapper {
            margin: 0 auto;
            width: fit-content;
        }
        #search_block{
            margin: 0 auto;
            color: ${color.white};
            width: fit-content;
            display: flex;
            flex-wrap: wrap;
        }
        #search_button {
            text-align: right;
            padding-top: 30px;
            padding-bottom: 30px;
        }

        @media ${device.tablet} {
            #search_block{
                display: flex;
                flex-wrap: wrap;
                display-direction: row;
            }
        }
    `}</style>
    </>   
)