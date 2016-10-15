import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import faker from 'faker'
import Foursquare from '../foursquare'

describe('<Foursquare />', () => {
  const wrapper = mount(<Foursquare {...props} />)
  it('contains an <Foursquare /> component', () => {
    expect(wrapper.find(Foursquare)).to.have.length(1)
  })
})
