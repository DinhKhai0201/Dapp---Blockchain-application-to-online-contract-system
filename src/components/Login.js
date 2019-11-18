import React, { Component } from 'react'
import { getContract } from './utils/contractservice'
import '../static/css/login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contracts: '',
            web3: '',
            account: '',
            login:true,
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
           
        }
        getContract(data);
    };
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
    render() {
        let display;
        if (this.state.login == true) {
            display = <form className="email-login">
                      <div className="u-form-group">
                        <input type="email" placeholder="Name" />
                      </div>
                      <div className="u-form-group">
                        <input type="email" placeholder="email" />
                      </div>
                      <div className="u-form-group">
                        <button>Log in</button>
                      </div>
                     
                    </form>
        } else {
            display =<form className="email-signup">
                  <div className="u-form-group">
                    <input type="email" placeholder="Name" />
                  </div>
                  <div className="u-form-group">
                    <input type="email" placeholder="email" />
                  </div>
                  <div className="u-form-group">
                    <input type="email" placeholder="Confirm Email" />
                  </div>
                  <div className="u-form-group">
                    <button>Sign Up</button>
                  </div>
                </form>
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

export default Login
