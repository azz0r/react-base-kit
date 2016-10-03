import React, { PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

class ContextHolder extends React.Component {

  static propTypes = {
    context: PropTypes.shape({
      constants: PropTypes.object.required,
      onSetTitle: PropTypes.func.required,
      insertCss: PropTypes.func,
      onSetMeta: PropTypes.func.required,
      onSetPageName: PropTypes.func.required,
      onPageNotFound: PropTypes.func.required,
      onSetCanonicalTag: PropTypes.func.required
    }),
    children: PropTypes.element.isRequired
  };

  static childContextTypes = {
    constants: PropTypes.object,
    insertCss: PropTypes.func,
    onSetTitle: PropTypes.func,
    onSetMeta: PropTypes.func,
    onSetPageName: PropTypes.func,
    onPageNotFound: PropTypes.func,
    onSetCanonicalTag: PropTypes.func
  };

  getChildContext() {
    const context = this.props.context;
    return {
      constants: context.constants,
      insertCss: context.insertCss || emptyFunction,
      onSetTitle: context.onSetTitle || emptyFunction,
      onSetMeta: context.onSetMeta || emptyFunction,
      onSetPageName: context.onSetPageName || emptyFunction,
      onPageNotFound: context.onPageNotFound || emptyFunction,
      onSetCanonicalTag: context.onSetCanonicalTag || emptyFunction
    };
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}

export default ContextHolder;
