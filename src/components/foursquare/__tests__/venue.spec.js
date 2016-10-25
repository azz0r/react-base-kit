import 'jsdom-global/register'
import {
  React,
  expect,
  mount
} from '../../../helpers/test'
import faker from 'faker'
import MainComponent from '../venue'

describe('<Venue />', () => {
  const props = {
    name: faker.lorem.sentence(),
  }
  const wrapper = mount(<MainComponent {...props} />)
  it('contains an <Venue /> component', () => {
    expect(wrapper.find(MainComponent)).to.have.length(1)
  })
  it('allows us to set props', () => {
    const name = faker.lorem.sentence()
    wrapper.setProps({ 
      name,
    })
    expect(wrapper.find('.venue__name').text().trim()).to.equal(name)
  })
})
