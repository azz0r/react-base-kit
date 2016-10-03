/* eslint max-len: 0 */
import React from 'react';

export default class Html extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    css: React.PropTypes.string,
    body: React.PropTypes.string.isRequired,
    entry: React.PropTypes.string.isRequired,
    production: React.PropTypes.bool.isRequired,
    pageName: React.PropTypes.string.isRequired,
    openTagUrl: React.PropTypes.string.isRequired,
    dtmUrl: React.PropTypes.string,
    canonical: React.PropTypes.string
  };

  static defaultProps = {
    title: '',
    description: ``
  };

  /**
  * render
  * @return {ReactElement} markup
  */
  render() {
    const { dtmUrl } = this.props;
    const htmlClass = this.props.production ? 'production' : 'development';
    return (
      <html className={`no-js ${htmlClass}`} lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>{this.props.title}</title>
          <meta httpEquiv="Cache-Control" content="no-cache" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="0" />
          <meta name="description" content={this.props.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
          <meta httpEquiv="content-language" content="en-gb" />
          {/* Canonical URL */}
          <link rel="canonical" href={this.props.canonical} />
          {/* Adobe Dynamic Tag Management */}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react-dom.js"></script>
          <If condition={dtmUrl}>
            <script src={dtmUrl} />
          </If>
          <script src="/mobile/javascripts/at-react-component-0.2.0.js"></script>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `var pagename = '${this.props.pageName}';`
            }}
          />
          <If condition={this.props.production}>
            <link type="text/css" rel="stylesheet" href={this.props.css} />
          <Else />
            <style
              id="css"
              dangerouslySetInnerHTML={{
                __html: this.props.css
              }}
            />
          </If>
        </head>
        <body>
          <div
            id="app"
            dangerouslySetInnerHTML={{
              __html: this.props.body
            }}
          />
          <script src={this.props.entry}></script>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: 'if (typeof window._satellite !== "undefined") { window._satellite.pageBottom(); }'
            }}
          />
        </body>
      </html>
    );
  }

}
