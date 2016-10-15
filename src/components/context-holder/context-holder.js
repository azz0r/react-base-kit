import React, { PropTypes } from 'react'
import emptyFunction from 'emptyFunction'

class ContextHolder extends React.Component {

  static propTypes = {
    context: PropTypes.shape({
      onSetTitle: PropTypes.func.required,
      onSetMeta: PropTypes.func.required,
    }),
    children: PropTypes.element.isRequired
  }

  static childContextTypes = {
    onSetTitle: PropTypes.func,
    onSetMeta: PropTypes.func,
  }

  getChildContext() {
    const context = this.props.context
    return {
      onSetTitle: context.onSetTitle || emptyFunction,
      onSetMeta: context.onSetMeta || emptyFunction,
    }
  }

  render() {
    const { children } = this.props
    return React.Children.only(children)
  }
}

export default ContextHolder
