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
      notification: null,
      title: '',
      author: '',
      url: '',
      loginVisible: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      this.setState({
        username: '',
        password: '',
        user,
        notification: `Welcome ${user.name}`
      })
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'invalid username or password'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.setState({
      user: null,
      title: '',
      author: '',
      url: ''
    })
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    const savedBlog = await blogService.create(blogObject)
    this.setState({
      blogs: this.state.blogs.concat(savedBlog),
      title: '',
      author: '',
      url: '',
      notification: `a new blog '${savedBlog.title}' by ${savedBlog.author} added`
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }


  render() {

    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.notification} />
          <ErrorNotification message={this.state.error} />
          <Togglable buttonLabel="sign in">
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleFieldChange}
              handleSubmit={this.login}
            />
          </Togglable>
        </div>
      )
    }

    return (
      <div>
        <Notification message={this.state.notification} />
        <ErrorNotification message={this.state.error} />
        <h2>blogs</h2>
        <p>{this.state.user.name} is currently logged in </p>
        <button onClick={this.logout}>logout</button>

        <BlogForm
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
          handleChange={this.handleFieldChange}
          handleSubmit={this.addBlog}
        />

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

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <div>
      <h2>Log in to the application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username:
          <input
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const BlogForm = ({ handleSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  }
}

export default App;
