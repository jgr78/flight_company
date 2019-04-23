import {color, background, device} from '../config/theme'
import AirportBlock from './airportblock'

import DateField from './datefield'
import ButtonField from './buttonfield'

import {directionTypes, dateTypes} from '../store'
import { CURRENCY, TEXT_BUTTON_SELECT} from '../config/properties'


export default (props) => (
    <>
    <div className="result_item">
        <div className="result_item_wrapper">
            <div className="result_item_row">
                <div className="result_item_block">
                    <div className="result_element">
                        <img src={background[props.depart_airline]} className="result_img"/>
                    </div>
                </div>
                <div className="result_item_block right">
                    <div className="result_element result_element-big right">{props.depart_from_time}</div>
                    <div className="result_element right">{props.depart_from}</div>
                </div>
                <div className="result_item_block center" >
                    <div className="result_element result_element-small">{props.depart_format_time}</div>
                    <div className="result_element">
                        <img src={background.separator} className="result_separator" />
                    </div>
                    <div className="result_element result_element-color">{props.depart_type}</div>
                </div>
                <div className="result_item_block">
                    <div className="result_element result_element-big">{props.depart_to_time}</div>
                    <div className="result_element">{props.depart_to}</div>
                </div>
            </div>
            <div className="result_item_row">
                <div className="result_item_block">
                    <div className="result_element">
                        <img src={background[props.depart_airline]} className="result_img"/>
                    </div>
                </div>
                <div className="result_item_block right">
                    <div className="result_element result_element-big right">{props.return_from_time}</div>
                    <div className="result_element right">{props.return_from}</div>
                </div>
                <div className="result_item_block center" >
                    <div className="result_element result_element-small">{props.return_format_time}</div>
                    <div className="result_element">
                        <img src={background.separator} className="result_separator" />
                    </div>
                    <div className="result_element result_element-color">{props.return_type}</div>
                </div>
                <div className="result_item_block">
                    <div className="result_element result_element-big">{props.return_to_time}</div>
                    <div className="result_element">{props.return_to}</div>
                </div>
            </div>
        </div>

        <div className="result_item_block result_element-strong center">
            <div className="result_element_price">{CURRENCY}{props.total_price}</div>
            <div>
            <button className="button_blue">{TEXT_BUTTON_SELECT}</button>
            </div>
        </div>
    </div>
    <style jsx >{`
        .result_item {
            display: flex;
            padding: 20px 20px 20px 20px;
            border-radius: 20px;
            box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.5);
            width: fit-content;
            margin: 0 auto;
        }
        .result_item_wrapper {
            /*display: flex;
            flex-direction: row;
            flex-wrap: wrap;*/
        }
        .result_item_row {
            width: 100%;
            display: flex;
            flex-direction: row;
        }
        .result_item_block {
            width: fit-content;
            padding: 0 20px 0 20px;
        }
    
        .result_element{
            width: 100%;
        }

        .result_separator {
            width: 100px;
        }
        .result_img {
            width: 60px;
        }
        .result_element-color {
            color: ${color.green};
            font-size: 0.8em;
        }
        .result_element-strong{
            font-size: 1.5em;
            font-weight: bold;
        }
        .result_element-big{
            font-size: 1.5em;
        }
        .result_element-small {
            font-size: 0.8em;
        }
        .result_element_price {
            padding: 10px 20px 10px 20px;
        }
        .img_arrow {
            width: 18px;
        }
        .button_blue {
            display: inline-block;
            margin: 0;
            padding: .375rem 1.125rem;
            border: 0;
            border-radius: 1.125rem;
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.5rem;
            text-align: center;
            text-decoration: none;
            box-shadow: none;
            cursor: pointer;
            vertical-align: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            color: ${color.white};
            background-color: ${color.blue};
          }

          @media ${device.tablet} {
            .result_item_row {
                flex-direction: column
            }
        }

    `}</style>

    </>   
)

    /*
    "depart_from_time": "17:25",
    "depart_to_time": "20:55",
    "depart_duration": 130,
    "depart_price": 120,
    "depart_airline": "easyjet",

    "return_from_time": "21:50",
    "return_to_time": "23:10",
    "return_duration": 140,
    "return_price": 120, 
    "return_airline": "easyjet",


  depart_from 
  depart_to
  return_from 
  return_to 
      
  depart_duration
  return_duration
  
  total_time
  total_price
      
    */


