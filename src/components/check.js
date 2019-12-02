import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { getContract } from "./utils/contractservice";
import "../static/css/check.css";
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
      data: "",
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
    let { signature, web3, msg, contracts } = this.state;
    let that = this;
    await web3.eth.personal.ecRecover(msg, `${signature}`).then(add => {
      contracts.events
        .AddUser(
          {
            filter: { myaddress: `${add}` },
            fromBlock: 0,
            toBlock: "latest"
          },
          function(error, event) {
          }
        )
        .on("data", function(event) {
          if (event) {
            toast.success("Success !", {
              position: toast.POSITION.TOP_LEFT
            });
            that.setState({
              data: event.returnValues,
              signature:''
            });
            
          } 
        })
        .on("changed", function(event) {
        })
        .on("error", function(error){
            toast.error("No data !", {
              position: toast.POSITION.TOP_LEFT
            });
        });
    });
  };
  render() {
    let { data, signature } = this.state;
    let fetch = "";
    if (data && data !== "") {
      fetch = (
        <div className="fetchsign row">
          <div>
            {" "}
            <p>Account: {data.myaddress}</p>{" "}
          </div>
          <p>Name: {data.firstname}</p>
          <p>Phone: {data.phone}</p>
          <p>Gmail: {data.gmail}</p>
          <p>address: {data.address_live}</p>
          <p>Id card: {data.identify}</p>
        </div>
      );
    }
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
