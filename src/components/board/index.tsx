import { Component, FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import { Link } from "preact-router/match";
interface BoardComponentState {
    time: number;
}
interface SqaureComponentState {
    value: number;
}

// const Square: FunctionalComponent = ({ value }) => {
//     return <div className={style.square}>{value}</div>;
// };

class Square extends Component<any, SqaureComponentState> {
    constructor() {
        super();
    }
    render(): preact.ComponentChild {
        return <button className={style.square}>{this.props.value}</button>;
    }
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
        return (
            <div>
                <div className={style.status}>{status}</div>
                <div className={style["board-row"]}>
                    <Square value={0}></Square>
                    <Square value={1}></Square>
                    <Square value={2}></Square>
                </div>
                <div className={style["board-row"]}>
                    <Square value={3}></Square>
                    <Square value={4}></Square>
                    <Square value={5}></Square>
                </div>
                <div className={style["board-row"]}>
                    <Square value={6}></Square>
                    <Square value={7}></Square>
                    <Square value={8}></Square>
                </div>
            </div>
        );
    }
}

export default Board;
