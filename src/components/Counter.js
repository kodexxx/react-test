import React, { Component } from 'react'


class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  inc() {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button type="button" className="btn btn-primary" onClick={() => this.inc()}>+1</button>
      </div>
    );
  }
}

export default Counter;
