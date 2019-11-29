import React, { Component } from 'react'
import { getContract } from './utils/contractservice'
import '../static/css/notfound.css'

class Notfound extends Component {
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
            <div className="not-found">
                <h1>404</h1>
                <p>Oops! Something is wrong.</p>
                <a class="button" href="/"><i class="icon-home"></i> Go back in initial page, is better.</a>
            </div>
        );
    }
}

export default Notfound
