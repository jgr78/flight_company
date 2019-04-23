import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import {color, background} from '../config/theme'
import ResultItem from './resultitem'

class ResultsBlock extends PureComponent {

    render () {
        return(
        <>
            <div id="results_block">
            { this.props.flights.map((item,index)=>{ return(
                <ResultItem {...item} key={index} />
            )})
            }
            </div>
        </>   
        )
    }
}

function mapStateToProps (state) {
    const {flights} = state;
    return { flights}
  }
export default connect(mapStateToProps)(ResultsBlock)