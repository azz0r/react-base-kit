import React, { Component } from "react"
import { Draggable, Droppable } from "react-drag-and-drop"
import * as SearchActions from '../../actions/searches'
import { connect } from 'react-redux'
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
          <div className="col-xs-4">
            {this.props.drops.map((drop, key) => {
              return (
                <Draggable
                  key={key}
                  type="wrestler"
                  data={drop.name}>
                  <li>
                    {drop.name}
                  </li>
                </Draggable>
              )
            })}
          </div>
          <div className="col-xs-8">
            <div className="row">
              {this.props.buckets.map((bucket, key) => {
                return (
                  <Droppable
                    key={key}
                    types={["wrestler"]}
                    onDrop={this.onDrop.bind(this, bucket.name)}>
                    <h3>{bucket.name}</h3>
                    <ul className={`droppable col-xs-4 ${bucket.name}`}></ul>
                  </Droppable>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  onDrop(data, key) {
    console.log(data, key)
    // => banana
  }
}

export default connect(state => ({
  buckets: state.buckets,
  drops: state.drops,
}))(BucketDrops)
