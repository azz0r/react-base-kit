import React from 'react';
import Page from '../components/page';
// eslint-disable-next-line
import Mbox from '../components/page'; //'../public/mobile/javascripts/at-react-component-0.2.0';

export default class UI extends React.Component {

  displayName = 'UI'

  render() {
    return (
      <Page>
        <section id="ui">
          <h1>UI</h1>
          <Mbox
            data-mbox="simpleDirective"
            data-param1="value1"
            data-param2="value2"
            data-timeout="7000">
            MBox Test
          </Mbox>
        </section>
      </Page>
    );
  }
}
