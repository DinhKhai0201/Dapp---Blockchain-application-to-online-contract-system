import React, {Component} from 'react'
import { getContract } from './utils/contractservice'
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
    let detail ;
    if (data && data[0]) {
          detail = <p>{data[0].returnValues.name} </p> 

    }
    return (
    	 <div className="">
          <div className="clearfix"><br /><br /><br /></div>
          <div className ="">
             {detail}
          </div>
      </div>
    );
  }
}

export default Detail
