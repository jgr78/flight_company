import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeParameters } from '../store'
import {color, device} from '../config/theme'
import {CURRENCY, TEXT_FILTERS, TEXT_TOTAL_PRICE, TEXT_JOURNEY_DURATION} from '../config/properties'
import propTypes from 'prop-types';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

class FiltersBlock extends Component {

      constructor(props) {
        super(props);
     
        this.state = {
          value_price: { min: 0, max: 1 },
          value_duration: { min: 0, max: 1 },
        };
      }

      static getDerivedStateFromProps(nextProps, prevState){
        {
          if(prevState.value_price.min === 0 && prevState.value_price.max === 1 ) {
            const next_min_price = (nextProps.min_price_selected > 0) ? nextProps.min_price_selected : nextProps.min_price;
            const next_max_price = (nextProps.max_price_selected > 0) ? nextProps.max_price_selected : nextProps.max_price;
            const next_min_duration = (nextProps.min_duration_selected > 0) ? nextProps.min_duration_selected : nextProps.min_duration;
            const next_max_duration = (nextProps.max_duration_selected > 0) ? nextProps.max_duration_selected : nextProps.max_duration;

            return({value_price: {min: next_min_price , max: next_max_price }, 
              value_duration: {min: next_min_duration, max: next_max_duration} })
            }
          
        }
        return null;
      }
      componentDidMount() {
        this.setState({ value_price: {min: this.props.min_price, max: this.props.max_price}, value_duration: {min: this.props.min_duration, max: this.props.max_duration} })
      }
 

      sendData(value_price, value_duration) {
        const { dispatch, data } = this.props
        dispatch(changeParameters(value_duration.min, value_duration.max, value_price.min, value_price.max, data));
      
      }
    formatTime(duration) {
      const h = Math.floor(duration/60); //minutes;
      const m = duration % 60;
      return (h + "h " + m + "m"); 
    }
    render() {
        return (
        <>
            <div id="filters_container">
                {TEXT_FILTERS}
            </div>
            <div className="filters_block">
                <div className="filters">
                    <div className="filter_title">{TEXT_TOTAL_PRICE}</div>
                    <div className="filter_slider">
                    <InputRange
                        maxValue={this.props.max_price}
                        minValue={this.props.min_price}
                        value={this.state.value_price}
                        formatLabel={value => `${CURRENCY + value}`}
                        onChange={value_price => this.setState({ value_price })} 
                        onChangeComplete={value => this.sendData(value, this.state.value_duration)}
                        />
          
        
          </div>
                    
                    <div className="filter_title extra_space">{TEXT_JOURNEY_DURATION}</div>
                    <div className="filter_slider"> 
                   

                    <InputRange
                        maxValue={this.props.max_duration}
                        minValue={this.props.min_duration}
                        value={this.state.value_duration}
                        formatLabel={value => `${this.formatTime(value)}`}
                        onChange={value_duration => this.setState({ value_duration })}
                        onChangeComplete={value => this.sendData(this.state.value_price, value)}
                        />

                     </div>
                </div>
            </div>
            <style jsx >{`
                #filters_container {
                  width: 100%;
                  padding-bottom: 20px;
                  color: ${color.blue}
                }
                .filters_block {
                  color: ${color.blue};
                  padding: 0 20px 0 20px;
                }
                .filter_title {
                  padding-top: 40px;
                }
                .filter_slider {
                  margin-top: 40px;
                }
                .extra_space {
                  margin-top: 20px;
                }
                @media ${device.tablet} {
                  #filters_container {
                    padding-bottom: 5px;
                  }
                  .filter_title{
                      pading-top: 5px;
                  }
              }
            `}</style>
        </>   
        );
    }
}

FiltersBlock.propTypes = {
  min_price: propTypes.number.isRequired,
  max_price: propTypes.number.isRequired,
  min_duration: propTypes.number.isRequired,
  max_duration: propTypes.number.isRequired,
}

FiltersBlock.defaultProps = {
  min_price: 190,
  max_price: 250,
  min_duration: 120,
  max_duration: 450
}

function mapStateToProps (state) {
    let {min_price, max_price, min_duration, max_duration, 
         min_price_selected, max_price_selected, min_duration_selected, max_duration_selected} = state;
     max_price = !(max_price) ? 1 : max_price; 
     max_duration = !(max_duration) ? 1 : max_duration; 

    return {data: state,  min_price, max_price, min_duration, max_duration, 
            min_price_selected, max_price_selected, min_duration_selected, max_duration_selected}
  }
  export default connect(mapStateToProps)(FiltersBlock)
