import 'jsdom-global/register'
import {
  React,
  Provider,
  expect,
  mount,
  store
} from '../../../helpers/test'
import faker from 'faker'
import MainComponent from '../search'

describe('<Search />', () => {
  const props = {
    name: faker.lorem.sentence(),
  }
  const wrapper = mount(
    <Provider store={store}>
      <MainComponent {...props} />
    </Provider>
  )
  it('contains an <Search /> component', () => {
    expect(wrapper.find(MainComponent)).to.have.length(1)
  })
})
