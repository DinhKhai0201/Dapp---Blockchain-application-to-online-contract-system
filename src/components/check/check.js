import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { getContract } from "../utils/contractservice";
import "../../static/css/check.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class Check extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: `Tôi chấp nhập điều khooản và kí để tạo hợp đồng \n I accept the terms and conditions to sign this contract`,
      contracts: "",
      web3: "",
      account: "",
      data: [],
      signature:''
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
    };
    getContract(data);
  }
  handleChangeSign = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  check = async () => {
    await this.setState({
      data:''
    })
    let { signature, web3, msg, contracts,account ,data} = this.state;
    if (web3.utils.isHex(signature) == false) {
        toast.error("Invalid input !\nInput must be a hex.", {
          position: toast.POSITION.TOP_LEFT
        });
        return false
    }
    let that = this;
    let msgsha = web3.utils.sha3(msg)
    let dataUser =[]
    await contracts.methods.verify(msgsha, signature).call({ from: `${account}` })
    .then(async (result)=> {
      console.log(result)
      await contracts.events
        .AddUser(
          {
            filter: { myaddress: `${result}` },
            fromBlock: 0,
            toBlock: "latest"
          },
          async (error, event)=> {
            if(event && event.returnValues) {
              await dataUser.push(event.returnValues);
            }
            // if(data.length == 0) {
            //     toast.warn("Invalid data !\nData not found!", {
            //           position: toast.POSITION.TOP_LEFT
            //         });
            // } else if (data.length > 0) {
            //     toast.success("Success", {
            //           position: toast.POSITION.TOP_LEFT
            //       });
            //   }
          }
        )
        .on("data", function (event) {
          
          if (dataUser && dataUser.length >0) {
            console.log(dataUser.length)
               let one_user = Object.values(
                 dataUser.reduce(
                   (acc, cur) =>
                     Object.assign(acc, {
                       [cur.myaddress]: cur
                     }),
                   {}
                 )
               );
              
               that.setState({
                 data: one_user,
                 signature: ""
               });
          } 
        
        })
        .on("changed", function (event) {
        })
        .on("error", function (error) {
          toast.error("No data !", {
            position: toast.POSITION.TOP_LEFT
          });
        });
         console.log("97",dataUser.length)
    }).catch((error) =>{
        toast.error("Invalid input !", {
          position: toast.POSITION.TOP_LEFT
        });
    });
    


  };
  render() {
    let { data, signature } = this.state;
    let fetch = "";
    if (data && data[0]) {
      fetch = (
        <div className="fetchsign row">
          <div>
            {" "}
            <p>Account: {data[0].myaddress}</p>{" "}
          </div>
          <p>Name: {data[0].firstname}</p>
          <p>Phone: {data[0].phone}</p>
          <p>Gmail: {data[0].gmail}</p>
          <p>address: {data[0].address_live}</p>
          <p>Id card: {data[0].identify}</p>
        </div>
      );
    }
    console.log(data.length)
    return (
      <div
        className="container"
        style={{ marginTop: "100px", marginBottom: "100px" }}
      >
        <ToastContainer />
        <div className="content row">
          <h5
            className="titlename-data fadeInLeft animated"
            style={{
              display: "table",
              margin: "0 auto",
              paddingTop: "10px",
              paddingBottom: "40px"
            }}
          >
            Check signature
          </h5>
          <div className="col-md-9 fadeInLeft animated">
            <div className="form-element form-input ">
              <input
                name="signature"
                id="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
                className="form-element-field "
                placeholder="Please fill address signature "
                type="input"
                required
                value ={signature}
                onChange={e => this.handleChangeSign(e)}
              />
              <div className="form-element-bar" />
              <label
                className="form-element-label"
                htmlFor="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
              >
                Signature
              </label>
            </div>
          </div>
          <div className="col-md-3 fadeInRight animated ">
            <Button
              variant="outlined"
              className="check-sign "
              onClick={this.check}
            >
              Check
            </Button>
          </div>
        </div>
        <div className="datasign row">{data ? fetch : ""}</div>
      </div>
    );
  }
}

export default Check
