import React, { Component } from "react"
import { Draggable, Droppable } from "react-drag-and-drop"
import * as bucketActions from "../../actions/buckets"
import * as dropsActions from "../../actions/drops"
import { connect } from "react-redux"
import { toSlug } from "./helpers"
import "./stylesheets/bucket-drops"

class BucketDrops extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    buckets:  React.PropTypes.array.isRequired,
    drops:  React.PropTypes.array.isRequired,
  }

  onDrop(bucketName, dropName) {
    this.props.dispatch(
      bucketActions.moveDrop(bucketName, dropName.wrestler)
    )
    this.props.dispatch(
      dropsActions.moveDrop(bucketName, dropName.wrestler)
    )
  }

  onResetGame = (event) => {
    event.preventDefault()
    this.props.dispatch({
      type: "RESET",
    })
  }

  displayName = "BucketDrops"

  render() {
    const ResetButton = () => {
      return (
        <a
          href="#"
          className="btn clearfix"
          onKeyPress={this.onResetGame}
          onClick={this.onResetGame}>
          Reset Choices
        </a>
      )
    }
    const Drop = ({ name }) => {
      return (
        <div className="drop">
          <span>
            <img
              className="drop__image"
              src={`/static/media/${toSlug(name)}.png`}
              alt={name}
              title={name}
            />
          </span>
          <h5 className="drop__name">
            {name}
          </h5>
        </div>
      )
    }
    return (
      <div className="bucket-drops">
        <div className="row">
          <div className="col-xs-3">
            <h2>On the bench...</h2>
            {this.props.drops.filter((drop) => drop.brand === "").map((drop, key) => {
              return (
                <Draggable
                  key={key}
                  type="wrestler"
                  data={drop.name}>
                  <Drop
                    key={key}
                    name={drop.name}
                  />
                </Draggable>
              )
            })}
            <br className="clearfix" />
            <ResetButton />
          </div>
          <div className="col-xs-9">
            <div className="row">
              {this.props.buckets.map((bucket, key) => {
                return (
                  <Droppable
                    key={key}
                    className="bucket col-xs-4"
                    types={["wrestler"]}
                    onDrop={this.onDrop.bind(this, bucket.name)}>
                    <p className="text-center">
                      <img
                        src={`/static/media/${toSlug(bucket.name)}.png`}
                        title={bucket.name}
                        alt={bucket.name}
                        className="bucket__logo"
                      />
                    </p>
                    <div className={`droppable col-xs-4 drops drops--${toSlug(bucket.name)}`}>
                      {bucket.drops.map((drop, key) => {
                        return (
                          <Drop
                            key={key}
                            name={drop.name}
                          />
                        )
                      })}
                    </div>
                  </Droppable>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  buckets: state.buckets,
  drops: state.drops,
}))(BucketDrops)
