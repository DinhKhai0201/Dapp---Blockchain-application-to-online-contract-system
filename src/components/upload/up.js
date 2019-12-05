import React, { Component } from 'react'
import '../../static/css/inputadd.css'
import ipfs from '../utils/ipfs'
import { getContract } from '../utils/contractservice'
import AddIcon from '@material-ui/icons/Add';
class up extends Component {
    constructor(props) {
        super(props);
        this.state = {
          url: "url",
          web3: "",
          contracts: null,
          account: "",
          title: "title",
          time: new Date().toLocaleString(),
          GAS: 700000,
          GAS_PRICE: 2000000000,
          data: []
        };
    }

    componentDidMount() {
        const data = async (contracts, web3) => {
            this.setState({
                contracts,
                web3
            });
            let that = this;
            await web3.eth.getCoinbase(function (err, result) {
                that.setState({ account: result });
            });
            web3.eth.net.getId().then(netId => {
                netId = parseInt(netId);
                switch (netId) {
                    case 1: // main network
                        that.setState({
                            network:
                                "You're on the Ethereum main network. Please switch to Ropsten."
                        });
                        break;
                    case 2: // morden
                        that.setState({
                            network:
                                "You're on the Morden test network. Please switch to Ropsten."
                        });
                        break;
                    case 3: // ropsten
                        that.setState({
                            network: "Ethereum Ropsten network"
                        });
                        break;
                    case 4: // rinkeby
                        that.setState({
                            network:
                                "You're on the Rinkeby test network. Please switch to Ropsten."
                        });
                        break;
                    case 42: // kovan
                        that.setState({
                            network:
                                "You're on the Kovan test network. Please switch to Ropsten."
                        });
                        break;
                    default:
                        // unknown network, should be ganache
                        that.setState({
                            network: "This is an unknown network."
                        });
                }
            });
            let dataA = [];
            await contracts.events
              .LogUpload(
                {
                  filter: { myaddress: `${this.state.account}` },
                  fromBlock: 0,
                  toBlock: "latest"
                },
                function(error, event) {
                  if (event) {
                    dataA.push(event.returnValues);
                  }
                }
              )
              .on("data", function(event) {
                if (dataA) {
                  let one_up = Object.values(
                    dataA.reduce(
                      (acc, cur) =>
                        Object.assign(acc, {
                          [cur.id]: cur
                        }),
                      {}
                    )
                  );
                  that.setState({
                    data: [...one_up]
                  });
                } else {
                  alert("No data");
                }
              });
            let dataB = [];
        };
        getContract(data);
        let ref_top = this.refs.ref_top;
        window.scrollTo(0, 0);
    }
   
    captureFile =  (event) => {
       
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        console.log(file)
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
        

    };
    convertToBuffer = async (reader) => {
       let {
         contracts,
         title,
         time,
         account,
         GAS,
         GAS_PRICE
       } = this.state;
       let _url;
        const buffer =  Buffer.from(reader.result);
        await ipfs.add(buffer, (err, ipfsHash) => {
            console.log(ipfsHash)
            _url = 'https://gateway.ipfs.io/ipfs/' + ipfsHash[0].hash ;
            this.setState({ url: _url });
             contracts.methods
               .Uploadfile(title, _url, time)
               .send(
                 { from: `${account}`, gas: GAS, gasPrice: `${GAS_PRICE}` },
                 function(err, result) {
                   console.log(result);
                 }
               )
               .once("receipt", receipt => {
                 alert("You just create");
               }); 
        })
        

    };
   
    render() {
      console.log(this.state)
        return (
          <div className="container imgbg" ref="ref_top">
            <div className="clearfix">
              <br />
              <br />
              <br />
            </div>
            <h5
              className="titlename-data fadeInLeft animated"
              style={{ paddingTop: "10px", paddingBottom: "40px" }}
            >
              Up load
            </h5>
            <div className="add-apartment row">
              <div className="col-md-12">
                <label for="multi" className="label-add-image">
                  <div
                    className="body-add-image"
                    style={{ padding: "20px 50px" }}
                  >
                    <div className="content-add-image">
                      <span className="icon-add-image">
                        <AddIcon className="design-icon" />
                      </span>
                    </div>
                    <div className="add-title-image">Upload </div>
                  </div>
                </label>
              </div>
               <div className="col-md-12 display-document"></div>
              <div className="col-md-4 fadeInUp animated">
                <div className="button">
                  <input
                    type="file"
                    id="multi"
                    name="files[]"
                    onChange={this.captureFile}
                    multiple
                    hidden
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default up
