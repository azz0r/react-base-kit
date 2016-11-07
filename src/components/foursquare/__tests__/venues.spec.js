import "jsdom-global/register"
import {
  React,
  expect,
  mount
} from "../../../helpers/test"
import MainComponent from "../venues"

describe("<Venues />", () => {
  const props = {
    venues: [],
  }
  const wrapper = mount(<MainComponent {...props} />)
  it("contains an <Venues /> component", () => {
    expect(wrapper.find(MainComponent)).to.have.length(1)
  })
  it("allows us to set props", () => {
    wrapper.setProps({
      venues: new Array(2),
    })
    expect(wrapper.props().venues.length).to.equal(2)
  })
})
