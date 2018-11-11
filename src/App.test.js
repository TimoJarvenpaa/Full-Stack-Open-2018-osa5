import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
//import blogService from './services/blogs'

describe.only('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('If user is not logged in, no blogs are rendered', () => {
    app.update()
    //console.log(app.debug())
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(0)
    const loginFormComponents = app.find(LoginForm)
    expect(loginFormComponents.length).toEqual(1)
  })
})