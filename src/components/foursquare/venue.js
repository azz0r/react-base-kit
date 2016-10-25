import React from "react"

export default class Venue extends React.Component {

  displayName = 'Venue'

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    checkinsCount:  React.PropTypes.number,
    rating:  React.PropTypes.number,
    img:  React.PropTypes.string,
  }

  static defaultProps = {
    checkinsCount: 0,
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 venue">
          <span className="venue__name">
            {this.props.name}
            <If condition={this.props.checkinsCount}>
              <span className="badge venue__checkins">
                {this.props.checkinsCount} checkins
              </span>
            </If>
            &nbsp;
            <If condition={this.props.rating}>
              <span className="badge venue__rating">
                {this.props.rating} / 10
              </span>
            </If>
          </span>
        </div>
      </div>
    )
  }

}
