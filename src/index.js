import React from 'react'
import {render} from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Redirect 
} from 'react-router-dom'
// page
import App from './components/App'
import PageAdd from './components/PageAdd'
import Detail from './components/Detail'
import Myaccount from "./components/Myaccount";
import massage from './components/massage'
import chat from './components/chat'
import contract from './components/contract'
import Check from './components/check'
import Notfound from './components/notfound'
import Footer from './components/footer' 
// end page
import './static/css/login.css'
import "./static/css/response.css";
import  { Component } from 'react'
import { getContract } from './components/utils/contractservice'
import registerServiceWorker from './components/registerServiceWorker'
import Logo from './static/logo.png'
import './static/css/index.css'
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { toast } from "react-toastify";
import ipfs from './components/utils/ipfs'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("login") === window.ethereum.selectedAddress ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
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
            error: false,
            pictures: ''
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
            axios.get('http://localhost:4000/persons')
            .then(response => {
                // console.log(response.data);
            })
            .catch(function (error) {
                // console.log(error);
            })
        }
        getContract(data);
         window.ethereum.on("accountsChanged", function(accounts) {
           localStorage.removeItem("login");
           window.location.reload();
         });
        }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
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
        let { account} = this.state
        const obj = {
          address: account
        };
        axios.post('http://localhost:4000/persons/login', obj)
          .then(res =>{
            console.log(res.data);
            localStorage.setItem("login", res.data.person);
            if (localStorage.getItem("login") === res.data.person) {
              this.props.history.push("/");
              window.location.reload();
            } else if (localStorage.getItem("login") === "false") {
              console.log("aa");
            }
          });
    } 
  registerbt = ({ history }) => {
    let {firstname, lastname, account} = this.state
    const obj = {
            name: firstname +" "+ lastname,
            address: account
        };
    axios.post('http://localhost:4000/persons/register', obj)
        .then(res => {toast("Wow so easy !")});
  } 
    render() {
        return (
          <div className="cont_principal cont_principall ">
            <div className="cont_centrar">
              <div className="cont_login">
                <div className="cont_tabs_login">
                  <ul className="ul_tabs">
                    <li className="active">
                      <a href="#">SIGN IN</a>
                      <span className="linea_bajo_nom" />
                    </li>
                   
                  </ul>
                </div>
                <div className="cont_text_inputs ">
                  <input
                    type="text"
                    className="input_form_sign d_block active_inp"
                    placeholder="address"
                    value={this.state.account}
                  />
                </div>
               
                <div className="cont_btn">
                  <button
                    className="btn_sign"
                    type="submit"
                    onClick={this.loginbt}
                  >
                    SIGN IN
                  </button>
                </div>
                <div className="cont_text_inputs " style={{ padding:' 0px 30px 20px'}}>
                  <Link to="/register">Or Sign up</Link>
                </div>
              </div>
             
            </div>
            
          </div>
        );
    }
}
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: "",
      web3: "",
      account: "",
      login: true,
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      gender: true,
      address: "",
      ipfshash: "",
      idcard: "",
      error: false,
      GAS: 700000,
      GAS_PRICE: 2000000000
    };
  }
  componentDidMount() {
    const data = async (contracts, web3) => {
      this.setState({
        contracts,
        web3
      });
      let that = this;
      await web3.eth.getCoinbase(function(err, result) {
        that.setState({ account: result });
      });
       await contracts.events
         .AddUser(
           {
             fromBlock: 0,
             toBlock: "latest"
           },
           function(error, event) {
           console.log(event)
           }
         )
         .on("data", function(event) {
         
         })
         .on("changed", function(event) {
           // remove event from local database
         })
         .on("error", console.error);
      axios
        .get("http://localhost:4000/persons")
        .then(response => {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    };
    getContract(data);
    window.ethereum.on("accountsChanged", function(accounts) {
      localStorage.removeItem("login");
      window.location.reload();
    });
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  registerbt = ({ history }) => {
    let {
      firstname,
      lastname,
      account,
      email,
      phone,
      address,
      gender,
      idcard,
      ipfshash,
      contracts,
      GAS,
      GAS_PRICE
    } = this.state;
    const obj = {
      name: firstname + " " + lastname,
      address: account
    };
    axios.post("http://localhost:4000/persons/register", obj).then(res => {
      toast("Wow so easy !");
    });
     contracts.methods
       .addUser(
         account,
         idcard,
         firstname + " " + lastname,
         email,
         gender,
         phone,
         address,
         ipfshash
       )
       .send(
         { from: `${account}`, gas: GAS, gasPrice: `${GAS_PRICE}` },
         function(err, result) {
           console.log(result);
         }
       )
       .once("receipt", receipt => {
         alert("You just add");
       });  
  };
  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  };
  convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    await ipfs.add(buffer, (err, ipfsHash) => {
      this.setState({ ipfshash: 'https://gateway.ipfs.io/ipfs/' + ipfsHash[0].hash });
    })

  };
  render() {
    return (
      <div className="cont_principal">
        <div className="cont_centrar">
          <div className="cont_login">
            <div className="cont_tabs_login">
              <ul className="ul_tabs">
                <li className="active">
                  <a href="#" >
                    SIGN UP
                  </a>
                  <span className="linea_bajo_nom" />
                </li>
              </ul>
            </div>
            <div className="cont_text_inputs">
              <input
                type="text"
                className="input_form_sign d_block active_inp"
                placeholder="First name"
                name="firstname"
                onChange={this.handleChange}
              />
              <input
                type="text"
                className="input_form_sign d_block active_inp"
                placeholder="Last name"
                name="lastname"
                onChange={this.handleChange}
              />
              <input
                type="text"
                className="input_form_sign d_block active_inp"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />
              <input
                type="text"
                className="input_form_sign d_block active_inp"
                placeholder="Id card"
                name="idcard"
                onChange={this.handleChange}
              />
              <input
                type="text"
                className="input_form_sign d_block active_inp"
                placeholder="Address"
                name="address"
                onChange={this.handleChange}
              />
              <input
                type="text"
                className="input_form_sign d_block active_inp"
                placeholder="Phone"
                name="phone"
                onChange={this.handleChange}
              />
              <input
                type="file"
                className="input_form_sign d_block active_inp file-ipfs"
                placeholder="ipfshash"
                name="ipfshash"
                onChange={this.captureFile}
              />
            </div>
            <div className="cont_btn">
              <button className="btn_sign" onClick={this.registerbt}>
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
render(
  <Router>
    <div>
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top mb">
          <NavLink
            className="navbar-brand"
            to="/"
            style={{ padding: "0px 40px 0px 30px" }}
          >
            {" "}
            <img src={Logo} style={{ width: "40px" }} alt="Blockchain" />{" "}
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#TopNavbar"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="TopNavbar">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item space">
                <NavLink className="nav-link" to="/add-apartment">
                  Add Apartment
                </NavLink>
              </li>
              <li className="nav-item space">
                <NavLink className="nav-link" to="/check">
                  Check signature
                </NavLink>
              </li>
              <li className="nav-item space">
                <NavLink className="nav-link" to="/chats">
                  Chat
                </NavLink>
              </li>
              {localStorage.getItem("login") ===
              window.ethereum.selectedAddress ? (
                <li className="nav-item space">
                  <NavLink className="nav-link" to="/my">
                    My account
                  </NavLink>
                </li>
              ) : null}
            </ul>
            <div className="form-inline my-2 my-lg-0">
              {localStorage.getItem("login") !==
              window.ethereum.selectedAddress ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  className=""
                >
                  <NavLink className="nav-link" to="/login" style ={{color: 'white'}}>
                    Login
                  </NavLink>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  className="style-space"
                  onClick={() => {
                    localStorage.removeItem("login");
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </nav>

        <Route exact path="/" component={App} />
        <PrivateRoute  path="/add-apartment" component={PageAdd} />
        <Route  path="/detail/:id" component={Detail} />
        <PrivateRoute  path="/chat/:address1/:address2" component={chat} />
        <Route  path="/check" component={Check} />
        <Route  path="/contract/:id" component={contract} />
        <PrivateRoute  path="/my" component={Myaccount} />
        <PrivateRoute  path="/chats" component={massage} />
        <Route  path="/login" component={Login} />
        <Route  path="/register" component={Register} />
        {/* <Route path="*" exact={true}  component={Notfound} />
        <Redirect from='*' to='/404' /> */}
      </div>
      <Footer />
    </div>
    
  </Router>,
  document.getElementById("root")
);

registerServiceWorker()
