import React, {Component} from 'react';
import styles from './Counter.scss';

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
            <h1 className={styles.foo}>{this.state.counter}</h1>
        )
    }

}

export default Counter;
