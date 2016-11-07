import React from "react"
const maxSearches = 10 // todo move to constants

export default class Searches extends React.Component {

  displayName = "Searches"

  static propTypes = {
    searches: React.PropTypes.array,
  }

  render() {
    return (
      <div>
        {this.props.searches
            .slice(Math.max(this.props.searches.length - maxSearches, 1))
            .map((query, key) => {
          return (
            <span
              key={key}
              className="label label-info previous-search__label">
              {query}
            </span>
          )
        })}
      </div>
    )
  }
}
