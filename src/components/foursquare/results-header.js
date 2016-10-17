import React from 'react'

export default class ResultsHeader extends React.Component {

  displayName = 'ResultsHeader'

  static propTypes = {
    query: React.propTypes.string.isRequired,
    total:  React.propTypes.number.isRequired,
  }

  render() {
    return (
      <div className="results">
        <h2 className="results__title">
          Results for "{this.props.query}" ({this.props.total})
        </h2>
      </div>
    )
  }

}
