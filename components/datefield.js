import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectDate } from '../store'
import {color} from '../config/theme'

import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class DateField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focused: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (typeof(nextProps.selected) !== "string" && nextProps.selected !== prevState.date) {
      return ({date:  nextProps.selected});
    }
    return null;
  }
  

  handleChange(date) {
    this.setState({
      date
    });
    const { dispatch } = this.props
    dispatch(selectDate(date, this.props.depart));
  }
  render() {
    return (
      <>
      <div className="form-group">
        <label className="form-label">{this.props.text}</label>
        <SingleDatePicker
          date={this.state.date}
          onDateChange={date => this.handleChange(date)} 
          focused={this.state.focused} 
          onFocusChange={({ focused }) => this.setState({ focused })} 
          id="slider_id" 
          readOnly={true}
          numberOfMonths={1}
          hideKeyboardShortcutsPanel={true}
          displayFormat="DD/MM/YYYY"
        />

        </div>
      <style jsx global>{`
      .CalendarDay__selected {
        background: ${color.blue};
        color: ${color.white};;
      }
      .CalendarDay:hover {
        background: ${color.lightblue};
        color: ${color.black};;
      }
      `}</style>
      <style jsx>{`
          .form-label {
            display: block;
          }
          .form-input {
            min-width: 250px;
            height: 30px;
            border-radius: 5px;
            font-size: 1.2em;
          }
          `}</style>

      </>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const selected = state[ownProps.depart];
  return { selected }
}

export default connect(mapStateToProps)(DateField)
