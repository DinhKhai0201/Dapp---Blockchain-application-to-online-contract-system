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
// import Login from './components/Login'
import './static/css/login.css'
import  { Component } from 'react'
import { getContract } from './components/utils/contractservice'
import registerServiceWorker from './components/registerServiceWorker'
import Logo from './static/rr4_s.png'
import './static/css/index.css'
import Button from '@material-ui/core/Button';

const fakeAuth = {
  isAuthenticated: false
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (localStorage.getItem("login") === 'true')
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
)

// const AuthButton = withRouter(({ history }) => (
//   fakeAuth.isAuthenticated ? (
//     <p>
//       Welcome! <button onClick={() => {
//         fakeAuth.signout(() => history.push('/'))
//       }}>Sign out</button>
//     </p>
//   ) : (
//       <p>You are not logged in.</p>
//     )
// ))
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contracts: '',
            web3: '',
            account: '',
            login:true,
            firstname:'',
            lastname:'',
            email:'',
            error: false
        };
    }
    
    componentDidMount() {

        const data = async (contracts, web3) => {
            this.setState({
                contracts, web3
            })
            let that = this;
            await web3.eth.getCoinbase(function (err, result) {
                that.setState({ account: result })
            })
          // await contracts.events.allEvents({
          //   // filter: { myaddress: this.state.account },
          //   fromBlock: 0,
          //   toBlock: 'latest'
          // }, function (error, events) {
          //   console.log(events);
          // })
          //   .then(function (events) {
          //   });
           
        }
        getContract(data);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state);
    }
    handlelogin =()=>{
        this.setState({
                login:true
        }) 
    }
    handleregister =()=>{
        this.setState({
                login:false
        }) 
    }
    loginbt =({ history }) => {
        
        // if (this.state.name === 'khai' && this.state.email === 'khai@gmail.com') {
        //   fakeAuth.isAuthenticated = true;
        //  localStorage.setItem("login", 'true');
        //  if (localStorage.getItem("login") === 'true') {
        //     this.props.history.push('/');
        //  }
        //  window.location.reload();
        // } else {
        //   alert('Thong tin dang nhap bi sai!');
        // }
       
       
    } 
  registerbt = ({ history }) => {
    let {firstname, lastname, email, confirmemail, error} = this.state
   

  } 
    render() {
        let display;
        console.log(this.state);
        if (this.state.login == true) {
            display = <div className="email-login">
                      {/* <div className="u-form-group">
                        <input name ="firstname" type="name" placeholder="Name" onChange={e => this.handleChange(e)}/>
                      </div>
                      <div className="u-form-group">
                        <input name="name" type="name" placeholder="Name" onChange={e => this.handleChange(e)} />
                      </div> */}
                      <div className="u-form-group">
                        <input name ="email" type="email" placeholder="email" onChange={e => this.handleChange(e)}/>
                      </div>
                      <div className="u-form-group">
                        <button onClick ={this.loginbt}  type ="submit" >Log in</button>
                      </div>
                     
                    </div>
        } else {
            display =<div className="email-signup">
                  <div className="u-form-group">
                    <input name ='firstname' type="name" placeholder="First Name" onChange={e => this.handleChange(e)} />
                  </div>
                  <div className="u-form-group">
                    <input name ="lastname" type="name" placeholder="Last Name" onChange={e => this.handleChange(e)}/>
                  </div>
                  <div className="u-form-group">
                    <input name ="email" type="email" placeholder="email" onChange={e => this.handleChange(e)}/>
                  </div>
                 
                  <div className="u-form-group">
                    <button>Sign Up</button>
                  </div>
                </div>
        }
        return (
           <div className="login-box">
        <div className="lb-header">
          <a href="#" className="active" id="login-box-link" onClick ={this.handlelogin}>Login</a>
          <a href="#" id="signup-box-link" onClick ={this.handleregister}>Sign Up</a>
        </div>
        {display}
      </div>
        );
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
            {(localStorage.getItem("login") === null)?( <Button variant="contained" color="secondary" className="style-space">
                <NavLink className="nav-link" to="/login">Login</NavLink>
                

              </Button>):(<Button variant="contained" color="secondary" className="style-space" onClick ={() =>{localStorage.removeItem('login');window.location.reload();}}>
                Logout
              </Button>)

            }
             
            </div>
        </div>
      </nav>

      <Route exact path="/" component={App}/>
      <PrivateRoute path="/add-apartment" component={PageAdd}/> 
      <Route path="/faq" component={PageFaq}/>
      <Route path="/detail/:id" component={Detail}/>
      <Route path="/guide" component={Topics}/>
      <Route path="/login" component={Login}/>
      
    </div>
    </div>

  </Router>,

document.getElementById('root'))

registerServiceWorker()
