import React from "react"
import request from 'superagent'
import Loading from '../loading/loading'
import Searches from './searches'
import config from './config'
import * as SearchActions from '../../actions/searches'
import _debounce from 'lodash.debounce'
import { connect } from 'react-redux'

class Search extends React.Component {

  displayName = 'Search'

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    searches: React.PropTypes.array,
    onSearchUpdated: React.PropTypes.func,
  }

  state = {
    query: '',
    venues: [],
    long: 51.481364199999994,
    lat: -0.12015400000000001,
    loading: false,
  }

  componentWillMount() {
    this.delayedCallback = _debounce((event) => {
      let query = event.target.value
      this.setState({
        loading: true,
      })
      this.props.dispatch(
        SearchActions.searchMade(query)
      )
      this.openRequest = request.get(`
        ${config.apiUrl}?query=${query}&client_id=${config.clientId}&client_secret=${config.clientSecret}&style=${config.style}&v=${config.v}&ll=${this.state.long},${this.state.lat}`)
        .accept('json')
        .end((err, res) => {
          if(err) return
          let venues = res.body.response.groups[0].items
          this.props.onSearchUpdated({
            venues,
            query,
          })
          this.setState({
            loading: false,
          })
        })
    }, 500)
  }

  onSearch = (event) => {
    event.persist()
    this.delayedCallback(event)
  }

  onGeolocateMe = (event) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }

    const success = (pos) => {
      this.setState({
        long: pos.coords.latitude,
        lat: pos.coords.longitude,
      })
    }

    const error = (err) => {
      console.warn(`
        Error code: ${err.code},
        Error message: ${err.message}
      `)
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  render() {
    return (
      <div className="search">
        <div className="row">
          <div className="col-xs-11 search__container form-group has-feedback">
            <input
              className="form-control search__field"
              placeholder="Search"
              name="search__field"
              id="search__field"
              type="text"
              onKeyUp={this.onSearch}
              onKeyPress={this.onSearch}
            />
            <i className="glyphicon glyphicon-search search__icon form-control-feedback"></i>
          </div>
          <div className="col-xs-1 search__location">
            <button
              className="search__location-button btn btn-success"
              title="Geo locate me"
              onClick={this.onGeolocateMe}>
              <span className="glyphicon glyphicon-screenshot" aria-hidden="true"></span>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <If condition={this.state.loading}>
              <Loading />
            </If>
          </div>
        </div>
        <If condition={this.props.searches.length > 0}>
          <div className="row previous-search">
            <div className="col-xs-12">
              <h4 className="previous-search__header">
                Previous searches
              </h4>
              <Searches searches={this.props.searches} />
            </div>
          </div>
        </If>
      </div>
    )
  }
}
export default connect(state => ({
  searches: state.searches,
}))(Search)
