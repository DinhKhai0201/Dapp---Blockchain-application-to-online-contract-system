import React from 'react'
import { Link } from 'react-router-dom'


const PageTwo = () => (
    <div className="jumbotron mt">
      <div className="col-sm-8 mx-auto mt">
        <h2>Hello from a Stateless Component</h2>
        <p>React .14 introduced a simpler way to define components called stateless functional components. These components use plain JavaScript functions.</p>
        <h3>No this Keyword</h3>
        <p>The stateless component is just a function. Thus, all the annoying and confusing quirks with Javascript’s this keyword are avoided. The entire component becomes easier to understand without the this keyword.</p>
        <h3>Just JSX Presentation</h3>
        <p>Stateless functional components are useful for dumb/presentational components. Presentational components focus on the UI rather than behavior, so it’s important to avoid using state in presentational components. Instead, state should be managed by higher-level “container” components, or via Flux/Redux/etc. Stateless functional components don’t support state or lifecycle methods.</p>
        <p>
          <Link className="btn btn-primary" to="https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc" role="button">Read Article &raquo;</Link>
        </p>
      </div>
    </div>
)

export default PageTwo
