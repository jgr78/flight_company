import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {color, background} from '../config/theme'
import { selectAirport } from '../store'

class AirportsSuggestions extends PureComponent {
  clickItem (index) {
    const { dispatch } = this.props
    dispatch(selectAirport(this.props.airports[index], this.props.direction));
  }
  render() {
    return (
      <>
      <div className={`suggestion ${!(this.props.airports.length) ? 'hidden' : ''}`}>
        <ul className="suggestion-list">{
          this.props.airports.map( (item,index) => (
            <li key={index} className="suggestion-item" onClick={() => this.clickItem(index)}>
       
              <img className="suggestion-img" src={background[item.type]} />
              <span className="suggestion-label">{item.name} ({item.code})</span>
       
              <div className="suggestion-country">{item.country}</div>
            </li>))
          }
          </ul>
      </div>
      <style jsx >{`
        .suggestion{
          margin: 0 auto;
          position: absolute;
          z-index: 1;
        }
        .suggestion-list {
          color: ${color.black};
          background-color: ${color.white};
          border-radius: 10px;
          padding: 10px 0px 10px 0px;
          list-style: none;
          z-index: 1;

          box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.5);
        }
        .suggestion-img {
          width: 25px;
          margin-right: 10px;
        }
        .suggestion-item {
          padding: 5px 20px 5px 20px;
          cursor: pointer;
        }
        .suggestion-item:hover {
          background-color: ${color.lightgray};
        }
        .suggestion-list:before{
          content: "";
          width: 20px;
          height: 20px;
          transform: rotate(-45deg);
          background: #fff;
          position: absolute;
          z-index: 0;
          top: 8px;
          left: calc(50% - 10px);
        }
        .suggestion-country {
          padding-left: 35px;
          font-size: 0.8em;
        }
      `}</style>
      </>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const airports = state[ownProps.direction];
  const {search_text} = state
  return { airports, search_text }
}

export default connect(mapStateToProps)(AirportsSuggestions)

