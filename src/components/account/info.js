import React, { Component } from "react";
import ipfs from "../utils/ipfs";
import { getContract } from "../utils/contractservice";
import "../../static/css/check.css";
import "react-toastify/dist/ReactToastify.css";
class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: "",
      web3: "",
      account: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      gender: 0,
      address: "",
      ipfshash: "",
      identify: "",
      error: false,
      GAS: 700000,
      GAS_PRICE: 2000000000
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
      let dataUser = [];

      await contracts.events
        .AddUser(
          {
            filter: { myaddress: `${this.state.account}` },
            fromBlock: 0,
            toBlock: "latest"
          },
          function(error, event) {
            if (event) {
              dataUser.push(event.returnValues);
            }
            console.log("userss", dataUser);
          }
        )
        .on("data", function(event) {
          if (dataUser && dataUser.length > 0) {
            let one_user = Object.values(
              dataUser.reduce(
                (acc, cur) =>
                  Object.assign(acc, {
                    [cur.myaddress]: cur
                  }),
                {}
              )
            );
            console.log("user", one_user);
            that.setState({
              firstname: one_user[0].firstname.split(" ")[0],
              lastname: one_user[0].firstname.split(" ")[1],
              email: one_user[0].gmail,
              phone: one_user[0].phone,
              gender: one_user[0].gender,
              address: one_user[0].address_live,
              ipfshash: one_user[0].ipfsHash,
              identify: one_user[0].identify
            });
          } else {
            alert("No data");
          }
        });
    };
    getContract(data);
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  captureFile = event => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file);
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };
  convertToBuffer = async reader => {
    const buffer = await Buffer.from(reader.result);
    await ipfs.add(buffer, (err, ipfsHash) => {
      console.log(ipfsHash);
      this.setState({
        ipfshash: "https://gateway.ipfs.io/ipfs/" + ipfsHash[0].hash
      });
    });
  };
  editUser =e=> {
      e.preventDefault();
       let {
         firstname,
         lastname,
         account,
         email,
         phone,
         address,
         gender,
         identify,
         ipfshash,
         contracts,
         GAS,
         GAS_PRICE
       } = this.state;
       contracts.methods
         .updateUser(
           account,
           identify,
           firstname + " " + lastname,
           email,
           gender,
           phone,
           address,
           ipfshash
         )
         .send(
           { from: `${account}`, gas: GAS, gasPrice: `${GAS_PRICE}` },
           function(err, result) {
             console.log(result);
           }
         )
         .once("receipt", receipt => {
          
         });  
  }
  render() {
    let {
      firstname,
      lastname,
      phone,
      email,
      gender,
      address,
      ipfshash,
      identify,
      account
    } = this.state;
    console.log(this.state);
    return (
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-5">
          <fieldset className="form-fieldset">
           <div className="form-element form-input">
              <input
                name="accounttt"
                id="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
                className="form-element-field"
                placeholder=" "
                type="text"
                required
                value={account}
              />
              <div className="form-element-bar" />
              <label
                className="form-element-label"
                htmlFor="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
              >
                Account address
              </label>
            </div>
            <div className="form-element form-input">
              <input
                name="firstname"
                id="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
                className="form-element-field"
                placeholder="Please fill in your full name"
                type="input"
                required
                value={firstname}
                onChange={e => this.handleChange(e)}
              />
              <div className="form-element-bar" />
              <label
                className="form-element-label"
                htmlFor="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
              >
                First Name
              </label>
            </div>
            <div className="form-element form-input">
              <input
                name="lastname"
                id="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
                className="form-element-field"
                placeholder="Please fill in your full name"
                type="input"
                required
                value={lastname}
                onChange={e => this.handleChange(e)}
              />
              <div className="form-element-bar" />
              <label
                className="form-element-label"
                htmlFor="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
              >
                Last Name
              </label>
            </div>

            <div className="form-element form-input">
              <input
                name="email"
                id="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
                className="form-element-field"
                placeholder=" "
                type="text"
                required
                onChange={e => this.handleChange(e)}
                value={email}
              />
              <div className="form-element-bar" />
              <label
                className="form-element-label"
                htmlFor="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
              >
                Gmail
              </label>
            </div>
            <div className="form-element form-input">
              <input
                name="address"
                id="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
                className="form-element-field"
                placeholder=" "
                type="text"
                required
                value={address}
                onChange={e => this.handleChange(e)}
              />
              <div className="form-element-bar" />
              <label
                className="form-element-label"
                htmlFor="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
              >
                Address
              </label>
            </div>
            <div className="form-element form-input">
              <input
                name="phone"
                id="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
                className="form-element-field"
                placeholder=" "
                type="text"
                required
                value={phone}
                onChange={e => this.handleChange(e)}
              />
              <div className="form-element-bar" />
              <label
                className="form-element-label"
                htmlFor="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
              >
                phone
              </label>
            </div>
            <div className="form-element form-input">
              <input
                name="identify"
                id="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
                className="form-element-field"
                placeholder=" "
                type="text"
                required
                value={identify}
                onChange={e => this.handleChange(e)}
              />
              <div className="form-element-bar" />
              <label
                className="form-element-label"
                htmlFor="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
              >
                identify
              </label>
            </div>
          </fieldset>
          <div className="form-actions">
            <button
              className="form-btn"
              type="submit"
              onClick={e => this.editUser(e)}
            >
              Edit{" "}
            </button>
            <button className="form-btn-cancel " type="reset">
              Cancel
            </button>
          </div>
        </div>
        <div className="col-md-3">
          <fieldset className="form-fieldset">
            <div className="pro-avata-m">
              <img className="pro-avata" src={ipfshash} />
            </div>
            <div className="pro-change-avata">
              <label
                className="link-ghost ng-star-inserted"
                id="changePhotoLink"
                for="file"
              >
                Change Photo
              </label>
              <input
                accept="image/*"
                className="upload-file-input"
                id="file"
                type="file"
                hidden
                onChange={this.captureFile}
              ></input>
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default Info;
