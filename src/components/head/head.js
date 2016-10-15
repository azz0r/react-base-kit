import React, { Component } from 'react'
import Helmet from "react-helmet";

export default class Head extends Component {

  displayName = "Head"

  render() {
    return (
      <Helmet
        titleTemplate="%s - Welcome"
        defaultTitle="Welcome"
      />
    )
  }
}
