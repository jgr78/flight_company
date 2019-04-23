import React, { Component } from 'react'
import { connect } from 'react-redux'

import {color, background, device} from '../config/theme'

import SortBlock from './sortblock'
import FiltersBlock from './filtersblock'
import ResultsBlock from './resultsblock'

class ResultsContainer extends Component {
   
    render () {
        console.log("---->>ERR ES; " + this.props.error);
        return(
    <>
        <section id="section_results" className="container">
            <div id="img_container" className={`${(this.props.loading_flights ? '' : 'hidden')}`}>
                <img id="img_loading" src={background.loading}/>
            </div>
            <div id="results_container"  className={`${ ( (this.props.flights.length && !this.props.loading_flights) || this.props.error.length ? '' : 'hidden')}`} >
                <div id="results_wrapper">
                    <div id="results_filters">
                        <FiltersBlock />
                    </div>
                    <div id="results_sort" className={`${ (this.props.flights.length && !this.props.loading_flights ? '' : 'hidden')}`}>
                        <SortBlock />
                        <ResultsBlock />
                    </div>
                </div>
            </div>
        </section>
        <style jsx >{`
            #section_results{
                padding-top: 50px;
            }
            #img_container {
                text-align: center;
                padding-bottom: 50px;
            }
            #img_loading {
                margin: 0 auto;
                margin-top: 80px;
                -webkit-transition: all 2s;
                transition: all 2s;
            }
            #results_wrapper {
                display: flex;
            }
            #results_sort {
                width: 80%;
            }
            #results_filters {
                width: 20%;
            }
            @media ${device.tablet} {
                #filters_container {
                    pading-bottom: 0px;
                }
                #results_filters {
                    width: 100%;
                }
                #results_wrapper{
                    flex-direction: column;
                }
                #results_sort {
                    margin-top: 40px;
                }
            }
          `}</style>
    </>   
        )
    }
}

function mapStateToProps (state, ownProps) {
    const {error, loading_flights, flights} = state;
    console.log(state)
    return { error,  loading_flights, flights}
  }
export default connect(mapStateToProps)(ResultsContainer)