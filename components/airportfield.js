import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchAirport, resetAirports } from '../store'
import {color, device} from '../config/theme'


class AirportField extends Component {
  constructor(props) {
    super(props)
    this.state={
      text_value : props.text_value
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.text_value !== prevState.text_value) {
      return ({text_value: nextProps.text_value});
    }
    return null;
  }
  
  componentDidMount() {
    this.refs.text_value.value = this.state.text_value
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text_value !== this.props.text_value) {
      this.setInputValue(this.props.text_value)
    }
  }
  setInputValue(val) {
    this.refs.text_value.value = val
  }

  changeText(event) {
    const { dispatch } = this.props
    dispatch(searchAirport(event.target.value, this.props.direction));
  }
  lostFocus() {
    const { dispatch } = this.props
    dispatch(resetAirports(this.props.direction)); 
  }
  render() {
    
    return (
      <>
        <label className="form-label">{this.props.text}</label>
        <input
          ref="text_value"
          type="text"
          className="form-input"
          placeholder = {this.props.placeholder}
          onChange={event => this.changeText(event)}
          onBlur={event => this.lostFocus()}
        />
        <style jsx>{`
          .form-label {
            display: block;
          }
          .form-input {
            min-width: 250px;
            font-weight: 200;
            font-size: 19px;
            line-height: 24px;
            color: ${color.darkgray};
            background-color: ${color.white};
            width: 100%;
            padding: 11px 11px 9px;
          }
          @media ${device.tablet} {
            .form-input{
                font-size: 16px;
            }
        }
        `}</style>
      </>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const selected = state['selected_' +  ownProps.direction];
  const text_value = (selected.name) ? selected.name + " (" + selected.code + ")" : '';
  return { text_value }
}

export default connect(mapStateToProps)(AirportField)
