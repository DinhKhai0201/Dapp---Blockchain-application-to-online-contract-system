import React from 'react'
import {render} from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'

import App from './components/App'
import PageOne from './components/PageOne'
import PageTwo from './components/PageTwo'
import registerServiceWorker from './components/registerServiceWorker'
import Logo from './static/rr4_s.png'

render(
  <Router>
    <div className="container">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mb">
        <NavLink className="navbar-brand" to="/"> <img src={Logo} alt="React Router v4" /> </NavLink>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/page-1">Page 1</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/page-2">Page 2</NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Route exact path="/" component={App}/>
      <Route path="/page-1" component={PageOne}/>
      <Route path="/page-2" component={PageTwo}/>
    </div>
  </Router>,

document.getElementById('root'))

registerServiceWorker()
