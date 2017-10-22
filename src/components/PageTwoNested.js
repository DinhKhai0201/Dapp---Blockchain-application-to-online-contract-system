import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'


const PageTwo = () => (

    <div className="container">
      <div className="clearfix"><br/><br/><br/></div>
      <div className="jumbotron mt">
          <h2>Hello from a Stateless Component</h2>
          <p>React .14 introduced a simpler way to define components called stateless functional components. These components use plain JavaScript functions.</p>
          <h3>No this Keyword</h3>
          <p>The stateless component is just a functio. Thus, all the annoying and confusing quirks with Javascript’s this keyword are avoided. The entire component becomes easier to understand without the this keyword.</p>
          <h3>Just JSX Presentation</h3>
          <p>Stateless functional components are useful for dumb/presentational components. Presentational components focus on the UI rather than behavior, so it’s important to avoid using state in presentational components. Instead, state should be managed by higher-level container components, or via Flux / Redux etc. Stateless functional components don't support state or lifecycle methods.</p>
          <p>
            <Link to="https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc" target="_blank"><Button bsStyle="success">Read Article &raquo;</Button></Link>
          </p>
      </div>
    </div>
)

export default PageTwo
