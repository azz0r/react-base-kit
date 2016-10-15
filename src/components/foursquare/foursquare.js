import React from 'react'
import Venues from './venues'
import Search from './search'
import ResultsHeader from './results-header'
import './stylesheets/foursquare'

export default class FourSquare extends React.Component {

  displayName = 'FourSquare'

  state = {
    venues: [],
    query: '',
  }

  onSearchUpdated = ( { venues, query } ) => {
    this.setState({
      venues,
      query,
    })
  }

  render() {
    return (
      <div className="row foursquare">
        <div className="col-xs-12">
          <div className="foursquare__results">
            <Search onSearchUpdated={this.onSearchUpdated} />
            <If condition={this.state.venues.length > 0}>
              <ResultsHeader
                query={this.state.query}
                total={this.state.venues.length}
              />
              <Venues venues={this.state.venues} />
            </If>
          </div>
        </div>
      </div>
      )
    }
  }
