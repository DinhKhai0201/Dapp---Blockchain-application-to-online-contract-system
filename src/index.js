import React from 'react'
import {render} from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect, withRouter 
} from 'react-router-dom'
import App from './components/App'
import PageAdd from './components/PageAdd'
import PageFaq from './components/PageFaq'
import Detail from './components/Detail'
import Topics from './components/NestedRoutes'
import Footer from './components/footer'
import registerServiceWorker from './components/registerServiceWorker'
import Logo from './static/rr4_s.png'
import './static/css/index.css'
import Button from '@material-ui/core/Button';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    
  },
  signout(cb) {
    this.isAuthenticated = false
  }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
)

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    )
))
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      contracts: '',
      web3: '',
      account: ''
    };
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer == true) {
       return <Redirect to = {from} />
    }
    if (fakeAuth.isAuthenticated == true ) {
      return (
        <div>
        login
        </div>
      )
    } else {
      return (

        <div>
          <p>You must log in to view the page</p>
          <AuthButton />
          <button onClick={this.login}>Log in</button>
        </div>
      )
    }
   
  }
}
render(

  <Router>
  
    <div>
      <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mb">
        <NavLink className="navbar-brand" to="/"> <img src={Logo} alt="React Router v4" /> </NavLink>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#TopNavbar" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="TopNavbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item space">
              <NavLink className="nav-link" to="/add-apartment">Add Apartment</NavLink>
            </li>
            <li className="nav-item space">
              <NavLink className="nav-link" to="/sigh">Sign a Agreement</NavLink>
            </li>
            <li className="nav-item space">
              <NavLink className="nav-link" to="/faq">FAQ</NavLink>
            </li>
            <li className="nav-item space">
              <NavLink className="nav-link" to="/guide">Guide</NavLink>
            </li>
          </ul>
            <div className="form-inline my-2 my-lg-0">
              <Button variant="contained" color="secondary" className="style-space" >
                Login
              </Button>
            </div>
        </div>
      </nav>

      <Route exact path="/" component={App}/>
      <PrivateRoute path="/add-apartment" component={PageAdd}/> 
      <Route path="/faq" component={PageFaq}/>
      <Route path="/detail/:id" component={Detail}/>
      <Route path="/guide" component={Topics}/>
      <Route path="/login" component={Login} />
    </div>
    </div>

  </Router>,

document.getElementById('root'))

registerServiceWorker()
