import React from 'react'
import {
  Route,
  NavLink
} from 'react-router-dom'
import { Button } from 'react-bootstrap'


const Topics = ({ match }) => (

    <div className="container-fluid">
      <div className="clearfix"><br/><br/><br/></div>
      <div className="row">
        <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <NavLink class="nav-link" to={`${match.url}/page-1-nested`}>
                <Button bsStyle="primary" block>NestOne</Button><br/>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink class="nav-link" to={`${match.url}/page-2-nested`}>
                <Button bsStyle="primary" block>NestTwo</Button>
              </NavLink>
            </li>
          </ul>
        </nav>

        <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
          <h1>Dashboard</h1>

          <h2>Section title</h2>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Header</th>
                  <th>Header</th>
                  <th>Header</th>
                  <th>Header</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1,001</td>
                  <td>Lorem</td>
                  <td>ipsum</td>
                  <td>dolor</td>
                  <td>sit</td>
                </tr>
                <tr>
                  <td>1,002</td>
                  <td>amet</td>
                  <td>consectetur</td>
                  <td>adipiscing</td>
                  <td>elit</td>
                </tr>
                <tr>
                  <td>1,003</td>
                  <td>Integer</td>
                  <td>nec</td>
                  <td>odio</td>
                  <td>Praesent</td>
                </tr>
                <tr>
                  <td>1,003</td>
                  <td>libero</td>
                  <td>Sed</td>
                  <td>cursus</td>
                  <td>ante</td>
                </tr>
                <tr>
                  <td>1,004</td>
                  <td>dapibus</td>
                  <td>diam</td>
                  <td>Sed</td>
                  <td>nisi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <Route path={`${match.url}/:topicId`} component={Topic}/>
      <Route exact path={match.url} render={() => (
        <h3>Please select a topic.</h3>
      )}/>

  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default Topics
