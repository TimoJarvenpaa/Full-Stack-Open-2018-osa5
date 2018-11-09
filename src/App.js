import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null,
      notification: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      this.setState({
        username: '',
        password: '',
        user
      })
    } catch (exception) {
      this.setState({
        error: 'invalid username or password',
        username: '',
        password: ''
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {

    const loginForm = () => (
      <div>
        <h2>Log in to the application</h2>
        <form onSubmit={this.login}>
          <div>
            username:
                  <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password:
                  <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.notification} />
          <ErrorNotification message={this.state.error} />
          {loginForm()}
        </div>
      )
    }

    return (
      <div>
        <Notification message={this.state.notification} />
        <ErrorNotification message={this.state.error} />
        <h2>blogs</h2>

        <p>{this.state.user.name} is currently logged in </p>

        {this.state.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="errorNotification">
      {message}
    </div>
  )
}

export default App;
