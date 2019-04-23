import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkValues } from '../store'
import {color} from '../config/theme'
import {TEXT_BUTTON} from '../config/properties'

class ButtonField extends Component {

  changeValues(event) {
    const { dispatch, data } = this.props
    dispatch(checkValues(data));
  }
  render() {
    return (
    <>

        <button className="button_element" onClick={event => this.changeValues(event)}>
          {TEXT_BUTTON}
        </button>

        <style jsx>{`
          .button_element {
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
        `}</style>
    </>  
    ) 
  }
}

function mapStateToProps (state) {
  return { data: state }
}
export default connect(mapStateToProps)(ButtonField)