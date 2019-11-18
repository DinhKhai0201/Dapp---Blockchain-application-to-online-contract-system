import React, { Component } from 'react'
import '../static/css/inputadd.css'
import ipfs from './utils/ipfs'
import { getContract } from './utils/contractservice'
class PageAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            pictures: '',
            contracts: '',
            web3: '',
            account: '',
            name: '',
            fee: 0,
            description: '',
            yearbuild: '',
            address: '',
            type: '',
            typestatus:'',
            rentsale: '',
            bed: 1,
            room: 1,
            bath:1,
            GAS: 700000, 
            GAS_PRICE: 2000000000

        };
    }

    componentDidMount() {
        const data = async (contracts, web3) => {
            console.log(contracts);
            this.setState({
                contracts, web3
            })
            let that = this;
            await web3.eth.getCoinbase(function (err, result) {
                that.setState({ account: result })
            })
            web3.eth.net.getId().then(netId => {
                netId = parseInt(netId);
                switch (netId) {
                    case 1: // main network
                        that.setState({
                            network: "You're on the Ethereum main network. Please switch to Ropsten."
                        })
                        break
                    case 2: // morden
                        that.setState({
                            network: "You're on the Morden test network. Please switch to Ropsten."
                        })
                        break
                    case 3: // ropsten
                        that.setState({
                            network: "Ethereum Ropsten network"
                        })
                        break
                    case 4: // rinkeby
                        that.setState({
                            network: "You're on the Rinkeby test network. Please switch to Ropsten."
                        })
                        break
                    case 42: // kovan
                        that.setState({
                            network: "You're on the Kovan test network. Please switch to Ropsten."
                        })
                        break
                    default: // unknown network, should be ganache
                        that.setState({
                            network: "This is an unknown network."
                        })
                }
            })
        }
        getContract(data);
    };
    onDrop = (picture) => {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        console.log(this.state.pictures);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state);
    }
    onSubmit = (e) => {
        e.preventDefault();
        let dess ='';
        let { contracts, account, name, description,bed,room,bath, fee, yearbuild, address,pictures,rentsale, typestatus,type,GAS,GAS_PRICE} = this.state;
        let des =[bed,room, bath ,description];
        dess = des.join('_');
        // console.log(dess);
        contracts.methods.addApartment(name, dess, fee, yearbuild, address, pictures, account, rentsale, typestatus, type).send({ from: `${account}`, gas: GAS, gasPrice: `${GAS_PRICE}` }, function (err, result) {
            console.log(result)
        }).once('receipt', (receipt) => {
            alert("You just add");
        })  
       
    }
    captureFile = (event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
    };
    convertToBuffer = async (reader) => {
        const buffer = await Buffer.from(reader.result);
        await ipfs.add(buffer, (err, ipfsHash) => {
            this.setState({ url: 'https://gateway.ipfs.io/ipfs/' + ipfsHash[0].hash });
            this.setState({ pictures: 'https://gateway.ipfs.io/ipfs/' +ipfsHash[0].hash });
        })
        console.log(this.state);
    };
    render() {
        let imgipfs;
        if (this.state.pictures != '') {
            imgipfs = <img src={this.state.pictures} width ="100%"
            />
        } 
        return (
            <div className="container imgbg">
                <div className="clearfix"><br /><br /><br /></div>
                <div className ="">
                    <form className="form-card">
                        <fieldset className="form-fieldset">
                            <legend className="form-legend">ADD </legend>
                            <hr />
                            <div className="form-element form-input">
                                <input name="name" id="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9" className="form-element-field" placeholder="Please fill in your full name" type="input" required onChange={e => this.handleChange(e)}/>
                                <div className="form-element-bar" />
                                <label className="form-element-label" htmlFor="field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9">Name</label>
                            </div>
                            <div className="form-element form-input form-has-error">
                                <input name="fee" id="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop" className="form-element-field -hasvalue" placeholder=" " type="number" required  onChange={e => this.handleChange(e)}/>
                                <div className="form-element-bar" />
                                <label className="form-element-label" htmlFor="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop">Fee</label>
                                <small className="form-element-hint"></small>
                            </div>
                            <div className="form-element form-input">
                                <input name="yearbuild" id="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz" className="form-element-field" placeholder=" " type="text" required onChange={e => this.handleChange(e)} />
                                <div className="form-element-bar" />
                                <label className="form-element-label" htmlFor="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz">Year build</label>
                            </div>
                            <div className="form-element form-input">
                                <input name="address" id="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz" className="form-element-field" placeholder=" " type="text" required onChange={e => this.handleChange(e)}/>
                                <div className="form-element-bar" />
                                <label className="form-element-label" htmlFor="field-uyzeji-352rnc-4rv3g1-bvlh88-9dewuz">Address </label>
                            </div>
                           
                           
                            <div className="form-element form-select">
                                <select name="type" id="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r" className="form-element-field" onChange={e => this.handleChange(e)}>
                                    {/* <option disabled selected value className="form-select-placeholder" /> */}
                                    <option value="0">House</option>
                                    <option value="1">Apartment</option>
                                    <option value="2">Room</option>
                                </select>
                                <div className="form-element-bar" />
                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Select your type</label>
                            </div>
                            <div className="form-element form-select">
                                <select name="rentsale" id="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r" className="form-element-field" onChange={e => this.handleChange(e)}>
                                    {/* <option disabled selected value className="form-select-placeholder" /> */}
                                    <option value="0">Rent</option>
                                    <option value="1">Sale</option>
                                </select>
                                <div className="form-element-bar" />
                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">For Rent or Sale?</label>
                            </div>
                            <div className="form-element form-select">
                                <select name="typestatus" id="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r" className="form-element-field" onChange={e => this.handleChange(e)}>
                                    {/* <option disabled selected value className="form-select-placeholder" /> */}
                                    <option value="0">Open</option>
                                    <option value="1">Pending</option>
                                    <option value="2">Process</option>
                                    <option value="3">Close</option>
                                </select>
                                <div className="form-element-bar" />
                                <label className="form-element-label" htmlFor="field-be1h8i-ll2hpg-q4efzm-nfjj1e-udkw5r">Select your Type status</label>
                            </div>
                            <div className="form-element form-input form-has-error">
                                <input name="bed" id="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop" className="form-element-field -hasvalue" placeholder=" " value ={this.state.bed} type="number" required  onChange={e => this.handleChange(e)}/>
                                <div className="form-element-bar" />
                                <label className="form-element-label" htmlFor="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop">Bed</label>
                                <small className="form-element-hint"></small>
                            </div>
                            <div className="form-element form-input form-has-error">
                                <input name="room" id="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop" className="form-element-field -hasvalue" placeholder=" " value ={this.state.room} type="number" required  onChange={e => this.handleChange(e)}/>
                                <div className="form-element-bar" />
                                <label className="form-element-label" htmlFor="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop">Room</label>
                                <small className="form-element-hint"></small>
                            </div>
                            <div className="form-element form-input form-has-error">
                                <input name="bath" id="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop" className="form-element-field -hasvalue" placeholder=" " value ={this.state.bath} type="number" required  onChange={e => this.handleChange(e)}/>
                                <div className="form-element-bar" />
                                <label className="form-element-label" htmlFor="field-x98ezh-s6s2g8-vfrkgb-ngrhef-atfkop">Bath</label>
                                <small className="form-element-hint"></small>
                            </div>
                            <div className="form-element form-textarea">
                                <textarea name="description" id="field-3naeph-0f3yuw-x153ph-dzmahy-qhkmgm" className="form-element-field" placeholder=" " defaultValue={""} onChange={e => this.handleChange(e)}/>
                                <div className="form-element-bar" />
                                <label className="form-element-label" htmlFor="field-3naeph-0f3yuw-x153ph-dzmahy-qhkmgm">Your description</label>
                            </div>
                            <div className='button'>
                                <input type='file' id='multi' name="files[]" onChange={this.captureFile} multiple />
                            </div>
                           
                            <div className="imgipfs ">
                            {imgipfs}
                            </div>
                        </fieldset>
                        <div className="form-actions">
                            <button className="form-btn" type="submit" onClick={(e) => this.onSubmit(e)}>Send </button>
                            <button className="form-btn-cancel -nooutline" type="reset">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default PageAdd
