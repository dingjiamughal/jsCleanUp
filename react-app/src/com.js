import React, {Component} from 'react';

class Com1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'dingjia'
        };

        this.handleClick = this.handleClick.bind(this);
        // this.handle = this.handle.bind(this);
    }

    render() {
        const {text} = this.props;
        const nums = [1, 2, 3, 4, 5];
        return (
            <div className="com">
                <p >
                    hahahaha {text}
                </p>
                <p>
                    {this.state.name}
                </p>
                <div>{nums.map(num => <span key={num}>{num}</span>)}</div>
                <button onClick={this.handleClick}>nihao~</button>
                <button onClick={() => {this.props.handle('haha')}}>handle</button>
            </div>
        );
    }
    handleClick() {
        console.log(this)
        this.setState({
            name: 'djmughal~'
        });
    }
    // handle(a) {
    //     console.log(a)
    // }
}

export default Com1;
