import { Component, h } from "preact";
interface BoardComponentState {
    time: number;
}

class Board extends Component<any, BoardComponentState> {
    timer: any;
    constructor() {
        super();
        this.state = { time: Date.now() };
    }

    // Lifecycle: Called whenever our component is created
    componentDidMount() {
        // update time every second
        this.timer = setInterval(() => {
            this.setState({ time: Date.now() });
        }, 1000);
    }

    // Lifecycle: Called just before our component will be destroyed
    componentWillUnmount() {
        // stop when not renderable
        clearInterval(this.timer);
    }

    render() {
        const time = new Date(this.state.time).toLocaleTimeString();
        return <h2>{time}</h2>;
    }
}

export default Board;
