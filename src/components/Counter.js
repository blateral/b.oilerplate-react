import React, {Component} from 'react';

class Counter extends Component {

    constructor() {
        super()

        this.state = {
            counter: 0
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                counter: this.state.counter + 1
            })
        }, 1000)
    }

    render() {
        return (
            <h1>{this.state.counter}</h1>
        )
    }

}

export default Counter;
