/* eslint no-undef: 0 */
// no-undef is being used to avoid compiling errors on
// `html.js` global variable: `window.pagename`
export function setPageName(newPageName) {
  if (window && window.s && window._satellite) {
    // Injecting page name into window.app.pagename
    pagename = newPageName;
    // and updating omniture pagename
    window.s.pageURL = window.location.href;
    window.s.pagename = newPageName;

    // DTM Direct Call
    window._satellite.track('singlepage_load');
  }

  return true;
}
