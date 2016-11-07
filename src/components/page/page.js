import React from "react"
import Head from "../head/head"
import "../../stylesheets/base"
import constants from "../../constants"

export default class Page extends React.Component {
  render() {
    return (
      <div>
        <Head />
        {this.props.children}
        <hr />
        <a href={constants.baseUrl}>Home</a> | <a href={`${constants.baseUrl}about`}>
          About
        </a>
      </div>
    )
  }
}
