import React, {Component} from 'react';

class Com1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'dingjia'
        };

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const {text} = this.props;
        return (
            <div className="com">
                <p >
                    hahahaha {text}
                </p>
                <p>
                    {this.state.name}
                </p>

                <button onClick={this.handleClick}>nihao~</button>
            </div>
        );
    }
    handleClick() {
        this.setState({
            name: 'djmughal~'
        });
    }
}

export default Com1;
