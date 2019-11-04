import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Container,Row, Col} from 'react-bootstrap'
import { Chip } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import '../static/css/roulette.css'
import '../static/css/main.css'
import '../static/css/form.css'
import '../static/css/buttonEf.css'
import web3cur from './utils/web3service'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {getContract} from './utils/contractservice';

class PageGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infuraKey: "cf658270146645bca881f8a7d4752099",
      status:"loading",
      web3: null,
      live: null,
      account: '',
      contracts: '',
      balanceOf: '',
      network: '',
      creator: null,
      number:0,
      betType: 0,
      amount: 10,
      GAS: 700000, //number in option 
      GAS_PRICE: 2000000000, //string in option
      bet: [],
      rounds: 0,
      betTypes: ['color', 'column', 'dozen',
                'eighteen', 'modulus', 'numbers'], //array start from 0 , object start from 1
      numberTypes: {
        color: ['black','red'],
        column: ['left', 'middle', 'right'],
        dozen: ['first', 'secon','third'],
        eighteen: ['low', 'high'],
        modulus: ['even', 'odd'],
        numbers: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
      },
      payouts : ['2','3','3','2','2','36'],
      array: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
    };
  }

  componentDidMount() {
    let {number, betType, numberTypes,betTypes} =this.state; 
    // if ("number" in localStorage) {
    //     this.setState({number: localStorage.getItem('number')})
    // } else {
    //    console.log('number not set')
    // }
    // if ("betType" in localStorage) {
    //     this.setState({betType: localStorage.getItem('betType')})
    // } else {
    //    console.log('betType not set')
    // }
    const game = async (contracts, web3) => {
        this.setState({
           contracts, web3
        })
        let that = this;
        //get account
        await web3.eth.getCoinbase(function(err, result) {
          that.setState({account: result})
        })
        contracts.methods.balanceOf(this.state.account).call(function(err, result) {
          console.log("balanceOf", result)
          that.setState({balanceOf: result})
        })
        contracts.methods.live().call(function(err, result) {
          that.setState({live: web3.utils.hexToNumber(result)})
        })
        contracts.methods.fundsWallet().call(function(err, result) {
          that.setState({creator: result})
        })
        contracts.methods.rounds().call(function(err, result) {
          that.setState({rounds: result})
        })
        //get network 
        web3.eth.net.getId().then(netId => {
        netId = parseInt(netId);
        switch (netId) {
          case 1: // main network
            that.setState({
              network: "You're on the Ethereum main network. Please switch to Ropsten."
            })
            break
          case 2: // morden
            that.setState({
              network: "You're on the Morden test network. Please switch to Ropsten."
            })
            break
          case 3: // ropsten
            that.setState({
              network: "Ethereum Ropsten network"
            })
            break
          case 4: // rinkeby
            that.setState({
              network: "You're on the Rinkeby test network. Please switch to Ropsten."
            })
            break
          case 42: // kovan
            that.setState({
              network: "You're on the Kovan test network. Please switch to Ropsten."
            })
            break
          default: // unknown network, should be ganache
            that.setState({
              network: "This is an unknown network."
            })
        }
      })
      }
      getContract(game);

  
  };
  //info console
  contractInfo = ()=> {
    console.log(this.state);
  }
  // normal function
  bet =()=> {
    let {contracts,account, web3, number, betType, amount} =this.state; 
    contracts.methods.bet(number, betType, amount).send({from: `${account}`},function(err, result) {
      console.log(result)
    })
  }
  //change live 0 to 1
  createBet =  () => {
    let {contracts,account, web3} =this.state; 
    let that = this;
    contracts.methods.changeLive().send({from: `${account}`},function(err, result) {
       that.setState({
        live: result
      })
    })
  }
  //set bet
  setBet =(_number, _betType) => {

    // let {contracts,account, web3} =this.state; 
    this.setState({
      number: _number,
      betType : _betType
    })
    // localStorage.setItem('number', _number);
    // localStorage.setItem('betType', _betType);

  }
  //creator spin 
  spin =() => {
    let {contracts,account, web3, GAS, GAS_PRICE} =this.state; 
    contracts.methods.spinWheel().send({from: `${account}`, gas: GAS, gasPrice: `${GAS_PRICE}`},function(err, result) {
      console.log("spin");
    })
  }
  updateInputValue = (evt)=> {
    this.setState({
      amount: evt.target.value
    });
  }
  render() {
    let {account, network, number, balanceOf, numberTypes, betTypes, betType, payouts} =this.state; 
    return (
        <div className="container">
          <div className="clearfix"><br/><br/><br/></div>
          <div className="jumbotron">
              <div className="row">
                <div className="col s12 shadow gradient1 light-green-text text-accent-2">
                  <div className="row dark">
                    <div className="col s5 offset-s1">
                      <div className="infolabeldark indigo-text text-lighten-4">Your public ID</div>
                      <Chip
                        label={account}
                        color="primary"
                      />
                      <div className="dividerdark" />
                      <div className="infolabeldark indigo-text text-lighten-4">Your tokens</div>
                      <div className="user chip light-green-text text-accent-2 indigo darken-4">
                     
                        <Chip
                          label={balanceOf}
                          color="primary"
                        />
                      </div>
                      <br />
                    </div>
                    <div className="col s5 right-align">
                      <div className="infolabeldark indigo-text text-lighten-4">Ethereum Network</div>
                      <div className="user chip white-text indigo darken-4">
                        <Chip
                        label={network}
                        color="primary"
                      />
                      </div>
                      <div className="dividerdark" />
                      <div className="infolabeldark indigo-text text-lighten-4">Last blocks mined
                      </div>
                      <div id="lastblocks-home">
                          <LinearProgress />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="row">
              <div className="col s12 shadow gradient1 light-green-text text-accent-2">
                <div className="row">
                  <div className="col s12 offset-s1 betform">
                    <img src="https://raw.githubusercontent.com/bordalix/ethereum-roulette/master/src/images/wheel.png" /><br />
                    <Button variant="outlined" color="primary" className="style-space raise" onClick ={this.createBet}>
                    Create
                    </Button>
                     <Button variant="outlined" color="primary" className="style-space" onClick ={this.contractInfo}>
                      Contract info
                      </Button>
                    <Button variant="outlined" color="primary" className="style-space pulse" onClick ={this.spin}>
                    Spin
                    </Button>
                  </div>
                  <div className="col s12 offset-s1 betform">
                   <Button variant="outlined" color="primary" className="style-space slide" onClick ={this.bet}>
                    Bet
                    </Button>
                      <div className="group">  
                      <label>Bet Amount</label>    
                      <input type="number" min ="0" onChange={this.updateInputValue}/>
                      <span className="bar"></span>                     
                    </div>
                  </div>
                  <div className="col s12 offset-s1 ">
                    <form>
                    <div className="group">   
                      <label>Amount</label>   
                      <input type="text"  disabled value ={this.state.amount}/>
                      <span className="bar"></span>                     
                    </div>
                      
                    <div className="group">  
                      <label>Bet type</label>    
                      <input type="text" disabled value ={betTypes[betType] }/>
                      <span className="bar"></span>                     
                    </div>
                    <div className="group">  
                      <label>Type choice</label>    
                      <input type="text" disabled value = {(numberTypes[betTypes[betType]])[number]}/>
                      <span className="bar"></span>                     
                    </div>
                    <div className="group">  
                      <label>Win rate</label>    
                      <input type="text" disabled value = {(payouts[betType])}/>
                      <span className="bar"></span>                     
                    </div>
                    <div className="group">  
                      <label>Num of player</label>    
                      <input type="text" disabled/>
                      <span className="bar"></span>                     
                    </div>
                    
                  </form>
                  </div>
                </div>
              </div>
          </div>
         
          <div className="row">
            <Button variant="outlined" className="green" className="style-space up" onClick = {()=>this.setBet(0, 5)}>
            0
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(1, 5)}>
            1
            </Button>
            <Button variant="contained" color="primary " className="style-space dark up" onClick = {()=>this.setBet(2, 5)}>
            2
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(3, 5)}>
            3
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(4, 5)}>
            4
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(5, 5)}>
            5
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(6, 5)}>
            6
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(7, 5)}>
            7
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(8, 5)}>
            8
            </Button>
            <Button variant="contained" color="secondary" className="style-space up"  up onClick = {()=>this.setBet(9, 5)}>
            9
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(10, 5)}>
            10
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(11, 5)}>
            11
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(12, 5)}>
            12
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(13, 5)}>
            13
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(14, 5)}>
            14
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(15, 5)}>
            15
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(16, 5)}>
            16
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(17, 5)}>
            17
            </Button>
            <Button variant="contained" color="secondary" className="style-space" up onClick = {()=>this.setBet(18, 5)}>
            18
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(19, 5)}>
            19
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(20, 5)}>
            20
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(21, 5)}>
            21
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(22, 5)}>
            22
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(23, 5)}>
            23
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(24, 5)}>
            24
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(25, 5)}>
            25
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(26, 5)}>
            26
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(27, 5)}>
            27
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(28, 5)}>
            28
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(29, 5)}>
            29
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(30, 5)}>
            30
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(31, 5)}>
            31
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(32, 5)}>
            32
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(33, 5)}>
            33
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(34, 5)}>
            34
            </Button>
            <Button variant="contained" color="primary" className="style-space dark up" onClick = {()=>this.setBet(35, 5)}> 
            35
            </Button>
            <Button variant="contained" color="secondary" className="style-space up" onClick = {()=>this.setBet(36, 5)}>
            36
            </Button>
          </div>
          
          <div className="row">
                <div className="col s12 shadow gradient1 light-green-text text-accent-2">
                  <div className="row">
                    <div className="col s4 offset-s1 betform">
                    <div className="infolabeldark indigo-text text-lighten-4 ">Color</div>
                       <Button variant="outlined" color="primary" className="style-space slide" onClick = {()=>this.setBet(1, 0)}>
                        Red
                        </Button>
                        <Button variant="outlined" color="primary" className="style-space slide" onClick = {()=>this.setBet(0, 0)}>
                        Black
                        </Button>
                    </div>
                    <div className="col s4 right-align betform">
                    <div className="infolabeldark indigo-text text-lighten-4">Even or Odd</div>
                     <Button variant="outlined" color="primary" className="style-space slide" onClick = {()=>this.setBet(0, 4)}>
                      Even
                      </Button>
                      <Button variant="outlined" color="primary" className="style-space slide" onClick = {()=>this.setBet(1, 4)}>
                      Odd
                      </Button>
                    </div>
                    <div className="col s4 offset-s1 betform">
                    <div className="infolabeldark indigo-text text-lighten-4">1 to 18 or 19 to 36</div>
                       <Button variant="outlined" color="primary" className="style-space slide" onClick = {()=>this.setBet(0, 3)}>
                        Low
                        </Button>
                        <Button variant="outlined" color="primary" className="style-space slide" onClick = {()=>this.setBet(1, 3)}>
                        High
                        </Button>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col s4 offset-s1 betform">
                    <div className="infolabeldark indigo-text text-lighten-4">1-12 or 13-24 or 25-36</div>
                       <Button variant="outlined" color="primary" className="style-space slide" onClick = {()=>this.setBet(0, 1)}>
                        Left
                        </Button>
                        <Button variant="outlined" color="primary" className="style-space slide" onClick = {()=>this.setBet(1, 1)}>
                        Middle
                        </Button>
                        <Button variant="outlined" color="primary" className="style-space slide" onClick = {()=>this.setBet(2, 1)}>
                        Right
                        </Button>
                    </div>
                    <div className="col s4 offset-s1 betform">
                      <div className="infolabeldark indigo-text text-lighten-4">Col-1 or Col-2 or Col-3</div>
                       <Button variant="outlined" color="primary" className="style-space slide" onClick = {()=>this.setBet(0, 2)}>
                          First
                        </Button>
                        <Button variant="outlined" color="primary" className="style-space slide" onClick = {()=>this.setBet(1, 2)}>
                        Second
                        </Button>
                        <Button variant="outlined" color="primary" className="style-space slide" onClick = {()=>this.setBet(2, 2)}>
                        Third
                        </Button>
                    </div>
                  </div>
                </div>
              </div>
          <div>
      </div>
    </div>

    );
  }
}

export default PageGame
