import React, { Component } from 'react'
import { Link } from 'react-router'
import Head from '../head/head'
import '../../stylesheets/base'


export default class Application extends Component {
  render() {
    return (
      <div className="container">
        <Head />
        <header className="foursquare__header">
          <h1>FourSquare Popular Venues Search</h1>
        </header>
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
