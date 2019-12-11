import React, { Component } from 'react'
import '../../static/css/inputadd.css'
import '../../static/css/upload.css'
import ipfs from '../utils/ipfs'
import { getContract } from '../utils/contractservice'
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import Loading from '../loading';
class up extends Component {
    constructor(props) {
        super(props);
        this.state = {
          url: "url",
          web3: "",
          contracts: null,
          account: "",
          title: "",
          time: new Date().toLocaleString(),
          GAS: 700000,
          GAS_PRICE: 2000000000,
          data: [],
          loading:''
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
        this.setState({
          loading: false
        })
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        console.log(file)
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
        

    };
    convertToBuffer = async (reader) => {
      let check = await this.state.contracts.methods.register(this.state.account).call({ from: `${this.state.account}` });
      console.log(check)
       let _url;
        const buffer =  Buffer.from(reader.result);
        await ipfs.add(buffer, (err, ipfsHash) => {
            console.log(ipfsHash)
            if (ipfsHash && ipfsHash[0]) {
                _url = 'https://gateway.ipfs.io/ipfs/' + ipfsHash[0].hash ;
                this.setState({
                  url: _url ,
                  loading: true
                });
            }
        })
    };
    handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
      console.log(this.state);
    };
  uploadfile =e=> {
    let {
      contracts,
      title,
      time,
      url,
      account,
      GAS,
      GAS_PRICE
    } = this.state;
    if (url == ''){
        console.log("url null")
    }
    contracts.methods
      .Uploadfile(title, url, time)
      .send(
        { from: `${account}`, gas: GAS, gasPrice: `${GAS_PRICE}` },
        function (err, result) {
          console.log(result);
        }
      )
      .once("receipt", receipt => {
        alert("You just create");
      }); 
  }

    render() {
      console.log(this.state)
      let { data, loading} = this.state
      let renderupload ;
      if (data && data.length > 0) {
        renderupload =  data.map((value,k)=>{
          return(
            <tr key={k}>
              <td data-label="Account">{value.id}</td>
              <td data-label="Due Date">{value.title}</td>
              <td data-label="Amount"><a href={value.url} target ="_blank">Click</a></td>
              <td data-label="Period">{value.time_upload}</td>
            </tr>
          )
        })
      }
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
            <div className="row">
              <div className="col-md-2">
                <label for="multi" className="">
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
               <div className="col-md-3">
                <div className="form-element form-input" style ={{paddingTop:"40px"}}>
                  <input
                    name="title"
                    id="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
                    className="form-element-field"
                    placeholder=" "
                    type="text"
                    required
                    value={this.state.title}
                    onChange={e => this.handleChange(e)}
                  />
                  <div className="form-element-bar" />
                  <label
                    className="form-element-label"
                    htmlFor="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
                  >
                    Title{" "}
                  </label>
                  <small className="form-element-hint">
                    Ex: Đơn xin đi học
              </small>
                </div>
               </div>
               <div className ="col-md-2">
                <span style={{ marginTop: "65px",display:'table' }}> 
                {loading?(<Button
                  variant="outlined"
                  className="bt-cancel-apartment"
                  onClick={e => this.uploadfile(e)}
                 
                >
                  Upload
                </Button>):(<Loading />)}
                </span>
               
               </div>
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
            <div className ="row">
            <div className ="col-md-12" style={{padding:'20px'}}>
                <p style ={{fontSize:'24px',textAlign:'center'}}>File uploaded</p>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Title</th>
                      <th scope="col">Link</th>
                      <th scope="col">Time upload</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderupload}
                  </tbody>
                </table>
            </div>
            </div>
          </div>
        );
    }
}

export default up
