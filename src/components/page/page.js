import React from "react"
import Head from "../head/head"
import "../../stylesheets/base"

export default class Page extends React.Component {
  render() {
    return (
      <div className="page">
        <Head />
        {this.props.children}
      </div>
    )
  }
}
