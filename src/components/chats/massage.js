import React, { Component } from "react";
import { getContract } from '../utils/contractservice';
import "../../static/css/chat.css";
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'
import axios from "axios";
import Moment from "react-moment";
class massage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      userOnline: [] 
    }
  }
  componentDidMount() {
    const data = async (contracts, web3) => {
      this.setState({
        contracts, web3
      })
      let that = this;
      await web3.eth.getCoinbase(function (err, result) {
         axios
          .get("http://localhost:4000/chats/getonline?add_from=" + result)
          .then(response => {
            // console.log(response.data.chat);
            that.setState({
              userOnline: [...that.state.userOnline, ...response.data.chat]
            })
          })
          .catch(function (error) {
            // console.log(error);
          });
        that.setState({ account: result })
      })
   
  };
   getContract(data);
   window.ethereum.on("accountsChanged", function(accounts) {
     window.location.reload();
   });
   
  }
  render() {
    let data = this.state.userOnline.map(element => {
      return (
        <Link
          key={element.add_to}
          className="nav-item nav-link"
          to={`chat/${this.state.account}/${element.add_to}`}
        >
          <div className="conservation-list-wrap slideInLeft animated">
            <div className="container conservation-list">
              <div className="container-item">
                <div className="conservation-item">
                  <div className="conversation-info">
                    <div className="user-mock user-mock-mobile-xs">
                      <div className="user-img"></div>
                    </div>
                    <div className="text-info font-xs">
                      <span className="link-ghost user-name">{element.to}</span>
                      <div className="address text-grey">
                        <span>{element.add_to}</span>
                      </div>
                    </div>
                  </div>
                  <div className="last-message-info">
                    <div className="message-text font-s webkit-oriented-vertical">
                      <span className="webkit-oriented-vertical">
                        {element.massage}
                      </span>
                    </div>
                    <div className="message-date text-grey font-xs">
                      <Moment format="YYYY/MM/DD HH:mm:ss">
                        {element.created}
                      </Moment>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );})
    return (
      <div className='main-wrap-list' style={{ marginBottom: '100px',minHeight:'400px' }}>
        {data}
      </div>
    );
  }
}
export default massage;
