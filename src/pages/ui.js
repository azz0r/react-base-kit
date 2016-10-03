import React from 'react';
import Page from '../components/page';
// eslint-disable-next-line
import { createMboxComponent } from
  '../public/javascript/at-react-component-0.2.0';
const Mbox = createMboxComponent();

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
