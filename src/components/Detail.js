import React, {Component} from 'react'
import { getContract } from './utils/contractservice'
import '../static/css/detail.css'
import Chip from '@material-ui/core/Chip';
import CallIcon from '@material-ui/icons/Call';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BarChartIcon from '@material-ui/icons/BarChart';
import HomeIcon from '@material-ui/icons/Home';
import HotelIcon from '@material-ui/icons/Hotel';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import BathtubIcon from '@material-ui/icons/Bathtub';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: '',
      web3: '',
      account: '',
      id : null,
      data: null
    };
  }

  componentDidMount() {
  	this.setState({
        id: parseInt(this.props.match.params.id)
      })
  	const data = async (contracts, web3) => {
      this.setState({
        contracts, web3
      })
      let that = this;
      await web3.eth.getCoinbase(function (err, result) {
        that.setState({ account: result })
      })
      await contracts.getPastEvents('AddApartment', {
		    filter: {id: parseInt(that.state.id) },
		    fromBlock: 0,
		    toBlock: 'latest'
		}, function(error, events){ 
			 events = Object.values(events.reduce((acc, cur) => Object.assign(acc, {
      			[cur.returnValues.id]: cur
      			}), {}));

			 that.setState({
	            data: events
	          })
		})
		.then(function(events){
        console.log(that.state.data[0].returnValues.id);
		});
    }
    getContract(data);
  };

  render() { 	
    let {data} = this.state
    let picture ;
    let name;
    let price;
    let description;
    let address;
    let type_a;
    let forr;
    let yearbuild;
    let status;
    let bed;
    let room;
    let bath;
    if (data && data[0]) { 
      console.log(data[0]);
          picture = <img src = {data[0].returnValues.ipfsHash} />
          address = <h4 className ="chip-detail address-apartment"> {data[0].returnValues.address_apartment} </h4>
          name =<h1 className ="name-info"> {data[0].returnValues.name} </h1>;
          if (data[0].returnValues._ApartmentType == 0) {
              type_a = <h4 className ="chip-detail type-apartment"> House</h4>
          } else if (data[0].returnValues._ApartmentType == 1) {
              type_a = <h4 className ="chip-detail type-apartment"> Apartment</h4>
          } else {
              type_a = <h4 className ="chip-detail type-apartment"> Room</h4>
          }
          description =<p className ="des-ap">{((data[0].returnValues.description).split("_"))[3] }</p> 
          bed =<p className ="des-bed">{((data[0].returnValues.description).split("_"))[0] }</p> 
          room =<p className ="des-room">{((data[0].returnValues.description).split("_"))[1] }</p> 
          bath =<p className ="des-bath">{((data[0].returnValues.description).split("_"))[2] }</p> 

          if (data[0].returnValues.statusRentOrSale == 0) {
              forr = <span className ="chip-detail-for"> Rent</span>
          } else {
              forr = <span className ="chip-detail-for"> Sale</span>
          }
          yearbuild = <p className ="des-year"><HomeIcon />Yearbuild: {data[0].returnValues.yearbuild }</p> 
          if (data[0].returnValues._ApartmentStatus == 0) {
              status = <p className ="chip-detail-status"><BarChartIcon />Status:  Open</p>
          } else if (data[0].returnValues._ApartmentStatus == 1) {
              status = <p className ="chip-detail-status"><BarChartIcon />Status:  Pending</p>
          }else if (data[0].returnValues._ApartmentStatus == 2) {
              status = <p className ="chip-detail-status"><BarChartIcon />Status:  Processed</p>
          }else {
              status = <p className ="chip-detail-status"><BarChartIcon />Status: Closed</p>
          }
           price = <p className ="des-year"><AttachMoneyIcon />Price: {data[0].returnValues.fee } VND</p> 

    }
    return (
    	 <div className="top-detail">
          <div className ="background-detail clearfix" >
             {picture}
             <div className ="row container address_a">
             {type_a}
             {address}
             </div>
              <div className ='row container res'>
                <div className ="col-md-9">
                {name}
                <div className ="detail-info">
                  <div className ="bed">
                  <HotelIcon />
                  {bed}
                  Bed
                  </div>
                  <div className ="room">
                  <MeetingRoomIcon />
                  {room}
                  Room
                  </div>
                  <div className ="bath">
                  <BathtubIcon />
                  {bath}
                  Bath
                  </div>
                </div>
                </div>
              </div>
              <div className =' description container'> 
                 <div className =" description-c" >
                    <p className ="font-xl"> Apartment description</p>
                </div>
                {description}
                <ReceiptIcon />For:  
                 <Chip
                  label={forr}
                  clickable
                  color="primary"
                  variant="outlined"
                />
                <br />
                {yearbuild}
                {status}
                {price}
              </div>
              <hr className ="container" />
              <div className =' contact container'> 
                 <div className =" contact-c col-md-3" >
                    <p className ="info"> Contact Information</p>
                </div>
                <div className =" name-c col-md-9" >
                    <p className =""><CallIcon /> Khai : 0332015868</p>
                    <p className =""><AccountBalanceWalletIcon /> Metamask : {this.state.account} </p>
                </div>

              </div>
          </div>
      </div>
    );
  }
}

export default Detail