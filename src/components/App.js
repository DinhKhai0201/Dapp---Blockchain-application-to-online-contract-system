import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <div className="jumbotron mt">
        <div className="col-sm-8 mx-auto mt">
          <h2>React Router Version 4</h2>
          <p>This guide’s purpose is to explain the mental model to have when using React Router. We call it “Dynamic Routing”, which is quite different from the “Static Routing” you’re probably more familiar with.</p>
          <h3>Static Routing</h3>
          <p>If you’ve used Rails, Express, Ember, Angular etc. you’ve used static routing. In these frameworks, you declare your routes as part of your app’s initialization before any rendering takes place. React Router pre-v4 was also static (mostly).</p>
          <h3>Dynamic Routing</h3>
          <p>When we say dynamic routing, we mean routing that takes place as your app is rendering, not in a configuration or convention outside of a running app. That means almost everything is a component in React Router.</p>
          <p>
            <Link to="https://reacttraining.com/react-router/web/example/basic" target="_blank"><Button bsStyle="danger">Example &raquo;</Button></Link>
          </p>
        </div>
      </div>
    );
  }
}

export default App
