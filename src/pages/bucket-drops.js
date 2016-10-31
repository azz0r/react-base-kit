import React, { Component } from "react"
import BucketDrops from "../components/bucket-drops/bucket-drops"
import Helmet from "react-helmet"

export default class PageBucketDrops extends Component {

  displayName="PageBucketDrops"

  render() {
    return (
      <div>
        <Helmet title="Bucket Drops" />
        <BucketDrops />
      </div>
    )
  }
}
