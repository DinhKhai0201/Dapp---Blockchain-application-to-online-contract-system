import React from 'react'
import { Route, NavLink, Link } from 'react-router-dom'

import PageOneNested from './chat'
import PageTwoNested from './PageTwoNested'

const Topics = ({ match }) => (
    <div className="container-fluid">
      <div className="row">
        <nav className="nav nav-pills nav-fill col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
          <div className="clearfix"><br/><br/><br/></div>
          <Link className="nav-item nav-link" to={match.url}>
            <h3>Nested Routes</h3>
            <hr/>
          </Link>
          <NavLink className="nav-item nav-link" to={`${match.url}/page-1-nested`}>
            NestOne
          </NavLink>
          <NavLink className="nav-item nav-link" to={`${match.url}/page-2-nested`}>
            NestTwo
          </NavLink>
        </nav>
        <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
          <div className="clearfix"><br/><br/><br/></div>
          <h1>Dashboard</h1>
          <Route path={`${match.url}/:address1/:address2`} component={PageOneNested}/>
          <Route path={`${match.url}/page-2-nested`} component={PageTwoNested}/>
          <Route exact path={match.url} render={() => (
            <div>
              <h2>Lorem Table</h2>
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
            </div>
          )}/>
        </main>
      </div>
    </div>
)
export default Topics
