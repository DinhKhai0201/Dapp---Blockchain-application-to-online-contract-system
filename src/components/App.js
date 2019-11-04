import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../static/css/home.css'
import RecipeReviewCard from './card'
import { getContract } from './utils/contractservice';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: 'aaaa.png',
      contracts: '',
      web3: '',
      account: '',
      data: [],
      search: '',
      GAS: 700000,
      GAS_PRICE: 2000000000

    };
  }

  componentDidMount() {
    const data = async (contracts, web3) => {
      console.log(contracts);
      this.setState({
        contracts, web3
      })
      let that = this;
      await web3.eth.getCoinbase(function (err, result) {
        that.setState({ account: result })
      })
      let dataA = [];
      await contracts.events.AddApartment({
            fromBlock: 0,
            toBlock: 'latest'
        }, function(error, event){ 
          if (dataA) {
            dataA.push(event.returnValues);
          }
         })
        .on('data', function(event){
          that.setState({
            data: dataA
          })
        })
        .on('changed', function(event){
            // remove event from local database
        })
        .on('error', console.error);
    }
    getContract(data);
  };
  getdata(contracts, dataA, that) {
     contracts.events.AddApartment({
      fromBlock: 0,
      toBlock: 'latest'
    }, function (error, event) {
      dataA.push(event.returnValues);
      // dataA = Object.values(dataA.reduce((acc, cur) => Object.assign(acc, {
      //   [cur.returnValues.id]: cur
      // }), {}));
    })
      .on('data', function (event) {
        that.setState({
          data: dataA
        })
      })
      .on('changed', function (event) {
        // remove event from local database
      })
      .on('error', console.error);
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    let dataold = [];
    if (e.target.value != '') {
      let datanew = this.state.data.filter(dataz => dataz.name.includes(`${this.state.search}`) || dataz.description.includes(`${this.state.search}`))
      console.log(datanew);
      this.setState({
        data: datanew
      })
    } else {
      this.getdata(this.state.contracts, dataold, this);
    }
    
  }
  render() {
    let display = this.state.data.map((value, key) => {
      return (<RecipeReviewCard key={key} name={value.name} address={value.address_apartment} ipfsHash={value.ipfsHash} id = {parseInt(value.id)}/>)
      
    });

    return (
      <main role="main" >
        <div className="containerr">
          <div className ="bbg">
            <h1 className = "titlename">FIND YOUR APARTMENT</h1>
            <input className="search" name="search" onChange={e => this.handleChange(e)}></input>
             <h6 className="addaprt">Or Add your apartment</h6>
            <p className ="button-center">
             <Link to="/add-apartment" >
              <Button variant="outlined" color="primary" className="buttonadd">
                Add a apartment &raquo;
                </Button>
              </Link>
            </p>
        </div>
        </div>
        <div className = "list-data">
          <div className = "title-data">
            <h2 className="titlename-data">Featured </h2>
            <h6 className="addaprt-data">Discover thousands of homes for sale of rent in 10+ place</h6>
          </div>
          <div className= "container">
            {display}
        </div>
        </div>
      </main>
    );
  }
}

export default App
