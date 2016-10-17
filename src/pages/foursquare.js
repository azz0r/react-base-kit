import React, { Component } from 'react'
import Page from '../components/page/page'
import Foursquare from '../components/foursquare/foursquare'
import Helmet from "react-helmet";

export default class PageFoursquare extends Component {

  displayName="PageFoursquare"

  render() {
    return (
      <Page>
        <Helmet title="FourSquare Venues Search" />
        <Foursquare />
      </Page>
    )
  }
}
