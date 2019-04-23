import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeFilter, sortTypes } from '../store'
import {color, device} from '../config/theme'
import {TEXT_SORTBY} from '../config/properties'

class SortBlock extends Component {

  changeValues(event) {
    const { dispatch, data } = this.props
    dispatch(changeFilter(event.target.value, data));
  }
  render() {
    return (
    <>
    <div id="sort_block">
      <div id="sort_block_label"><span className="blue_text">{this.props.data.flights.length} results</span> sorted by {this.props.data.sortby} </div>
      <div id="sort_block_select">
        {TEXT_SORTBY}
        <select onChange={(event) => this.changeValues(event)}>
          { sortTypes.map( (item,index) => { 
            return (
              <option key={index} value={item} >{item}</option>
            )
          })}
        </select>
      </div>
    </div>
    <style jsx >{`
      #sort_block{
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 20px;
        margin: 0 auto;
        width: fit-content;
      }
      #sort_block_label {
        width: content-fit;
        min-width: 300px;
        text-align: left;
      }
      #sort_block_select {
        width: 100%;
        text-align: right;
      }
      #sort_block_select select {
        padding: 0;
        margin: 0;
        display: inline-block;
        width: 100%;
        height: 2.25rem;
        padding: .375rem 1.875rem .375rem .75rem;
        border: .0625rem solid #e6e4eb;
        border-radius: .1875rem;
      
        
        background: ${color.white} url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='24' height='24' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='black'/></g></svg>") no-repeat;
        background-position: right 5px top 50%;
        background-size: 1.125rem 1.125rem;
        cursor: pointer;
        color: #524c61;
        line-height: 1.375rem;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: auto;
        min-width: 200px;
        font-size: 1.2em;
      }
      .blue_text {
        color: ${color.blue}
      }
      @media ${device.tablet} {
        #sort_block_label, #sort_block_select{
            min-width: auto;
            width: 100%;
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }
      `}</style>
    </>   
    ) 
  }
}

function mapStateToProps (state) {
  return { data: state }
}
export default connect(mapStateToProps)(SortBlock)



