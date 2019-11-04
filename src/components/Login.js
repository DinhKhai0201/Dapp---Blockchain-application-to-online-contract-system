import React, { Component } from 'react'
import { getContract } from './utils/contractservice'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contracts: '',
            web3: '',
            account: ''
        };
    }
    
    componentDidMount() {

        const data = async (contracts, web3) => {
            this.setState({
                contracts, web3
            })
            let that = this;
            await web3.eth.getCoinbase(function (err, result) {
                that.setState({ account: result })
            })
           
        }
        getContract(data);
    };

    render() {

        return (
            <div className="">
                <div className="clearfix"><br /><br /><br /></div>
                <div className="">
                a
                </div>
            </div>
        );
    }
}

export default Login
