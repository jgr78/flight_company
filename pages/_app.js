import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import {color} from '../config/theme'
import 'react-input-range/lib/css/index.css'

class MyApp extends App {
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <>
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
      <style jsx global>{`
          html {
            box-sizing: border-box;
          }
          *, *:before, *:after {
            box-sizing: inherit;
          }
          body {
            font-family: 'Lato', 'Lucida Grande', 'Lucida Sans Unicode', Tahoma, Sans-Serif;
            margin: 0 auto;
          }
          .fullwidth {
            width: 100%;
            margin: 0 auto;
          }
          .container {
            padding-left: 20px;
            padding-right: 20px;
          }
          .hidden {
            display: none;
          }
          .center {
            text-align: center;
          }
          .right {
            text-align: right;
          }
          .left {
            text-align: left;
          }
          .input-range__slider, .input-range__track--active{
            background: ${color.blue};
            border: 1px solid  ${color.blue};
          }
          .SingleDatePicker {
            z-index: 0;
          }
          .DayPicker_transitionContaine {
            z-index: 1;
          }
          `}</style>
      </>
    )
  }
}

export default withReduxStore(MyApp)

