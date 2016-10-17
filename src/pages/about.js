import React, { Component } from 'react'
import Page from '../components/page/page'
import Helmet from "react-helmet";

export default class PageAbout extends Component {

  displayName = "PageAbout"

  render() {
    return (
      <Page>
        <div className="row">
          <div className="col-xs-12">
            <Helmet title="About Us" />
            <h3>About Us</h3>
          </div>
        </div>
      </Page>
    )
  }
}
