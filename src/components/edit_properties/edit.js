import React, { Component, Fragment} from 'react'
import '../../static/css/inputadd.css'
import ipfs from '../utils/ipfs'
import AddIcon from '@material-ui/icons/Add';
import { getContract } from '../utils/contractservice'
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notfound from '../pages/notfound'
class PageEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            tmp_file: [],
            contracts: "",
            web3: "",
            account: "",
            name: "",
            fee: 0,
            description: "",
            yearbuild: "",
            address: "",
            type: 0,
            typestatus: 0,
            rentsale: 0,
            bed: 1,
            room: 1,
            bath: 1,
            GAS: 700000,
            GAS_PRICE: 2000000000,
            address_account:''
        };
    }

    componentDidMount() {
        this.setState({
            id: parseInt(this.props.match.params.id),
            address_account: this.props.match.params.address
        });
        const data = async (contracts, web3) => {
            this.setState({
                contracts,
                web3
            });
            let that = this;
            await web3.eth.getCoinbase(function (err, result) {
                that.setState({ account: result });
            });
            let dataA = [];
            await contracts.events.AddApartment({
                filter: { id: `${this.state.id}` },
                fromBlock: 0,
                toBlock: 'latest'
            }, function (error, event) {
                if (event) {
                    dataA.push(event.returnValues);
                    let one_apart = Object.values(dataA.reduce((acc, cur) => Object.assign(acc, {
                        [cur.id]: cur
                    }), {}))
                    console.log(one_apart[0].id)
                    that.setState({
                        name: one_apart[0].name,
                        fee: (one_apart[0].fee).split("_")[0],
                        description: one_apart[0].description.split("_")[3],
                        yearbuild: (one_apart[0].fee).split("_")[1],
                        address: one_apart[0].address_apartment,
                        type: one_apart[0]._ApartmentType,
                        typestatus: one_apart[0]._ApartmentStatus,
                        rentsale: one_apart[0].statusRentOrSale,
                        bed: one_apart[0].description.split("_")[0],
                        room: one_apart[0].description.split("_")[1],
                        bath: one_apart[0].description.split("_")[2],
                        tmp_file: one_apart[0].ipfsHash.split("_")
                    })
                }
            })
           
        };
        getContract(data);
        let ref_top = this.refs.ref_top;
        window.scrollTo(0, 0);
    }
  
    onSubmit = e => {
        e.preventDefault();
        let {id} = this.state
        let dess = "";
        let pictures;
        let {
            contracts,
            account,
            name,
            description,
            bed,
            tmp_file,
            room,
            bath,
            fee,
            yearbuild,
            address,
            rentsale,
            typestatus,
            type,
            GAS,
            GAS_PRICE
        } = this.state;
        let des = [bed, room, bath, description];
        let fee_year = [fee, yearbuild].join("_");
        dess = des.join("_");
        pictures = tmp_file.join("_")
        contracts.methods
            .updateApartment(
                id,
                name,
                dess,
                fee_year,
                // yearbuild,
                address,
                pictures,
                account,
                rentsale,
                typestatus,
                type
            )
            .send(
                { from: `${account}`, gas: GAS, gasPrice: `${GAS_PRICE}` },
                function (err, result) {
                    console.log(result);
                }
            )
            .once("receipt", receipt => {
                toast.success("Success !", {
                    position: toast.POSITION.TOP_LEFT
                });

            });
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state);
    };
    captureFile = event => {
        let tmp = [];
        event.stopPropagation();
        event.preventDefault();
        if (event.target.files.length > 7) {
            alert("Limit in 7 image!");
        } else {
            tmp = [...tmp, ...event.target.files];
            tmp.forEach(element => {
                let reader = new window.FileReader();
                reader.readAsArrayBuffer(element);
                reader.onloadend = () => this.convertToBuffer(reader);
            });
        }
    };
    // https://gateway.ipfs.io/ipfs/
    convertToBuffer = async reader => {
        const buffer = await Buffer.from(reader.result);
        await ipfs.add(buffer, (err, ipfsHash) => {
            console.log("ip", ipfsHash[0].hash);
            this.setState({
                tmp_file: [
                    ...this.state.tmp_file,
                    "https://gateway.ipfs.io/ipfs/" + ipfsHash[0].hash
                ]
            });

        });
        console.log(this.state);
    };
    onReset = e => {
        e.preventDefault();
        this.setState({
            name: "",
            fee: 0,
            description: "",
            yearbuild: "",
            address: "",
            type: 0,
            typestatus: 0,
            rentsale: 0,
            bed: 1,
            room: 1,
            bath: 1,
            tmp_file: [],
        })
    }
    render() {
        let imgipfs;
        let {address_account, account} = this.state
        imgipfs = this.state.tmp_file.map(element => {
            return (<img key={element} src={element} width="100%" alt={element} />)
        });
        return (
            <Fragment>
                {(address_account.toLowerCase() == account) ? (
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
                        Edit aparment{" "}
                    </h5>

                    <div className="add-apartment row">
                        <div className="col-md-8">
                            <div className="form-element form-input">
                                <input
                                    name="name"
                                    id="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
                                    className="form-element-field"
                                    placeholder="Please fill in your full name"
                                    type="input"
                                    required
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)}
                                />
                                <div className="form-element-bar" />
                                <label
                                    className="form-element-label"
                                    htmlFor="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9"
                                    style={{ fontSize: "40px" }}
                                >
                                    Name
              </label>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-element form-input ">
                                        <input
                                            name="fee"
                                            id="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop"
                                            className="form-element-field "
                                            placeholder=" "
                                            type="number"
                                            required
                                            value={this.state.fee}
                                            onChange={e => this.handleChange(e)}
                                        />
                                        <div className="form-element-bar" />
                                        <label
                                            className="form-element-label"
                                            htmlFor="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop"
                                        >
                                            Fee
                  </label>
                                        <small className="form-element-hint"></small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-element form-input">
                                        <input
                                            name="yearbuild"
                                            id="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
                                            className="form-element-field"
                                            placeholder=" "
                                            type="text"
                                            required
                                            value={this.state.yearbuild}
                                            onChange={e => this.handleChange(e)}
                                        />
                                        <div className="form-element-bar" />
                                        <label
                                            className="form-element-label"
                                            htmlFor="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
                                        >
                                            Year build
                  </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-element form-input">
                                <input
                                    name="address"
                                    id="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
                                    className="form-element-field"
                                    placeholder=" "
                                    type="text"
                                    required
                                    value={this.state.address}
                                    onChange={e => this.handleChange(e)}
                                />
                                <div className="form-element-bar" />
                                <label
                                    className="form-element-label"
                                    htmlFor="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz"
                                >
                                    Address{" "}
                                </label>
                                <small className="form-element-hint">
                                    Ex: 145 Tran Cao Van, Thanh Khe,Thanh Khe Dong, Da Nang
              </small>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-element form-select">
                                        <select
                                            name="type"
                                            id="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r"
                                            className="form-element-field"
                                            onChange={e => this.handleChange(e)}
                                        >
                                            <option value="0">House</option>
                                            <option value="1">Apartment</option>
                                            <option value="2">Room</option>
                                        </select>
                                        <div className="form-element-bar" />
                                        <label
                                            className="form-element-label"
                                            htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r"
                                        >
                                            Select your type
                  </label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-element form-select">
                                        <select
                                            name="rentsale"
                                            id="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r"
                                            className="form-element-field"
                                            onChange={e => this.handleChange(e)}
                                        >
                                            <option value="0">Rent</option>
                                            <option value="1">Sale</option>
                                        </select>
                                        <div className="form-element-bar" />
                                        <label
                                            className="form-element-label"
                                            htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r"
                                        >
                                            For Rent or Sale?
                  </label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-element form-select">
                                        <select
                                            name="typestatus"
                                            id="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r"
                                            className="form-element-field"
                                            onChange={e => this.handleChange(e)}
                                        >
                                            <option value="0">Open</option>
                                            <option value="1">Pending</option>
                                            <option value="2">Process</option>
                                            <option value="3">Close</option>
                                        </select>
                                        <div className="form-element-bar" />
                                        <label
                                            className="form-element-label"
                                            htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r"
                                        >
                                            Select your Type status
                  </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-element form-input form-has-error">
                                        <input
                                            name="bed"
                                            id="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop"
                                            className="form-element-field -hasvalue"
                                            placeholder=" "
                                            value={this.state.bed}
                                            type="number"
                                            required
                                            min="1"
                                            onChange={e => this.handleChange(e)}
                                        />
                                        <div className="form-element-bar" />
                                        <label
                                            className="form-element-label"
                                            htmlFor="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop"
                                        >
                                            Bed
                  </label>
                                        <small className="form-element-hint"></small>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-element form-input form-has-error">
                                        <input
                                            name="room"
                                            id="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop"
                                            className="form-element-field -hasvalue"
                                            placeholder=" "
                                            value={this.state.room}
                                            type="number"
                                            required
                                            min="1"
                                            onChange={e => this.handleChange(e)}
                                        />
                                        <div className="form-element-bar" />
                                        <label
                                            className="form-element-label"
                                            htmlFor="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop"
                                        >
                                            Room
                  </label>
                                        <small className="form-element-hint"></small>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-element form-input form-has-error">
                                        <input
                                            name="bath"
                                            id="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop"
                                            className="form-element-field -hasvalue"
                                            placeholder=" "
                                            value={this.state.bath}
                                            type="number"
                                            required
                                            min="1"
                                            onChange={e => this.handleChange(e)}
                                        />
                                        <div className="form-element-bar" />
                                        <label
                                            className="form-element-label"
                                            htmlFor="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop"
                                        >
                                            Bath
                  </label>
                                        <small className="form-element-hint"></small>
                                    </div>
                                </div>
                            </div>
                            <h4 className="">Description </h4>
                            <div className="form-element form-textarea">
                                <textarea
                                    name="description"
                                    id="field-3naeph-0f3yuw-x153ph-dzmahy-qhkmgm"
                                    className="form-element-field"
                                    placeholder=" "
                                    defaultValue={this.state.description}
                                    value={this.state.description}
                                    onChange={e => this.handleChange(e)}
                                />
                                <div className="form-element-bar" />
                                <label
                                    className="form-element-label"
                                    htmlFor="field-3naeph-0f3yuw-x153ph-dzmahy-qhkmgm"
                                >
                                    Your description
              </label>
                                <small className="form-element-hint">Maximum 200 character</small>
                            </div>
                        </div>
                        <div className="col-md-4 fadeInUp animated">
                            <label for="multi" className="label-add-image">
                                <div className="body-add-image">
                                    <div className="content-add-image">
                                        <span className="icon-add-image">
                                            <AddIcon className="design-icon" />
                                        </span>
                                    </div>
                                    <div className="add-title-image">Add image</div>
                                    <div className="add-des-image">Only Accept image</div>
                                </div>
                            </label>
                            <div className="button">
                                <input
                                    type="file"
                                    id="multi"
                                    name="files[]"
                                    onChange={this.captureFile}
                                    multiple
                                    hidden
                                    accept="image/*"
                                />
                            </div>

                            <div className="imgipfs ">{imgipfs}</div>
                        </div>
                    </div>
                {/* end */}
                <div className="add-apartment ">
                    <Button
                        variant="outlined"
                        className="bt-cancel-apartment"
                        onClick={e => this.onReset(e)}
                    >
                        Cancel
          </Button>
                    <Button
                        variant="outlined"
                        className="bt-add-apartment"
                        onClick={e => this.onSubmit(e)}
                    >
                        Add
          </Button>
                </div>
                 </div>
                ) : (
                    <Notfound />
                )}
                
           
                </Fragment>
        );
    }
}

export default PageEdit
