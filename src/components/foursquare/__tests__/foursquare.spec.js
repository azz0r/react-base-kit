import "jsdom-global/register"
import {
  React,
  Provider,
  expect,
  mount,
  store
} from "../../../helpers/test"
import MainComponent from "../foursquare"

describe("<Foursquare />", () => {
  const wrapper = mount(
    <Provider store={store}>
      <MainComponent />
    </Provider>
  )
  it("contains an <Foursquare /> component", () => {
    expect(wrapper.find(MainComponent)).to.have.length(1)
  })
})
