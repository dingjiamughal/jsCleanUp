import React, {Component} from 'react';
import {Button} from 'antd';

import Com1 from './com';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div>
                    <Com1 text="nihao" handle={this.handleClick}></Com1>
                    <Button>hahaha</Button>
                </div>
            </div>
        );
    }

    handleClick = p => {
        console.log(p);
    }
}

export default App;
