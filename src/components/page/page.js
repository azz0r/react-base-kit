import React, { Component } from "react"
import { Link } from 'react-router'
import Head from '../head/head'
import '../../stylesheets/base'

export default class Page extends Component {
  render() {
    return (
      <div>
        <Head />
        {this.props.children}
        <Link to={'/'}>
          Search
        </Link> | <Link to={'/about'}>
          About
        </Link>
      </div>
    )
  }
}
