import React from 'react'
import '../static/css/footer.css'
import FacebookIcon from '@material-ui/icons/Facebook';
// style ={{marginTop:'200px'}}
const Footer = () => (
    <footer className="site-footer" >
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <h6>About</h6>
                    <p className="text-justify">Dapp is the largest decentralized applications distributor in the world, listing over 2,200 dapps that are built on seven major blockchains. The platform showcases dapps based on trusted dapp data analytics, community reviews and user comments. They’ve achieved a very large user-base with over 150,000 monthly visits across the globe and over 100,000 registered users and followers on social-media platforms.</p>
                </div>
                <div className="col-xs-6 col-md-3">
                    <h6>Categories</h6>
                    <ul className="footer-links">
                        <li><a href="https://metamask.io/" target="_blank">Metamask</a></li>
                        <li><a href="https://remix.ethereum.org/" target="_blank">Remix IDE</a></li>
                        <li><a href="https://solidity.readthedocs.io/en/v0.5.13/" target="_blank">Learn Solidity</a></li>
                        <li><a href="https://web3js.readthedocs.io/en/v1.2.4/" target="_blank">Learn Web3</a></li>
                    </ul>
                </div>
                <div className="col-xs-6 col-md-3">
                    <h6>Quick Links</h6>
                    <ul className="footer-links">
                        <li><a href="https://ropsten.etherscan.io/address/0x3B7F1a55312c44b51AB037eDE4F5c65595A94EcD" target="_blank">View in etherscan</a></li>
                        
                        <li><a href="" target="_blank">Contribute</a></li>
                    </ul>
                </div>
            </div>
            <hr />
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-8 col-sm-6 col-xs-12">
                    <p className="copyright-text">Copyright © 2019 All Rights Reserved by
                <a href="#"> Kai1997</a>.
              </p>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12">
                    <ul className="social-icons">
                        <li><a className="facebook" href="#"><i className="fa fa-facebook" /></a></li>
                        <li><a className="twitter" href="#"><i className="fa fa-twitter" /></a></li>
                        <li><a className="dribbble" href="#"><i className="fa fa-dribbble" /></a></li>
                        <li><a className="linkedin" href="#"><i className="fa fa-linkedin" /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
)
export default Footer

