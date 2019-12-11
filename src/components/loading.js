import React, { Component} from 'react';
import '../static/css/loading.css'
class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        
        return (
              <span class="loader"><span class="loader-inner"></span></span>
        );
    }
}

export default Loading
