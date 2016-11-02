import React, { Component } from "react"
import { Draggable, Droppable } from "react-drag-and-drop"
import * as bucketActions from "../../actions/buckets"
import { connect } from "react-redux"
import { toSlug } from "./helpers"
import "./stylesheets/bucket-drops"

class BucketDrops extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    buckets:  React.PropTypes.array.isRequired,
    drops:  React.PropTypes.array.isRequired,
  }

  displayName = "BucketDrops"

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-3">
            {this.props.drops.map((drop, key) => {
              return (
                <Draggable
                  key={key}
                  type="wrestler"
                  data={drop.name}>
                  <li className="bucket__drop">
                    {drop.name}
                  </li>
                </Draggable>
              )
            })}
          </div>
          <div className="col-xs-9">
            <div className="row">
              {this.props.buckets.map((bucket, key) => {
                return (
                  <Droppable
                    className="bucket col-xs-4"
                    key={key}
                    types={["wrestler"]}
                    onDrop={this.onDrop.bind(this, bucket.name)}>
                    <p>
                      <img
                        src={`/static/media/${toSlug(bucket.name)}.png`}
                        title={bucket.name}
                        alt={bucket.name}
                        className="bucket__logo"
                      />
                    </p>
                    <ul className={`droppable col-xs-4 bucket__drops bucket__drops--${toSlug(bucket.name)}`}>
                      {bucket.drops.map((drop, key) => {
                        return (
                          <li
                            key={key}
                            className="bucket__drop">
                            {drop.name}
                          </li>
                        )
                      })}
                    </ul>
                  </Droppable>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  onDrop(bucketName, dropName) {
    this.props.dispatch(
      bucketActions.moveDrop(bucketName, dropName.wrestler)
    )
  }
}
export default connect(state => ({
  buckets: state.buckets,
  drops: state.drops,
}))(BucketDrops)
