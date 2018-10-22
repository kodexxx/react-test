import React, { Component } from 'react'

import NProgress from 'nprogress'

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: {}
    }
  }
  loadData(id) {
    NProgress.start()
    fetch('https://jsonplaceholder.typicode.com/todos/'+id)
      .then(response => response.json())
      .then((data) => {
        this.setState({ todo: data })
        NProgress.done()
      })
  }
  componentDidMount() {
    this.loadData(this.props.match.params.article)
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps.match.params.article)
  }
  render() {
    return (
    <div>
        <h4>{this.state.todo.title}</h4>
    </div>
    );
  }
}

export default Article;
