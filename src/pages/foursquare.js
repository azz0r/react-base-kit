import React, { Component } from "react"
import Foursquare from "../components/foursquare/foursquare"
import Helmet from "react-helmet"

export default class PageFoursquare extends Component {

  displayName="PageFoursquare"

  render() {
    return (
      <div>
        <Helmet title="FourSquare Venues Search" />
        <Foursquare />
      </div>
    )
  }
}
