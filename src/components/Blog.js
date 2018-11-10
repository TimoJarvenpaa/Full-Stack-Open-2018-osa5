import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayMoreInfo: false,
    }
  }

  toggleInfo = (event) => {
    if (event.target.tagName === 'DIV') {
      this.setState({ displayMoreInfo: !this.state.displayMoreInfo })
    }
  }

  likeBlog = async () => {
    const blog = {
      id: this.props.blog.id,
      title: this.props.blog.title,
      author: this.props.blog.author,
      url: this.props.blog.url,
      likes: this.props.blog.likes + 1,
      user: this.props.blog.user._id
    }

    const updatedBlog = await blogService.update(blog)
    this.props.updateBlog(updatedBlog)
  }

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    if (this.state.displayMoreInfo) {
      return (
        <div onClick={this.toggleInfo} style={blogStyle}>
          <div>{this.props.blog.title} by {this.props.blog.author}</div>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <div>
            {this.props.blog.likes} likes
            <button onClick={this.likeBlog}>like</button>
          </div>
          <div>added by {this.props.blog.user.name}</div>
        </div>
      )
    }

    return (
      <div onClick={this.toggleInfo} style={blogStyle}>
        {this.props.blog.title} {this.props.blog.author}
      </div>
    )
  }
}

export default Blog