import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../static/css/home.css'
import "../static/css/text.css";
import RecipeReviewCard from './card'
import { getContract } from './utils/contractservice';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
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
      GAS_PRICE: 2000000000,
      open:false,
      bed: null,
      room: null,
      type:null,
      datafilter:[],
      sort:'all',
      valueprice:[1,1000000000],
      type_search:''
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
            data: dataA,
            datafilter: dataA
          })
        })
        .on('changed', function(event){
            // remove event from local database
        })
        .on('error', console.error);
    }
    getContract(data);
     window.ethereum.on("accountsChanged", function(accounts) {
       window.location.reload();
     });
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
          data: dataA,
          datafilter: dataA
        })
      })
      .on('changed', function (event) {
        // remove event from local database
      })
      .on('error', console.error);
  }
  handletoggle =()=>{
     this.setState({
      open:!this.state.open
    })
  }
  handleChanges = (e) => {
    let { type_search} = this.state
    this.setState({
      [e.target.name]: e.target.value
    })
    let dataold = [];
    let datanew =[]
    if (e.target.value !== '') {
      if (type_search === 'name') {
        datanew = this.state.data.filter(dataz => dataz.name.toLowerCase().includes(`${this.state.search}`))
        console.log(datanew)
      } else if (type_search === 'address') {
        datanew = this.state.data.filter(dataz =>dataz.address_apartment.toLowerCase().includes(`${this.state.search}`))
      } else {
        datanew = this.state.data.filter(dataz => dataz.name.toLowerCase().includes(`${this.state.search}`) || dataz.address_apartment.toLowerCase().includes(`${this.state.search}`))
      }
     
      this.setState({
        datafilter: datanew
      })
    } else {
      this.getdata(this.state.contracts, dataold, this);
    }

  }
  setFiltertype =(_number) => {
    this.setState({
      type: _number
    })
   
  }
  setFilterbed =(_number) => {
    this.setState({
      bed: _number
    })
   
  }
  setFilterroom =(_number) => {
    this.setState({
      room: _number
    })
   
  }
  filterpage =() => {
    let {bed,room,type} =this.state
    if (bed == null && room == null && type ==null) {
      let datanew = this.state.data.filter(dataz =>  dataz.fee > this.state.valueprice[0] && dataz.fee < this.state.valueprice[1] )
       this.setState({
          datafilter: datanew
        })
        console.log("null");
    } else if (bed == null && room == null) {
        let datanew = this.state.data.filter(dataz => dataz._ApartmentType== this.state.type && dataz.fee > this.state.valueprice[0] && dataz.fee < this.state.valueprice[1] )
       this.setState({
          datafilter: datanew
        })
    } else if (bed == null && type == null) {
        let datanew = this.state.data.filter(dataz => ((dataz.description).split('_'))[1] == this.state.room  && (dataz.fee > this.state.valueprice[0] && dataz.fee < this.state.valueprice[1]))
       this.setState({
          datafilter: datanew
        })
    } else if (room == null && type == null) { 
        let datanew = this.state.data.filter(dataz => ((dataz.description).split('_'))[0] == this.state.bed  && (dataz.fee > this.state.valueprice[0] && dataz.fee < this.state.valueprice[1]))
         this.setState({
            datafilter: datanew
          })
    } else if (room == null) { 
        let datanew = this.state.data.filter(dataz => ((dataz.description).split('_'))[0] == this.state.bed  && dataz._ApartmentType== this.state.type && (dataz.fee > this.state.valueprice[0] && dataz.fee < this.state.valueprice[1]))
       this.setState({
          datafilter: datanew
        })
    } else if (bed == null) { 
        let datanew = this.state.data.filter(dataz => ((dataz.description).split('_'))[1] == this.state.room && dataz._ApartmentType== this.state.type && (dataz.fee > this.state.valueprice[0] && dataz.fee < this.state.valueprice[1]))
       this.setState({
          datafilter: datanew
        })
    } else if (type == null) { 
        let datanew = this.state.data.filter(dataz => ((dataz.description).split('_'))[0] == this.state.bed  && ((dataz.description).split('_'))[1] == this.state.room  && (dataz.fee > this.state.valueprice[0] && dataz.fee < this.state.valueprice[1]))
       this.setState({
          datafilter: datanew
        })
    } else {
        let datanew = this.state.data.filter(dataz => ((dataz.description).split('_'))[0] == this.state.bed  && ((dataz.description).split('_'))[1] == this.state.room && dataz._ApartmentType== this.state.type && (dataz.fee > this.state.valueprice[0] && dataz.fee < this.state.valueprice[1]))
       this.setState({
          datafilter: datanew
        })
    }
    window.scroll({top: 1000, left: 0, behavior: 'smooth' });
    
  }
  clear =() => {
      this.setState({
        datafilter: this.state.data,
        bed: null,
        type: null,
        room: null,
        search: '',
        valueprice: [1,1000000000]
      })
      window.scroll({top: 1000, left: 0, behavior: 'smooth' });
  }
  handleChange=(event, valueprice)=> {
    // console.log(event); // 'Id' and 'name' attributes in 'target' are empty
      this.setState({ valueprice });
  }
  change =(event)=>{
         this.setState({sort: event.target.value});
         if (event.target.value == 'all') {
              this.setState({
                datafilter: this.state.data,
                open:false
              })
         }
         else if (event.target.value == 'new') {
              const getValue = ({ id }) => + id || 0;
              let dataz = [...this.state.data]
              let _new = dataz.sort((a, b) => getValue(a) - getValue(b));
              this.setState({
                datafilter: _new,
                open:false
              })
         } else if (event.target.value == 'old') {
              const getValue = ({ id }) => + id || 0;
              let dataz = [...this.state.data]
              let _new = dataz.sort((a, b) => getValue(a) - getValue(b));
              this.setState({
                datafilter: _new.reverse(),
                open:false
              })
         } else if (event.target.value == 'high') {
              const getValue = ({ fee }) => + fee || 0;
              let dataz = [...this.state.data]
              let _new = dataz.sort((a, b) => getValue(a) - getValue(b));
              this.setState({
                datafilter: _new,
                open:false
              })
         } else {
              const getValue = ({ fee }) => + fee || 0;
              let dataz = [...this.state.data]
              let _new = dataz.sort((a, b) => getValue(a) - getValue(b));
              this.setState({
                datafilter: _new.reverse(),
                open:false
              })
         }
         window.scroll({top: 1000, left: 0, behavior: 'smooth' });
     }
    setFilter =(value) => {
      this.setState({
        type_search: value
      })
      console.log(value)
    }
   
  render() {
    let display = this.state.datafilter.map((value, key) => {
      return (<RecipeReviewCard key={key} des={value.description} name={value.name} price={value.fee} address={value.address_apartment} ipfsHash={value.ipfsHash.split("_")[0]} id = {parseInt(value.id)}/>)
      
    });
    return (
      <main role="main" style={{ marginBottom: '100px' }}>
        <div className="containerr">
          <div className="bbg animated fadeIn animated">
            <h1 className="titlename">FIND YOUR APARTMENT</h1>
            <div className="choose-type">
              <div className="search-tt " id={((this.state.type_search === 'name') ? 'active-search' : '')} onClick={() => this.setFilter('name')}  >
                <span>Name</span>
              </div>
              <div className="search-tt" id={((this.state.type_search === 'address') ? 'active-search' : '')} onClick={() => this.setFilter('address')}>
                <span>Address</span>
              </div>
            </div>
            <input
              className="search rm-outline"
              name="search"
              onChange={e => this.handleChanges(e)}
            ></input>
            <h6 className="addaprt">Or Add your apartment</h6>
            <p className="button-center">
              <Link to="/add-apartment" style={{ textDecoration: 'none' }} className="rm-outline">
                <Button
                  variant="outlined"
                  color="primary"
                  className="buttonadd "
                >
                  Add a apartment &raquo;
                </Button>
              </Link>
            </p>
          </div>
        </div>
        <div className="list-data">
          <div className="title-data">
            <h2 className="titlename-data fadeInUp animated">Featured </h2>
            <h6 className="addaprt-data typewriter fadeInLeft animated">
              Discover thousands of homes for sale of rent in 10+ place
            </h6>
          </div>
          <div className="container" style ={{display:'table'}}>
            <div className="filter-pr row">
              <div className="col-md-8">
                <div className="filter">
                  <Button
                    variant="outlined "
                    color="primary"
                    onClick={this.handletoggle}
                  >
                    Filter
                  </Button>{" "}
                  <span className="length-data filter-find">
                    {this.state.datafilter.length} Apartment for rent
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="sort">
                  <span className="sort-option">Sort by:</span>
                  <div className="form-group">
                    <div className="row">
                      <select
                        className="form-control select-choice"
                        onChange={this.change}
                      >
                        <option value="all">All</option>
                        <option value="new">Newest</option>
                        <option value="old">Oldest</option>
                        <option value="high">Price: Low to High</option>
                        <option value="low">Price: High to Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.open ? (
                <div className=" filter-c container">
                  <div className="row result-filter">
                    <span className="filter-find">
                      {this.state.valueprice != null
                        ? this.state.valueprice[0] +
                          " VND -" +
                          this.state.valueprice[1] +
                          " VDN"
                        : ""}{" "}
                    </span>
                    <span className="filter-find">
                      {this.state.bed != null ? this.state.bed + " bed" : ""}{" "}
                    </span>
                    <span className="filter-find">
                      {this.state.room != null ? this.state.room + " room" : ""}
                    </span>
                    <span className="filter-find">
                      {" "}
                      {this.state.type != null
                        ? this.state.type == 0
                          ? "House"
                          : this.state.type == 1
                          ? "Apartment"
                          : "Room"
                        : ""}
                    </span>
                  </div>
                  <div className="row">
                    <div className=" filter-c-c col-md-2">
                      <p className="info-f"> Price</p>
                    </div>
                    <div className=" name-c col-md-10">
                      <Slider
                        value={this.state.valueprice}
                        onChange={this.handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        max={100000000}
                        valueLabelDisplay="off"
                        step={100000}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className=" filter-c-c col-md-2">
                      <p className="info-f"> Bedroom</p>
                    </div>
                    <div className=" name-c col-md-10">
                      <ul>
                        <li
                          className="filter-type"
                          onClick={() => this.setFilterbed(1)}
                        >
                          1 bed
                        </li>
                        <li
                          className="filter-type"
                          onClick={() => this.setFilterbed(2)}
                        >
                          2 bed
                        </li>
                        <li
                          className="filter-type"
                          onClick={() => this.setFilterbed(3)}
                        >
                          3 bed
                        </li>
                        <li
                          className="filter-type"
                          onClick={() => this.setFilterbed(4)}
                        >
                          4+ bed
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className=" filter-c-c col-md-2">
                      <p className="info-f"> Room</p>
                    </div>
                    <div className=" name-c col-md-10">
                      <ul>
                        <li
                          className="filter-type"
                          onClick={() => this.setFilterroom(1)}
                        >
                          1 room
                        </li>
                        <li
                          className="filter-type"
                          onClick={() => this.setFilterroom(2)}
                        >
                          2 room
                        </li>
                        <li
                          className="filter-type"
                          onClick={() => this.setFilterroom(3)}
                        >
                          3 room
                        </li>
                        <li
                          className="filter-type"
                          onClick={() => this.setFilterroom(4)}
                        >
                          4+ room
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className=" filter-c-c col-md-2">
                      <p className="info-f"> Type</p>
                    </div>
                    <div className=" name-c col-md-10">
                      <ul>
                        <li
                          className="filter-type"
                          onClick={() => this.setFiltertype(0)}
                        >
                          House
                        </li>
                        <li
                          className="filter-type"
                          onClick={() => this.setFiltertype(1)}
                        >
                          Apartment
                        </li>
                        <li
                          className="filter-type"
                          onClick={() => this.setFiltertype(2)}
                        >
                          Room
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row bt-filter">
                    <Button
                      variant="outlined"
                      className=""
                      onClick={this.filterpage}
                    >
                      Filter
                    </Button>
                    <Button
                      variant="outlined"
                      className=""
                      onClick={this.clear}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>

            {display}
          </div>
        </div>
      </main>
    );
  }
}

export default App
