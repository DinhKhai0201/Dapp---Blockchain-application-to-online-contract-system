import React, { Component  } from "react";
import { getContract } from "./utils/contractservice";
import "../static/css/account.css";
import "../static/css/sign.css";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom'

class Myaccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: "",
      web3: "",
      account: "",
      imageURL: null,
      setImageURL: null,
      dataApartment: [],
      dataTenent: [],
      dataLandlord: [],
      data_tmp: [],
      dataAgreeL: [],
      dataAgreeT: [],
      address_tenant: "",
      landlordsign: "",
      _password: "",
      time_duration: "",
      today: new Date().toLocaleString(),
      to_date: "",
      GAS: 700000,
      GAS_PRICE: 2000000000
    };
    this.sigCanvas = React.createRef();
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
      let dataA = [];
      await contracts.events.AddApartment({
        filter: { _landlord: `${this.state.account}` },
        fromBlock: 0,
        toBlock: 'latest'
      }, function (error, event) {
          if (event) {
            dataA.push(event.returnValues);
            that.setState({
              dataApartment: [...dataA],
            })
        }
      })
        .on('data', function (event) {
          // console.log(event)
        })
        .on('changed', function (event) {
          // remove event from local database
        })
        .on('error', console.error);
      let dataB = [];
      await contracts.events
        .AddUser(
          {
            filter: { myaddress: `${this.state.account}` },
            fromBlock: 0,
            toBlock: "latest"
          },
          function (error, event) {
            if (event) {
              dataB.push(event.returnValues);
              that.setState({
                dataLandlord: event.returnValues
              })
            }
          }
        )
        .on("data", function (event) {
        })
        .on("changed", function (event) {
        })
        .on("error", console.error);
      let dataC = [];

      await contracts.events
        .Agreement(
          {
            filter: { _landlord: `${this.state.account}` },
            fromBlock: 0,
            toBlock: "latest"
          },
          function (error, event) {
            if (event) {
              dataC.push(event.returnValues);
              
              that.setState({
                dataAgreeL: [...dataC]
              })
            }
          }
        )
        .on("data", function (event) {

        })
        .on("changed", function (event) {
          // remove event from local database
        })
        .on("error", console.error);
      let dataD = [];
      await contracts.events
        .Agreement(
          {
            filter: { _rentor: `${this.state.account}` },
            fromBlock: 0,
            toBlock: "latest"
          },
          function (error, event) {
            if (event) {
              dataD.push(event.returnValues);
              that.setState({
                dataAgreeT: [...dataD]
              })
            }
          }
        )
        .on("data", function (event) {

        })
        .on("changed", function (event) {
          // remove event from local database
        })
        .on("error", console.error);
    };
	getContract(data);
	 window.ethereum.on("accountsChanged", function(accounts) {
		window.location.reload();
	});
  }
  clearr = () => {
    this.sigCanvas.current.clear();
  };
  save = () => {
    let dataimage = this.sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL({
        'format': 'jpeg',
        'quality': 0.5
      })
    this.setState({
      setImageURL: dataimage
    });
  };
  createAgree = async (idA) => {
    let data_tmp = this.state.dataApartment.filter(dataz => dataz.id === idA)
    await this.setState({
      data_tmp
    })
    console.log(idA)
  } 
  handleChangeTenant =(e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    // let _to = new Date(this.state.today.setMonth(this.state.today.getMonth() + parseInt(`${this.state.time_duration}`)));
    // console.log(_to)

  }
  searchtenant = async () => {
    let that = this
    await this.state.contracts.events
      .AddUser(
        {
          filter: { myaddress: `${this.state.address_tenant}` },
          fromBlock: 0,
          toBlock: "latest"
        },
        function (error, event) {
          console.log(event)
        }
      )
      .on("data", function (event) {
        if (event) {
          that.setState({
            dataTenent: event.returnValues
          })
        } else {
          alert("No data")
        }
      })
      .on("changed", function (event) {
        // remove event from local database
      })
      .on("error", console.error);
  }
  landlordSign = async () => {
    let msg = `Tôi chấp nhập điều khooản và kí để tạo hợp đồng \n I accept the terms and conditions to sign this contract`;
    await this.state.web3.eth.personal.sign(msg, `${this.state.account}`,"password")
      .then(sign => {
        console.log(sign);
        this.setState({
          landlordsign: sign
        })
      }   
      );
    // this.state.web3.eth.personal.ecRecover(msg, `${this.state.landlordsign}`).then(account => {
    //   console.log(account)
    // })
  }
  createAgreement =() => {
    let {
      contracts,
      data_tmp,
      landlordsign,
      account,
      _password,
      today,
      time_duration,
      address_tenant,
      GAS,
      GAS_PRICE
    } = this.state;
    let des = [today, time_duration]
    let dess = des.join('_');

    if (landlordsign !== '' && data_tmp && data_tmp[0] ) {
      contracts.methods
        .createAgreement(
          data_tmp[0].id,
          dess,
          landlordsign,
          _password,
          address_tenant
        )
        .send(
          { from: `${account}`, gas: GAS, gasPrice: `${GAS_PRICE}` },
          function(err, result) {
            console.log(result);
          }
        )
        .once("receipt", receipt => {
          alert("You just create");
        });  
    }
  }
  render() {
    let { dataLandlord, dataTenent, time_duration, data_tmp, today, dataAgreeL, dataAgreeT} = this.state
    let dataAprt = this.state.dataApartment.map(element => { return (
        <div key={element.id} className="conservation-list-wrap">
        <div className="container">
          <div className="container-item">
            <div className="conservation-item">
              <div className="conversation-info">
                <div className="image-apart">
                  <img src={element.ipfsHash.split("_")[0]} width = '100px' height ='66px'/>
                </div>
                <div className="text-info font-xs">
                  <span className="link-ghost user-name">{element.name}</span>
                  <div className="address text-grey">
                    <span >{element.address_apartment}</span>
                  </div>
                </div>
              </div>
              <div className="last-message-info">
                <div className="message-text font-s webkit-oriented-vertical">
                  <span className="webkit-oriented-vertical">{element.fee.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
                </div>
                {/* <div className="message-date text-grey font-xs">8:10 PM, 11/25/19</div> */}
                </div>
            </div>
            <div className ="agree-create">
              <span><Button
                variant="outlined"
                className="bt-agree"
                onClick={()=>this.createAgree(element.id)}
              >
                <a className="remove-underline" href="#popup1">Create Agreesment</a>
                
                        </Button></span>
              <span><Link className ="remove-underline" to={`/detail/${element.id} `}>
                <Button
                  variant="outlined"
                  className="bt-agree"
                >
                  Detail
                        </Button></Link>
                        </span>
            </div>
            
          </div>
        </div>
      </div>
    )})
    let db = Object.values(dataAgreeL.reduce((acc, cur) => Object.assign(acc, {
      [cur.id]: cur
    }), {}))
    let AgreeL = db.map(element => {
      return (
        // console.log(element)
        <div key={element.id} className="conservation-list-wrap">
          <div className="container">
            <div className="container-item">
              <div className="conservation-item">
                <div className="conversation-info">
                  <div className="text-info font-xs">
                    <span className="link-ghost user-name">
                      Rentor: {element._rentor}
                    </span>
                    <div className="address text-grey">
                      {element.description.split("_")[0].split(",")[0]}
                    </div>
                  </div>
                </div>
                <div className="last-message-info">
                  <div className="message-text font-s webkit-oriented-vertical">
                    <span className="webkit-oriented-vertical">{}</span>
                  </div>
                  {/* <div className="message-date text-grey font-xs">8:10 PM, 11/25/19</div> */}
                </div>
              </div>
              <div className="agree-create">
                <span>
                  <Button variant="outlined" className="bt-agree">
                    {" "}
                    {element.rentorconfirmed === "" ? "Pending" : "Success"}
                  </Button>
                </span>
                <span>
                  <Link
                    className="remove-underline"
                    to={`/contract/${element.id} `}
                  >
                    <Button variant="outlined" className="bt-agree">
                      Detail
                    </Button>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    })
    let da = Object.values(dataAgreeT.reduce((acc, cur) => Object.assign(acc, {
      [cur.id]: cur
    }), {}))
    let AgreeT = da.map(element => {
      return (
        // console.log(element)
        <div key={element.id} className="conservation-list-wrap">
          <div className="container">
            <div className="container-item">
              <div className="conservation-item">
                <div className="conversation-info">
                  <div className="text-info font-xs">
                    <span className="link-ghost user-name">
                      Lanlord: {element._landlord}
                    </span>
                    <div className="address text-grey">
                      {element.description.split("_")[0].split(",")[0]}
                    </div>
                  </div>
                </div>
                <div className="last-message-info">
                  <div className="message-text font-s webkit-oriented-vertical">
                    <span className="webkit-oriented-vertical"></span>
                  </div>
                  {/* <div className="message-date text-grey font-xs">8:10 PM, 11/25/19</div> */}
                </div>
              </div>
              <div className="agree-create">
                <span>
                  <Button variant="outlined" className="bt-agree">
                    {" "}
                    {element.rentorconfirmed == "" ? "Pending" : "Success"}
                  </Button>
                </span>
                <span>
                  <Link
                    className="remove-underline"
                    to={`/contract/${element.id} `}
                  >
                    <Button variant="outlined" className="bt-agree">
                      Detail
                    </Button>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    })
    let _first = '';
    let _last ='';
    if (dataLandlord && dataLandlord.firstname) {
      _first = ((dataLandlord.firstname).split(" "))[0]
      _last =
        dataLandlord.firstname.split(" ")[1] 
      if (dataLandlord.firstname.split(" ")[2]) {
         _last += ' ' + dataLandlord.firstname.split(" ")[2];
	  }
	  if (dataLandlord.firstname.split(" ")[3]) {
		_last += " " + dataLandlord.firstname.split(" ")[3];
		}
       
    }
    return (
      <div style={{ marginBottom: '100px'}}>
        {/* TAB CONTROLLERS */}
        <input
          id="panel-1-ctrl"
          className="panel-radios"
          type="radio"
          name="tab-radios"
          defaultChecked
        />
        <input
          id="panel-2-ctrl"
          className="panel-radios"
          type="radio"
          name="tab-radios"
        />
        <input
          id="panel-3-ctrl"
          className="panel-radios"
          type="radio"
          name="tab-radios"
        />
        <input
          id="panel-4-ctrl"
          className="panel-radios"
          type="radio"
          name="tab-radios"
        />
        <input
          id="panel-5-ctrl"
          className="panel-radios"
          type="radio"
          name="tab-radios"
        />
        <input
          id="nav-ctrl"
          className="panel-radios"
          type="checkbox"
          name="nav-checkbox"
        />
        <header id="introduction">
          <h1>Personal</h1>
        </header>
        <ul id="tabs-list">
          <label id="open-nav-label" htmlFor="nav-ctrl" />
          <li id="li-for-panel-1">
            <label className="panel-label" htmlFor="panel-1-ctrl">
              Account
            </label>
          </li>
         
          <li id="li-for-panel-2">
            <label className="panel-label" htmlFor="panel-2-ctrl">
              Post
            </label>
          </li>
        
          <li id="li-for-panel-3">
            <label className="panel-label" htmlFor="panel-3-ctrl">
              Landlord
            </label>
          </li>
         
          <li id="li-for-panel-5" className="last">
            <label className="panel-label" htmlFor="panel-5-ctrl">
              Rentor
            </label>
          </li>
          <label id="close-nav-label" htmlFor="nav-ctrl">
            Close
          </label>
        </ul>
        <article id="panels">
          <div className="container">
            <section id="panel-1">
              <main>
                <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-5">
                      <fieldset className="form-fieldset">
                        <div className="form-element form-input">
                          <input
                            name="firstname"
                            id="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
                            className="form-element-field"
                            placeholder="Please fill in your full name"
                            type="input"
                            required
                            value={_first}
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
                            value={_last}
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
                            name="yearbuild"
                            id="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
                            className="form-element-field"
                            placeholder=" "
                            type="text"
                            required
                            onChange={e => this.handleChange(e)}
                            value={dataLandlord.gmail}

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
                            value={dataLandlord.address_live}
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
                            value={dataLandlord.phone}
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
                            value={dataLandlord.identify}
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
                        <button
                          className="form-btn-cancel "
                          type="reset"
                        >
                          Cancel
                        </button>
                      </div>
                  </div>
                  <div className="col-md-3">
                    <fieldset className="form-fieldset">
                      <div className="pro-avata-m">
                        <img className="pro-avata" src ={dataLandlord.ipfsHash}/>
                      </div>
                      <div className="pro-change-avata">
                        <label
                          className="link-ghost ng-star-inserted"
                          id="changePhotoLink"
                          for ="file"
                        >
                          Change Photo
                        </label>
                        <input
                          accept="image/*"
                          className="upload-file-input"
                          id="file"
                          type="file"
                          hidden
                        ></input>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </main>
            </section>
            <section id="panel-2">
              <main>
                {dataAprt}
                <div id="popup1" className="overlay">
                  <div className="popup">
                    <h2>Create agreement</h2>
                    <a className="close" href="#">
                      &times;
                    </a>
                    <div className="content row">
                    <div className ="col-md-9">
                        <div className="form-element form-input">
                          <input
                            name="address_tenant"
                            id="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
                            className="form-element-field"
                            placeholder="Please fill address account tenant"
                            type="input"
                            required
                           onChange={e => this.handleChangeTenant(e)}
                          />
                          <div className="form-element-bar" />
                          <label
                            className="form-element-label"
                            htmlFor="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
                          >
                            Tenant address
                        </label>
                        </div>
                        <div className="form-element form-input">
                          <input
                            name="time_duration"
                            id="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
                            className="form-element-field"
                            placeholder="Please fill address account tenant"
                            type="input"
                            required
                            onChange={e => this.handleChangeTenant(e)}
                          />
                          <div className="form-element-bar" />
                          <label
                            className="form-element-label"
                            htmlFor="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
                          >
                            Time duration(month)
                        </label>
                        </div>
                        <div className="form-element form-input">
                          <input
                            name="_password"
                            id="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
                            className="form-element-field"
                            placeholder="Please fill password agreement"
                            type="input"
                            required
                            onChange={e => this.handleChangeTenant(e)}
                          />
                          <div className="form-element-bar" />
                          <label
                            className="form-element-label"
                            htmlFor="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
                          >
                            Password
                        </label>
                        </div>
                    </div>
                      <div className="col-md-3">
                        <Button
                          variant="outlined"
                          className=""
                          onClick={this.searchtenant}
                        >
                          Search
                              </Button>
                      </div>
                    </div>
                    {/* {this.state.data_tmp ? (
                      JSON.stringify(this.state.data_tmp)
                    ) : null} */}
                    <div className="container">
                      <p align="center"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></span></span></p>
                      <p align="center"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><strong>Độc lập – Tự do – Hạnh phúc</strong></span></span></p>
                      <p align="center"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em><strong>SOCIALIST REPUBLIC OF VIETNAM</strong></em></span></span></p>
                      <p align="center"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em><strong>Independence – Freedom – Happiness</strong></em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium',display:'table',margin:'0 auto' }}>--------------------</span></span></p>
                      <p align="center"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'x-large' }}><strong>HỢP ĐỒNG THUÊ NHÀ</strong></span></span></p>
                      <p align="center"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'x-large' }}><em><strong>HOUSE LEASE CONTRACT</strong></em></span></span></p>
                      <p align="center">&nbsp;</p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Hôm nay, ngày {(today.toLocaleString().split(',')[0]).split("/")[1]} tháng {(today.toLocaleString().split(',')[0]).split("/")[0]} năm {(today.toLocaleString().split(',')[0]).split("/")[2]}, chúng tôi gồm có:</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Today is {today.toLocaleString().split(',')[0]}, we consist of: )</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><strong>BÊN A : BÊN CHO THUÊ NHÀ (PARTY A: THE LESSOR)</strong></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Tên (</span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>Name</em></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium',color:'blue' }}>): {dataLandlord.firstname} </span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Địa chỉ (</span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>Address</em></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium', color: 'blue' }}>): {dataLandlord.address_live} </span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Số CMND (</span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>ID card Number</em></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium', color: 'blue' }}>): {dataLandlord.identify}</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Là chủ sở hữu pháp lý của Nhà cho thuê (</span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>As the legal possessor of the House for lease</em></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>)</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><strong>BÊN B: BÊN THUÊ NHÀ (PARTY B: THE LESSEE)</strong></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Tên (</span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>Name</em></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium', color: 'green' }}>): {dataTenent.firstname}</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Địa chỉ </span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Address</em></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium', color: 'green' }}>): {dataTenent.address_live} </span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Số CMND  (</span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>ID card Number</em></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium', color: 'green' }}>): {dataTenent.identify}</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Bên Cho Thuê Nhà và Bên B – thống nhất ký kết hợp đồng thuê Nhà với những điều khoản và điều kiện như sau:<br /> </span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Both Party A and Party B – have mutually agreed to enter into this House lease contract with the following terms and condition:)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><strong>ĐIỀU 1 : MỤC ĐÍCH VÀ DIỆN TÍCH THUÊ</strong></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em><strong>(ARTICLE 1 : PURPOSE AND DURATION OF THE LEASE)</strong></em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Bên Cho Thuê Nhà đồng ý cho Bên B thuê Nhà như sau: </span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Party A has the following space leased by Party B)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>1. Địa điểm (Place): </em></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium',color:'orange' }}> {(data_tmp && data_tmp[0])?data_tmp[0].address_apartment:''}</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>2. Mục đích sử dụng(Purpose of use): Thuê nhà để ở (Hire to stay, residential purpose only).</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>3. Thời hạn thuê (Duration of lease): {time_duration}</span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em> </em></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>tháng (months).</span></span></p>
                      {/* <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Từ ngày (from) {today.toLocaleString().split(',')[0]}</span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>..</em></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>đến ngày (to) {this.state.to_date} </span></span></p> */}
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Bên B sẽ được quyền ưu tiên tiếp tục gia hạn vào cuối hợp đồng với điều kiện Bên A tiếp tục cho thuê (Giá thuê tuỳ thời điểm đó)</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>Party B will be given priority to extend the contract if Party A continues to have his/her house rent (The rental price depends on that time)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><strong>ĐIỀU 2 : GIÁ THUÊ &amp; CÁC CHI PHÍ KHÁC</strong></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em><strong>(ARTICLE 2: RENTAL FEE &amp; EXTRA COSTS)</strong></em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>1. Giá cho thuê: {(data_tmp && data_tmp[0]) ? data_tmp[0].fee : ''} VNĐ/ tháng </span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>(Không bao gồm các chi phí thuế)</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Rental fee: </em></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}> {(data_tmp && data_tmp[0]) ? data_tmp[0].fee : ''} </span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>VNĐ/month </em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Not including the cost of taxes.)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>2. Chi phí tiêu dùng điện, nước, internet và truyền hình cáp Bên B phải trả kịp thời và đầy đủ hàng tháng theo khối lượng thực tế sử dụng dựa vào hoá đơn.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>The charge for using electricity, water, internet and cable TV shall be paid by the Party B in time and sufficiently according to the actual consumption based on the bills. </em></span></span></p>
                      <p align="left">&nbsp;</p>
                      <p align="left">&nbsp;</p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><strong>ĐIỀU 3 : THANH TOÁN </strong></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em><strong>(ARTICLE 3 : PAYMENT)</strong></em></span></span></p>
                      <ol>
                        <li>
                          <p align="left"><span style={{ color: '#000000' }}><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Thời hạn thanh toán </span></span></span><span style={{ color: '#000000' }}><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Payment time)</em></span></span></span></p>
                        </li>
                      </ol>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>a) Tiền đặt cọc : Bên B sẽ đặt cọc cho Bên Cho Thuê Nhà số tiền là {(data_tmp && data_tmp[0]) ? data_tmp[0].fee : ''}  VNĐ </span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>ngay khi ký hợp đồng thuê Nhà này.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Security deposit: The Party B will pay </em></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}> {(data_tmp && data_tmp[0]) ? data_tmp[0].fee : ''} </span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>VNĐ </em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>as soon as signing this lease contract)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Khoản tiền đặt cọc này sau khi đã trừ đi các khoản chi phí hư hại của trang thiết bị trong Nhà hoặc không bị hư hỏng sẽ được hoàn lại cho Bên B trong ngày kết thúc hợp đồng cùng với điều kiện Bên B phải hoàn tất mọi trách nhiệm nêu trong hợp đồng này.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Such amount of security deposit after deducting costs of impaired for indoor facility or not impaired will be refunded to Party B in days the proper termination of this present contract as long as Party B has fulfilled the liabilities stated hereby).</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>b) Tiền thuê Nhà : </span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Đợt thanh toán đầu tiên: Bên B sẽ trả tiền thuê cho Bên Cho Thuê Nhà 1 tháng tiền thuê ngay khi chuyển vào ở.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Số tiền: {(data_tmp && data_tmp[0]) ? data_tmp[0].fee : ''}  VNĐ</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Rental fee: </em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>The first payment: The Party B will pay 1 month(s) rental fee in advance to The Party A as soon as moving in.)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>Amount: {(data_tmp && data_tmp[0]) ? data_tmp[0].fee : ''}  </em></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em> VNĐ</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><strong>ĐIỀU 4 : TRÁCH NHIỆM CỦA BÊN CHO THUÊ (BÊN A)</strong></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em><strong>(ARTICLE 4 : LESSOR’S (PARTY A’S) RESPONSIBILITIES)</strong></em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>1. Đảm bảo và cam kết rằng căn Nhà nói trên thuộc quyền sở hữu của BÊN A, và BÊN A có đủ quyền hạn được cho thuê, BÊN A đảm bảo rằng căn Nhà này không bị tranh chấp.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Assuring and committing that the above-mentioned House belongs to Party A, and Party A has the right to lease/rent it out; that this House is not in the state of dispute.)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>2. Bàn giao cho Bên B toàn bộ diện tích cho thuê với mọi trang thiết bị, tiện nghi của hạ tầng kỹ thuật như đã quy định tại Điều 1, vào ngày có hiệu lực của hợp đồng này.</span></span></p>
                      <p align="justify"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Handing over to Party B the rented area and all of its equipment, facilities of the technical infrastructure as stipulated in the Article 1, on the validity date of the contract.)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>3. Đảm bảo cho Bên B quyền sử dụng hợp pháp, trọn vẹn, riêng biệt phần diện tích cho thuê.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Ensuring Party B the right to use legally, fully and separately the said rented area).</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>4. Bên A chịu trách nhiệm trợ giúp cho Bên B thực hiện đăng ký tạm trú, tạm vắng với cơ quan hữu trách địa phương theo quy định của pháp luật Việt Nam bắt đầu từ thời điểm ký hợp đồng.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(The Party A bears the responsibilities for assisting The Party B in implementing all regulations and rules defined by the Vietnamese laws on registration of provisional stay or temporary absence with the concerned agencies)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><strong>ĐIỀU 5 : TRÁCH NHIỆM CỦA BÊN THUÊ (BÊN B)</strong></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em><strong>(ARTICLE 5 : LESSEE’S (PARTY B’S) RESPONSIBILITIES)</strong></em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>1. Trả tiền đặt cọc, tiền thuê và các chi phí khác đầy đủ và đúng thời hạn.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Paying timely and fully the amount of security deposit, the rental fee and other costs/fees).</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>2. Sử dụng diện tích được cho thuê theo đúng mục đích đã đăng ký và cho phép.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Using the said rented area in compliance with the above registered and authorized purpose).</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>3. Nếu cần sửa chữa và cải tạo diện tích được thuê do nhu cầu sử dụng của mình, Bên B phải được sự đồng ý của Bên A bằng văn bản, và phải tuân thủ các quy định về xây dựng cơ bản; mọi chi phí xây dựng, sửa chữa, cải tạo do Bên B chịu. Khi hợp đồng này chấm dứt hoặc khi Bên B bàn giao lại cho Bên A diện tích được thuê cho Bên A, Nhà phải được giữ nguyên trạng khi bàn giao và Bên B không được đòi bồi thường về những chi phí xây dựng, cải tạo mới này.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(If Party B needs to repair or to renovate the rented area by its use requirements, Party B must get Party A's agreement in writing and must comply with the regulations on construction. All expenses of repairing/renovating will be borne by Party B. When this present contract terminates or when Party B transfers the rented area to Party A, the rented House must be kept as per the current status upon delivery and Party B shall not claim for any/all compensation for such new repair/renovation).</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>4. Tuân thủ nghiêm túc mọi luật lệ, pháp luật quy định do Nhà nước CHXHCNVN ban hành.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Chấp hành mọi quy định về bảo vệ vệ sinh môi trường, an ninh trật tự công cộng, phòng cháy chữa cháy.</span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em><br /> (Strictly obeying all laws and regulations promulgated by the State of S.R VIETNAM).</em></span></span></p>
                      <p align="justify"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>Abiding all regulations and rules on the environmental hygiene, public order, and security, fire fighting and prevention, etc.)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>7. Không được cho thuê lại hoặc chuyển nhượng một phần hoặc toàn bộ diện tích được thuê cho cá nhân/công ty/tổ chức khác.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Not sub-leasing or transferring partly or wholly the rented area to another person/company/entity)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>8. Thanh toán dứt điểm mọi chi phí sử dụng điện, nước, và các chi phí khác (nếu có) trước khi thanh lý hợp đồng.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Paying up all expenses of electricity, telephone, fax and other charges, if any, before making the contract liquidation).</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>9. Chịu trách nhiệm về bất kỳ/toàn bộ sự bảo dưỡng và mất mát các trang thiết bị, nội thất trong Nhà, tài sản cá nhân.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Taking responsibilities for any/all maintenance[s] and loss[es] of facilities, furniture inside the House, his personal properties).</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>10. Nếu Bên B muốn chuyển đi trước thời hạn đã cam kết theo điều 2.1 thì bên A có quyền giữ tiền cọc (Bên B mất tiền cọc).<br /> </span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>If partly B wants to move out before the committed duration according to Article 2.1,Party A has right to keep the deposit (partly B will lose the deposit).</em></span></span></p>
                      <p align="left">&nbsp;</p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><strong>ĐIỀU 6 : ĐIỀU KHOẢN VỀ BẢO DƯỠNG, SỬA CHỮA NHÀ &amp; CÁC TRANG THIẾT BỊ</strong></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em><strong>(ARTICLE 6 : PROVISION ON HOUSE &amp; EQUIPMENTS MAINTENANCE AND REPAIR)</strong></em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Khi cần thiết phải bảo dưỡng hoặc sửa chữa căn Nhà, BÊN A phải thông báo cho BÊN B biết trước bằng văn bản và BÊN B cần tạo mọi điều kiện thuận lợi cho BÊN A thực hiện các công việc nêu trên. Nếu BÊN B gây khó khăn một cách vô lý cho các công việc nêu trên gây nguy hiểm đối với căn Nhà, BÊN B phải chịu chi phí hợp lý để khắc phục hậu quả gây ra.</span></span></p>
                      <p align="justify"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(If it is needed to do the maintenance/repair works on the House, PARTY A must inform PARTY B in writing in advance and PARTY B must create favorable conditions to enable PARTY A to carry out such works. If PARTY B unreasonably hinders such works thus endangering the safety of the House, then PARTY B must bear the reasonable costs arising from the consequences).</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><strong>ĐIỀU 7 : CHẤM DỨT HỢP ĐỒNG (ARTICLE 7 : CONTRACT TERMINATION)</strong></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>1. Hợp đồng này đương nhiên chấm dứt trong các trường hợp sau:</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(This present contract evidently terminates under the following cases:)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>a. Vào ngày hết hạn hợp đồng. </span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(On the expiration of this present contract)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>b. Trường hợp bất khả kháng như thiên tai, bão lụt, chiến tranh, hỏa hoạn, v.v….</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(In case of Force Majeure: Act of God, flood, storm, war, fire, etc.)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>c. Bên B không thể tiếp tục ở tại Thành phố Đà Nẵng theo quy định của cấp thẩm quyền.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Trong trường hợp này (a, b), Bên A sẽ hoàn lại cho Bên B tiền đặt cọc.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Party B cannot continue its staying in Danang City under the command of competent authorities</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>In these cases [a, b], Party A will reimburse to Party B the amount of security amount)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>2. Chấm dứt hợp đồng trước thời hạn do thỏa thuận của các Bên:</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Contract termination prior to its expiration under both parties’ agreement):</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Nếu Bên B chấm dứt hợp đồng này trước thời hạn mà không tuân thủ quy định nói trên, Bên B sẽ mất tiền đặt cọc.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Should Party B terminate this present contract prior to its expiration without complying with the above stipulations, Party B will lose the amount of security deposit).</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Nếu Bên A chấm dứt hợp đồng này trước thời hạn mà không tuân thủ quy định nói trên, Bên A phải hoàn trả lại cho Bên B tiền đặt cọc, tiền thuê còn thừa của Bên B (nếu có).</span></span></p>
                      <p align="justify"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Should Party A terminate this present contract prior to its expiration without complying with the above stipulations, Party A will refund Party B the amount of security deposit, the remaining amount of the rental fee, if any.)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><strong>ĐIỀU 8 : CAM KẾT CHUNG </strong></span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em><strong>(ARTICLE 8 : GENERAL COMMITMENT).</strong></em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>1. Hai bên cam kết thực hiện nghiêm túc và đầy đủ các điều khoản và điều kiện quy định trong hợp đồng này. Mọi thay đổi, hủy bỏ hoặc bổ sung một hay nhiều điều khoản, điều kiện của hợp đồng này phải được cả 2 bên thỏa thuận bằng văn bản và lập thành phụ lục hợp đồng.</span></span></p>
                      <p align="justify"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(1. Both parties undertake to perform strictly and fully the articles and conditions stipulated in this present contract. Any/all amendment, cancellation or addition of one or more terms, conditions of this present contract must be agreed by both parties in writing and must be made into relevant annex).</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>2. Trường hợp các cơ quan có thẩm quyền của Việt Nam ban hành các văn bản pháp lý liên quan đến việc cho thuê Nhà, Hợp đồng này sẽ được điều chỉnh cho phù hợp với những quy định của Pháp luật Việt Nam.</span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(On the issuance of any legislation by a competent authority concerning House leasing, this present contract will be adjusted in accordance with Vietnamese laws and regulations)</em></span></span></p>
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>3. Tranh chấp phát sinh liên quan đến hợp đồng này hoặc việc vi phạm hợp đồng sẽ được giải quyết trước hết bằng thương lượng trên tinh thần thiện chí, hợp tác. Nếu thương lượng không thành thì vụ việc sẽ được đưa ra toà án có thẩm quyền giải quyết. Quyết định của toà án là chung và có hiệu lực cưỡng chế thi hành với các bên có liên quan. Bên thua phải chịu toàn bộ án phí và các chi phí khác (nếu có), trừ khi có thỏa thuận khác.</span></span></p>
                      <p align="justify"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(Any disputes arising in reaction to this present contract or the breach of this present contract shall be settled firstly be negotiation under goodwill, cooperativeness. Should the negotiation fail, the matter shall be submitted to the competent court for settlement. And the Court's decision will be considered as final and binding on all concerning parties to execute. The Court charges and other expenses, if any, must be borne by the losing party, unless otherwise agreed).</em></span></span></p>
                      {/* <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>4. Hợp đồng này có hiệu lực pháp lý từ ngày ký đến hết ngày: ……………………………………</span></span></p> */}
                      {/* <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(This present contract has its legal validity from the signing date until………………………………..)</em></span></span></p> */}
                      <p align="left"><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}>Hợp đồng này được lập thành 02 bản và có giá trị pháp lý như nhau, mỗi bên giữ 01 (một) bản.<br /> </span></span><span style={{ fontFamily: '"Times New Roman", serif' }}><span style={{ fontSize: 'medium' }}><em>(This present contract is made into 02 [two] copies in Vietnamese and English languages of the equal validity. Each party will keep 01 [one] copy)</em></span></span></p>
                      <p align="left">&nbsp;</p>
                      <div className='row'>
                        <div className="signA col-md-6">
                          <p>ĐẠI DIỆN BÊN CHO THUÊ / BÊN A</p><br />
                          <p>(FOR THE LESSOR / PARTY A)</p>
                          {/* {this.state.setImageURL ? (
                            <img
                              src={this.state.setImageURL}
                              alt="my signature"
                              style={{
                                display: "block",
                                margin: "0 auto",
                                border: "1px solid black",
                                width: "150px"
                              }}
                            />
                          ) : null} */}
                          <div className ="canvas-sign">
                            <div className="canvas-sign-header">
                              {/* <SignaturePad
                                ref={this.sigCanvas}
                                canvasProps={{
                                  className: "signatureCanvas"
                                }}
                              /> */}
                              <Button
                                variant="outlined"
                                className=""
                                onClick={this.landlordSign}
                              >
                                Signature
                              </Button>
                            </div>
                            {/* <div className="canvas-sign-bt">
                              <Button
                                variant="outlined"
                                className=""
                                onClick={this.clearr}
                              >
                                clear
                              </Button>
                              <Button
                                variant="outlined"
                                className=""
                                onClick={this.save}
                              >
                                save
                              </Button>
                            </div> */}
                          </div>
                         
                        </div>
                        {/* <div className="signB col-md-6">
                          <p>ĐẠI DIỆN BÊN  THUÊ / BÊN B</p><br />
                          <p>(FOR THE LESSEE / PARTY B)</p>
                        </div> */}
                      </div>
                      <div className ="row">
                        <div className ="col-md-9">
                        </div>
                        <div className ="col-md-3">
                          <Button
                            variant="outlined"
                            className=""
                            onClick={this.createAgreement}
                          >
                            Create
                              </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div>
                
              </main>
            </section>
            <section id="panel-3">
              <main>
                {AgreeL}
              </main>
            </section>
            <section id="panel-4">
              <main>
                
              </main>
            </section>
            <section id="panel-5">
              <main>
                {AgreeT}
              </main>
            </section>
          </div>
        </article>
      </div>
    );
  }
}
export default Myaccount;
