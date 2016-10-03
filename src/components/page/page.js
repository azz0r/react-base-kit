import React from 'react';
import { StickyContainer } from 'react-sticky';
import { canUseDOM } from 'exenv';
import { setDirectCall } from '../helpers/omniture/set-direct-call';

export default class Page extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired
  }

  displayName = 'Page'

  componentDidMount() {
    // Client side rendering
    if (canUseDOM) {
      setDirectCall();
    }
  }

  /**
  * render
  * @return {ReactElement} markup
  */
  render() {
    return (
      <div className="page top-level">
        <StickyContainer>
          <div className="container main">
            {this.props.children}
          </div>
        </StickyContainer>
      </div>
    );
  }
}
