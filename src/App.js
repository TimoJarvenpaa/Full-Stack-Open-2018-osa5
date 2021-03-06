import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
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

  componentDidMount = async () => {
    const blogs = await blogService.getAll()
    this.setState({ blogs: blogs.sort(this.compareLikes) })

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
    blogService.setToken(null)
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
      blogs: this.state.blogs.concat(savedBlog).sort(this.compareLikes),
      title: '',
      author: '',
      url: '',
      notification: `a new blog '${savedBlog.title}' by ${savedBlog.author} added`
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  updateBlogs = async (updatedBlog) => {
    const blogs = this.state.blogs.map(blog => {
      return blog.id === updatedBlog.id ? updatedBlog : blog
    })
    await this.setState({ blogs: blogs.sort(this.compareLikes) })
  }

  compareLikes = (a, b) => {
    return b.likes - a.likes
  }

  removeFromBlogs = async (removedBlog) => {
    const blogs = this.state.blogs.filter(blog => blog.id !== removedBlog.id)
    await this.setState({ blogs: blogs.sort(this.compareLikes) })
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
          <Blog
            key={blog.id}
            blog={blog}
            user={this.state.user}
            updateBlogs={this.updateBlogs}
            removeFromBlogs={this.removeFromBlogs}
          />
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

export default App
